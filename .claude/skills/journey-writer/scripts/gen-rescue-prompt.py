#!/usr/bin/env python3
"""
gen-rescue-prompt.py — gera prompt parametrizado de resgate em LLM externo.

Le CLAUDE.md, docs/README.md, .journey/hero.md, ep alvo (se houver) e
open-questions.md. Filtra lacunas relevantes ao assunto via keyword.
Renderiza template-external-rescue-prompt.md substituindo variaveis.

Uso:
    python3 scripts/gen-rescue-prompt.py --assunto "<frase>" \\
        [--ep 003-v3-e-v3.1-...] [--era v3] \\
        [--exposicao privado|semi-publico|publico] \\
        [--angulo "<texto>"] [--project-name "<nome>"] \\
        [--root .]

Saida: bloco markdown copiavel em stdout.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
SKILL_DIR = SCRIPT_DIR.parent
TEMPLATE_PATH = SKILL_DIR / "assets" / "template-external-rescue-prompt.md"


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="gera prompt para resgate em LLM externo")
    p.add_argument("--assunto", required=True)
    p.add_argument("--ep", default="", help="slug do ep alvo (ex: 003-v3-e-v3.1-...)")
    p.add_argument("--era", default="", help="v1, v2, v3, v3.1, v3.2, atemporal")
    p.add_argument("--exposicao", default="privado", choices=["privado", "semi-publico", "publico"])
    p.add_argument("--angulo", default="")
    p.add_argument("--project-name", default="")
    p.add_argument("--root", default=".", help="raiz do projeto")
    return p.parse_args()


def read_safe(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except Exception:
        return ""


def extract_project_summary(root: Path) -> str:
    """Constroi resumo de 2-4 paragrafos sem expor sensivel."""
    chunks = []
    claude_md = read_safe(root / "CLAUDE.md")
    if claude_md:
        # extrai trecho introdutorio (paragrafo apos primeiro H1 ou no inicio)
        intro_match = re.search(r"^#[^#].*?\n+([\s\S]{200,800}?)(?=\n##|\Z)", claude_md, re.MULTILINE)
        if intro_match:
            chunks.append(intro_match.group(1).strip())

    hero = read_safe(root / ".journey" / "hero.md")
    if hero:
        # extrai bloco "Mundo comum" ou "Incomodo inicial"
        for section in ("Mundo comum", "Incomodo inicial", "Chamado"):
            m = re.search(rf"##\s+{section}\s*\n+([\s\S]{{100,600}}?)(?=\n##|\Z)", hero)
            if m:
                chunks.append(f"**{section}**\n{m.group(1).strip()}")
                break

    docs_readme = read_safe(root / "docs" / "README.md")
    if docs_readme and len(chunks) < 3:
        intro = docs_readme.split("\n\n", 3)
        if len(intro) >= 2:
            chunks.append(intro[1].strip()[:500])

    if not chunks:
        return "[resumo do projeto nao encontrado — preencher manualmente antes de copiar]"
    return "\n\n".join(chunks)


def extract_lacunas(root: Path, assunto: str, ep_slug: str) -> str:
    """Pega 3-6 perguntas de open-questions.md filtradas por keyword do assunto."""
    oq = read_safe(root / ".journey" / "open-questions.md")
    if not oq:
        return "[sem open-questions.md — pular esta secao]"

    # Extrai linhas que parecem perguntas (comecam com -, *, contem ?)
    lines = [l.strip() for l in oq.split("\n") if l.strip()]
    questions = [l for l in lines if (l.startswith("-") or l.startswith("*")) and "?" in l]

    keywords = [w.lower() for w in re.findall(r"\w{4,}", assunto)]
    ep_num = ""
    if ep_slug:
        m = re.match(r"^(\d{3})-", ep_slug)
        if m:
            ep_num = m.group(1)

    def score(q: str) -> int:
        ql = q.lower()
        s = sum(1 for k in keywords if k in ql)
        if ep_num and f"ep-{ep_num}" in ql:
            s += 2
        return s

    ranked = sorted(questions, key=score, reverse=True)
    selected = [q for q in ranked if score(q) > 0][:6]
    if not selected:
        selected = ranked[:3]
    if not selected:
        return "[nenhuma lacuna relevante encontrada — adicionar manualmente]"
    return "\n".join(selected)


def render_prompt(template: str, vars_: dict[str, str]) -> str:
    """Extrai o bloco interno (entre as fences ```` ```md ``` ```` do template) e substitui variaveis."""
    # O template guarda o prompt copiavel dentro de um bloco ````md ... ````
    m = re.search(r"````md\n([\s\S]*?)\n````", template)
    if not m:
        print("erro: template nao contem bloco ````md ... ````", file=sys.stderr)
        sys.exit(2)
    inner = m.group(1)
    for k, v in vars_.items():
        inner = inner.replace("{" + k + "}", v)
    return inner


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()

    if not TEMPLATE_PATH.exists():
        print(f"erro: template nao encontrado: {TEMPLATE_PATH}", file=sys.stderr)
        return 2

    template = TEMPLATE_PATH.read_text(encoding="utf-8")

    project_name = args.project_name or root.name
    project_summary = extract_project_summary(root)
    lacunas = extract_lacunas(root, args.assunto, args.ep)

    vars_ = {
        "PROJECT_NAME": project_name,
        "PROJECT_SUMMARY": project_summary,
        "ASSUNTO": args.assunto,
        "EPISODIO_ALVO": args.ep or "(nao especificado)",
        "ERA": args.era or "(nao especificado)",
        "NIVEL_EXPOSICAO": args.exposicao,
        "ANGULO_DESEJADO": args.angulo or "(livre)",
        "LACUNAS_CONHECIDAS": lacunas,
    }

    out = render_prompt(template, vars_)
    # Devolve dentro de fence ```md ... ``` para o usuario copiar
    print("```md")
    print(out)
    print("```")
    return 0


if __name__ == "__main__":
    sys.exit(main())
