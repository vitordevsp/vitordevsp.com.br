#!/usr/bin/env python3
"""
episode-status-map.py — regenera a tabela "Mapa rapido de status dos episodios"
em .journey/timeline.md, lendo o frontmatter de cada ep em .journey/episodes/.

Procura por marcadores no timeline.md:
    <!-- BEGIN: status-map -->
    ...
    <!-- END: status-map -->

Se nao houver marcadores, substitui a tabela existente sob o cabecalho
"## Mapa rapido de status dos episodios". Se nada existir, adiciona ao final.

Uso:
    python3 scripts/episode-status-map.py [--root .journey] [--dry-run]
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("erro: PyYAML nao instalado. pip install --user pyyaml", file=sys.stderr)
    sys.exit(2)


BEGIN = "<!-- BEGIN: status-map -->"
END = "<!-- END: status-map -->"
HEADER = "## Mapa rapido de status dos episodios"


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--root", default=".journey")
    p.add_argument("--dry-run", action="store_true")
    return p.parse_args()


def extract_frontmatter(text: str) -> dict:
    m = re.match(r"^---\n([\s\S]*?)\n---\n", text)
    if not m:
        return {}
    try:
        return yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError:
        return {}


def build_row(slug: str, fm: dict) -> str:
    num = slug[:3]
    status = fm.get("status", "?")
    typ = fm.get("type", "?")
    era = (fm.get("metadata") or {}).get("era", "?")
    return f"| {num} | `{slug}` | {status} | {typ} | {era} |"


def build_table(root: Path) -> str:
    ep_dir = root / "episodes"
    rows = []
    for ep in sorted(ep_dir.glob("*.md")):
        if not re.match(r"^\d{3}-", ep.name):
            continue
        fm = extract_frontmatter(ep.read_text(encoding="utf-8"))
        rows.append(build_row(ep.stem, fm))

    table = ["| # | Episodio | Status | Tipo | Era |", "|---|---|---|---|---|"] + rows
    return "\n".join(table)


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    timeline = root / "timeline.md"
    if not timeline.exists():
        print(f"erro: {timeline} nao existe", file=sys.stderr)
        return 2

    table = build_table(root)
    block = f"{BEGIN}\n{table}\n{END}"
    content = timeline.read_text(encoding="utf-8")
    original = content

    if BEGIN in content and END in content:
        content = re.sub(
            re.escape(BEGIN) + r"[\s\S]*?" + re.escape(END),
            block,
            content,
        )
    elif HEADER in content:
        # substitui a tabela sob HEADER (linha vazia opcional + bloco de linhas iniciadas por |)
        pattern = (
            re.escape(HEADER)
            + r"\n+(?:\|[^\n]*\n)+"
        )
        replacement = f"{HEADER}\n\n{block}\n"
        new_content, n = re.subn(pattern, replacement, content, count=1)
        if n == 0:
            content = content.rstrip() + f"\n\n{HEADER}\n\n{block}\n"
        else:
            content = new_content
    else:
        content = content.rstrip() + f"\n\n{HEADER}\n\n{block}\n"

    if content == original:
        print("nenhuma mudanca necessaria")
        return 0

    if args.dry_run:
        print("--- diff preview ---")
        print(block)
        return 0

    timeline.write_text(content, encoding="utf-8")
    print(f"atualizado: {timeline}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
