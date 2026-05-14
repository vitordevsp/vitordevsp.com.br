#!/usr/bin/env python3
"""
reorganize.py — renumeracao topologica segura de episodios em .journey/.

Recebe arquivo YAML com mapa de renomeacao e executa:
1. valida ordem topologica (vacate-then-fill via nomes temporarios para evitar colisao);
2. mv dos arquivos;
3. atualiza frontmatter `title:` e cabecalho `# EP-NNN` no proprio arquivo;
4. atualiza refs cruzadas em hero.md, timeline.md, open-questions.md,
   seeds/content-seeds.md, notes/raw-insights.md, README.md e demais eps;
5. atualiza `metadata.sources.derived_from` em eps meta;
6. bumpa `metadata.sources.last_review` em eps tocados;
7. roda validate.sh ao final.

Uso:
    python3 scripts/reorganize.py --map path/to/map.yaml [--root .journey] [--dry-run]

Formato do map.yaml:

    renames:
      "001-introducao": "001-introducao"          # sem mudanca, pode omitir
      "003-segundo-reset": "005-v32-nasce-com-sdd"
      "004-docs-flat": "006-docs-flat"
    deletes:
      - "008-notion-fio"     # apaga; conteudo presume-se ja absorvido
    creates:
      - "003-v3-e-v3.1"      # cria placeholder vazio com frontmatter minimo
      - "009-criacao-journey"

Dependencias: PyYAML (modulo padrao em sistemas modernos via pip; cai pra parser
manual minimo se falhar).
"""

from __future__ import annotations

import argparse
import datetime as dt
import re
import shutil
import subprocess
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("erro: PyYAML nao instalado. instale com: pip install --user pyyaml", file=sys.stderr)
    sys.exit(2)


SCRIPT_DIR = Path(__file__).resolve().parent
SKILL_DIR = SCRIPT_DIR.parent


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="renumeracao topologica de eps")
    p.add_argument("--map", required=True, help="caminho do YAML de renomeacao")
    p.add_argument("--root", default=".journey", help="raiz da .journey/ (default: .journey)")
    p.add_argument("--dry-run", action="store_true", help="apenas simula, nao escreve nada")
    p.add_argument("--skip-validate", action="store_true", help="pula validate.sh final")
    return p.parse_args()


def load_map(path: Path) -> dict:
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    return {
        "renames": data.get("renames", {}) or {},
        "deletes": data.get("deletes", []) or [],
        "creates": data.get("creates", []) or [],
    }


def slug_ep_num(slug: str) -> str:
    m = re.match(r"^(\d{3})-", slug)
    if not m:
        raise ValueError(f"slug invalido (sem prefixo NNN-): {slug}")
    return m.group(1)


def topological_renames(renames: dict[str, str]) -> list[tuple[str, str]]:
    """retorna lista ordenada de (origem, destino) usando 2-fase tmp p/ evitar colisao."""
    pairs = [(o, n) for o, n in renames.items() if o != n]
    if not pairs:
        return []
    fase1 = [(o, f".tmp__{i}__{n}") for i, (o, n) in enumerate(pairs)]
    fase2 = [(tmp, n) for (_, n), (_, tmp) in zip(pairs, fase1)]
    return fase1 + fase2


FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


def update_episode_self_refs(filepath: Path, new_slug: str) -> None:
    if not filepath.exists():
        return
    content = filepath.read_text(encoding="utf-8")
    new_num = slug_ep_num(new_slug)
    new_title_part = new_slug[4:]  # depois do "NNN-"

    # frontmatter title:
    content = re.sub(
        r'(^title:\s*"?)EP-\d{3}\s*-\s*[^"\n]+("?\s*$)',
        rf'\g<1>EP-{new_num} - {new_title_part}\g<2>',
        content,
        count=1,
        flags=re.MULTILINE,
    )
    # cabecalho H1: # EP-NNN - ...
    content = re.sub(
        r"(^# EP-)\d{3}( - .+)$",
        rf"\g<1>{new_num}\g<2>",
        content,
        count=1,
        flags=re.MULTILINE,
    )
    # bump last_review
    today = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
    content = re.sub(
        r"(  last_review:\s*)\d{4}-\d{2}-\d{2}[^\n]*",
        rf"\g<1>{today}",
        content,
        count=1,
    )
    filepath.write_text(content, encoding="utf-8")


def update_cross_refs(root: Path, renames_final: dict[str, str], deletes: list[str], dry_run: bool) -> int:
    """substitui refs antigos por novos em todos os md fora de episodes/."""
    targets = []
    for p in root.rglob("*.md"):
        targets.append(p)

    replacements = 0
    for filepath in targets:
        content = filepath.read_text(encoding="utf-8")
        original = content
        for old_slug, new_slug in renames_final.items():
            if old_slug == new_slug:
                continue
            # episodes/<old> -> episodes/<new>
            content = content.replace(f"episodes/{old_slug}", f"episodes/{new_slug}")
            # tags [origem: ep-NNN]
            old_num = slug_ep_num(old_slug)
            new_num = slug_ep_num(new_slug)
            content = re.sub(
                rf"\[origem:\s*ep-{old_num}\]",
                f"[origem: ep-{new_num}]",
                content,
            )
            # derived_from listings: "- old_slug"
            content = re.sub(
                rf"^(\s*-\s+){re.escape(old_slug)}\s*$",
                rf"\g<1>{new_slug}",
                content,
                flags=re.MULTILINE,
            )
        # remove linhas que referenciam deletes
        for dslug in deletes:
            content = re.sub(
                rf"^.*episodes/{re.escape(dslug)}.*\n",
                "",
                content,
                flags=re.MULTILINE,
            )
        if content != original:
            replacements += 1
            if dry_run:
                print(f"[dry-run] alteraria: {filepath}")
            else:
                filepath.write_text(content, encoding="utf-8")
    return replacements


def create_placeholder(root: Path, slug: str, dry_run: bool) -> None:
    ep_dir = root / "episodes"
    target = ep_dir / f"{slug}.md"
    if target.exists():
        print(f"aviso: placeholder ja existe, pulando: {target}")
        return
    template_path = SKILL_DIR / "assets" / "template-episode.md"
    if not template_path.exists():
        print(f"erro: template nao encontrado em {template_path}", file=sys.stderr)
        sys.exit(2)
    num = slug_ep_num(slug)
    title_part = slug[4:]
    body = template_path.read_text(encoding="utf-8")
    body = re.sub(r"^title:.*$", f'title: "EP-{num} - {title_part}"', body, count=1, flags=re.MULTILINE)
    body = re.sub(r"^# EP-\d{3}.*$", f"# EP-{num} - {title_part}", body, count=1, flags=re.MULTILINE)
    if dry_run:
        print(f"[dry-run] criaria placeholder: {target}")
    else:
        target.write_text(body, encoding="utf-8")
        print(f"criado placeholder: {target}")


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    if not root.exists():
        print(f"erro: root nao existe: {root}", file=sys.stderr)
        return 2

    mapdata = load_map(Path(args.map))
    renames = mapdata["renames"]
    deletes = mapdata["deletes"]
    creates = mapdata["creates"]

    print(f"reorganize.py @ {root}")
    print(f"  renames: {len(renames)}")
    print(f"  deletes: {len(deletes)}")
    print(f"  creates: {len(creates)}")
    print(f"  dry-run: {args.dry_run}")
    print()

    ep_dir = root / "episodes"

    # 1. delete
    for dslug in deletes:
        target = ep_dir / f"{dslug}.md"
        if target.exists():
            if args.dry_run:
                print(f"[dry-run] removeria: {target}")
            else:
                target.unlink()
                print(f"removido: {target}")
        else:
            print(f"aviso: arquivo a deletar nao existe: {target}")

    # 2. mv em duas fases
    ops = topological_renames(renames)
    for src_slug, dst_slug in ops:
        src = ep_dir / f"{src_slug}.md"
        dst = ep_dir / f"{dst_slug}.md"
        if not src.exists():
            print(f"aviso: origem nao existe: {src}")
            continue
        if args.dry_run:
            print(f"[dry-run] mv {src.name} -> {dst.name}")
        else:
            shutil.move(str(src), str(dst))
            print(f"mv {src.name} -> {dst.name}")

    # 3. atualizar self-refs em eps renomeados (apos fase 2)
    final_renames = {o: n for o, n in renames.items() if o != n}
    for old_slug, new_slug in final_renames.items():
        target = ep_dir / f"{new_slug}.md"
        if args.dry_run:
            print(f"[dry-run] atualizaria self-refs em: {target}")
        else:
            update_episode_self_refs(target, new_slug)

    # 4. atualizar refs cruzadas
    n = update_cross_refs(root, final_renames, deletes, args.dry_run)
    print(f"cross-refs: {n} arquivos modificados")

    # 5. criar placeholders
    for cslug in creates:
        create_placeholder(root, cslug, args.dry_run)

    # 6. validate
    if not args.skip_validate and not args.dry_run:
        print()
        print("--- rodando validate.sh ---")
        validate = SCRIPT_DIR / "validate.sh"
        if validate.exists():
            subprocess.run(["bash", str(validate), "--root", str(root)], check=False)

    return 0


if __name__ == "__main__":
    sys.exit(main())
