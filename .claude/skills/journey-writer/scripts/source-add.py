#!/usr/bin/env python3
"""
source-add.py — adiciona entrada em metadata.sources de um episodio e
bumpa metadata.sources.last_review. Evita Read+Edit so para registrar fonte.

Tipos suportados:
    --type session  --id <uuid> --date YYYY-MM-DD [--relevance primary|secondary] [--summary "..."]
    --type commit   --hash <short>
    --type file     --path <rel-path>
    --type branch   --name <branch>
    --type external --llm gpt-4|claude.ai|gemini|other --date YYYY-MM-DD \\
                    --assunto "..." --exposicao privado|semi-publico|publico [--summary "..."]
    --type derived  --slug <ep-slug>

Uso:
    python3 scripts/source-add.py --ep 003-v3-e-v3.1-... --type session \\
            --id <uuid> --date 2026-05-14 --relevance primary --summary "..."

PyYAML preserva chaves mas pode reformatar. Aceitavel: frontmatter de eps
e simples. Para preservacao perfeita de formato/comentarios use ruamel.yaml.
"""

from __future__ import annotations

import argparse
import datetime as dt
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("erro: PyYAML nao instalado. pip install --user pyyaml", file=sys.stderr)
    sys.exit(2)


FRONTMATTER_RE = re.compile(r"^(---\n)([\s\S]*?)(\n---\n)")


def resolve_ep_path(root: Path, slug: str) -> tuple[Path, str]:
    """Retorna (path, layout) com layout 'package' ou 'flat'."""
    pkg = root / "episodes" / slug / "episode.md"
    flat = root / "episodes" / f"{slug}.md"
    if pkg.is_file():
        return pkg, "package"
    if flat.is_file():
        return flat, "flat"
    raise FileNotFoundError(f"ep nao encontrado: {slug} (tentei {pkg} e {flat})")


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--ep", required=True, help="slug do ep (ex: 003-v3-e-v3.1-...)")
    p.add_argument("--root", default=".journey")
    p.add_argument("--tool", default="claude-code", help="tool.id para digest (package)")
    p.add_argument("--type", required=True, choices=["session", "commit", "file", "branch", "external", "derived"])
    p.add_argument("--id", default="")
    p.add_argument("--date", default="")
    p.add_argument("--relevance", default="primary", choices=["primary", "secondary"])
    p.add_argument("--summary", default="")
    p.add_argument("--hash", dest="hash_", default="")
    p.add_argument("--path", default="")
    p.add_argument("--name", default="")
    p.add_argument("--llm", default="")
    p.add_argument("--assunto", default="")
    p.add_argument("--exposicao", default="privado")
    p.add_argument("--slug", default="")
    p.add_argument("--dry-run", action="store_true")
    return p.parse_args()


def load_frontmatter(content: str) -> tuple[dict, str, str]:
    """Retorna (frontmatter_dict, body, raw_yaml)."""
    m = FRONTMATTER_RE.match(content)
    if not m:
        raise ValueError("ep nao tem frontmatter delimitado por ---")
    raw = m.group(2)
    fm = yaml.safe_load(raw) or {}
    body = content[m.end():]
    return fm, body, raw


def dump_frontmatter(fm: dict, body: str) -> str:
    dumped = yaml.dump(fm, allow_unicode=True, sort_keys=False, default_flow_style=False)
    return f"---\n{dumped}---\n{body}"


def ensure_sources(fm: dict) -> dict:
    meta = fm.setdefault("metadata", {})
    sources = meta.setdefault("sources", {})
    sources.setdefault("sessions", [])
    sources.setdefault("commits", [])
    sources.setdefault("files", [])
    return sources


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    try:
        ep_path, layout = resolve_ep_path(root, args.ep)
    except FileNotFoundError as e:
        print(f"erro: {e}", file=sys.stderr)
        return 2

    if layout == "package" and args.type == "session":
        print(
            "aviso: ep em pacote v2 — prefira criar digest em "
            f"episodes/{args.ep}/sources/conversations/ "
            "(template-conversation-digest.md) e atualizar sources/INDEX.md",
            file=sys.stderr,
        )

    content = ep_path.read_text(encoding="utf-8")
    fm, body, _ = load_frontmatter(content)
    sources = ensure_sources(fm)

    date = args.date or dt.datetime.now().strftime("%Y-%m-%d")
    t = args.type

    if t == "session":
        if not args.id:
            print("erro: --id obrigatorio em session", file=sys.stderr); return 2
        entry = {"id": args.id, "date": date, "relevance": args.relevance, "summary": args.summary or ""}
        if any(s.get("id") == args.id for s in sources["sessions"]):
            print(f"aviso: session {args.id} ja registrada, pulando")
        else:
            sources["sessions"].append(entry)

    elif t == "commit":
        if not args.hash_:
            print("erro: --hash obrigatorio em commit", file=sys.stderr); return 2
        if args.hash_ not in sources["commits"]:
            sources["commits"].append(args.hash_)

    elif t == "file":
        if not args.path:
            print("erro: --path obrigatorio em file", file=sys.stderr); return 2
        if args.path not in sources["files"]:
            sources["files"].append(args.path)

    elif t == "branch":
        if not args.name:
            print("erro: --name obrigatorio em branch", file=sys.stderr); return 2
        sources.setdefault("branches", [])
        if args.name not in sources["branches"]:
            sources["branches"].append(args.name)

    elif t == "external":
        if not args.llm or not args.assunto:
            print("erro: --llm e --assunto obrigatorios em external", file=sys.stderr); return 2
        sources.setdefault("external_rescues", [])
        entry = {
            "llm": args.llm,
            "date": date,
            "assunto": args.assunto,
            "exposicao": args.exposicao,
            "summary": args.summary or "",
        }
        sources["external_rescues"].append(entry)

    elif t == "derived":
        if not args.slug:
            print("erro: --slug obrigatorio em derived", file=sys.stderr); return 2
        sources.setdefault("derived_from", [])
        if args.slug not in sources["derived_from"]:
            sources["derived_from"].append(args.slug)

    sources["last_review"] = dt.datetime.now().strftime("%Y-%m-%d %H:%M")

    new_content = dump_frontmatter(fm, body)

    if args.dry_run:
        print("--- frontmatter resultante ---")
        print(yaml.dump(fm, allow_unicode=True, sort_keys=False))
        return 0

    ep_path.write_text(new_content, encoding="utf-8")
    print(f"atualizado: {ep_path}")
    print(f"  type={t}  last_review={sources['last_review']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
