#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "PyYAML>=6,<7",
# ]
# ///

"""Valida a estrutura minima de uma skill no padrao local do Agents Studio."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import yaml


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Valida o pacote de uma skill no padrao local do Agents Studio.",
        epilog=(
            "Exemplos:\n"
            "  scripts/validate_skill_package.py .\n"
            "  scripts/validate_skill_package.py . --format text\n"
        ),
        formatter_class=argparse.RawTextHelpFormatter,
    )
    parser.add_argument(
        "skill_dir",
        nargs="?",
        default=".",
        help="Diretorio raiz da skill. Default: diretório atual.",
    )
    parser.add_argument(
        "--format",
        choices=("json", "text"),
        default="json",
        help="Formato da saida principal. Default: json.",
    )
    return parser.parse_args()


def load_frontmatter(path: Path) -> dict:
    text = path.read_text()
    match = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not match:
        raise ValueError("frontmatter ausente ou invalido")
    data = yaml.safe_load(match.group(1))
    if not isinstance(data, dict):
        raise ValueError("frontmatter precisa ser um mapa YAML")
    return data


def check_required(data: dict, required: list[str], label: Path | str) -> list[str]:
    return [f"{label}: faltando {field}" for field in required if field not in data]


def validate_markdown_collection(paths: list[Path], required: list[str], errors: list[str], checked: list[str]) -> None:
    for path in paths:
        data = load_frontmatter(path)
        errors.extend(check_required(data, required, path))
        metadata = data.get("metadata")
        if not isinstance(metadata, dict):
            errors.append(f"{path}: metadata precisa ser um mapa")
        else:
            errors.extend(check_required(metadata, ["author", "last_updated", "version"], f"{path}#metadata"))
        checked.append(str(path))


def validate_skill(skill_dir: Path) -> tuple[list[str], dict]:
    errors: list[str] = []
    info: dict = {"skill_dir": str(skill_dir), "checked": []}

    skill_md = skill_dir / "SKILL.md"
    if not skill_md.exists():
        return [f"{skill_md}: arquivo nao encontrado"], info

    skill_data = load_frontmatter(skill_md)
    errors.extend(check_required(skill_data, ["name", "description", "metadata"], skill_md))
    metadata = skill_data.get("metadata")
    if not isinstance(metadata, dict):
        errors.append(f"{skill_md}: metadata precisa ser um mapa")
    else:
        errors.extend(check_required(metadata, ["author", "last_updated", "version"], f"{skill_md}#metadata"))
    info["checked"].append(str(skill_md))

    openai_path = skill_dir / "agents" / "openai.yaml"
    if not openai_path.exists():
        errors.append(f"{openai_path}: arquivo nao encontrado")
    else:
        openai = yaml.safe_load(openai_path.read_text())
        if not isinstance(openai, dict):
            errors.append(f"{openai_path}: yaml invalido")
        else:
            errors.extend(check_required(openai, ["display_name", "short_description", "default_prompt"], openai_path))
        info["checked"].append(str(openai_path))

    validate_markdown_collection(
        sorted((skill_dir / "references").glob("*.md")),
        ["title", "description", "metadata"],
        errors,
        info["checked"],
    )
    validate_markdown_collection(
        sorted((skill_dir / "assets").glob("*.md")),
        ["title", "description", "metadata"],
        errors,
        info["checked"],
    )

    references_dir = skill_dir / "references"
    assets_dir = skill_dir / "assets"

    required_reference_files = [
        references_dir / "version-history.md",
        references_dir / "sequence-workflows.md",
    ]
    for path in required_reference_files:
        if not path.exists():
            errors.append(f"{path}: arquivo obrigatorio nao encontrado")

    if not any(references_dir.glob("pattern-*.md")):
        errors.append(f"{references_dir}: pelo menos um pattern-*.md e obrigatorio")

    if not any(assets_dir.glob("*.md")):
        errors.append(f"{assets_dir}: pelo menos um template markdown e obrigatorio")

    info["scripts_present"] = (skill_dir / "scripts").exists()
    return errors, info


def main() -> int:
    args = parse_args()
    skill_dir = Path(args.skill_dir).resolve()
    errors, info = validate_skill(skill_dir)
    payload = {"ok": not errors, "errors": errors, "info": info}

    if args.format == "json":
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        if errors:
            print("Validacao falhou:", file=sys.stderr)
            for error in errors:
                print(f"- {error}", file=sys.stderr)
        else:
            print("Validacao OK")
            print(f"Arquivos verificados: {len(info['checked'])}")

    return 0 if not errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
