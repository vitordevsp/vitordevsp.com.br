---
title: Template de sources/INDEX.md
description: Indice de fontes de um pacote de episodio ou knowledge.
metadata:
  author: agents-studio
  last_updated: 2026-05-16 14:00
  version: "1.0.0"
---

# Template sources/INDEX.md

Copiar para `episodes/NNN-slug/sources/INDEX.md` ou `knowledges/NNN-slug/sources/INDEX.md`.

```yaml
---
kind: sources-index
parent_kind: episode | knowledge
parent_slug: NNN-slug
parent_title: EP-NNN - Titulo
package: episode-package/1.0
last_review: AAAA-MM-DD HH:MM
counts:
  conversations: 0
  commits: 0
  files: 0
  external: 0
tools_seen:
  - claude-code
---
```

```md
# Indice de fontes — EP-NNN

Registro machine-readable das fontes deste pacote. **Fonte de verdade** para conversas: arquivos em `conversations/`, nao listas no frontmatter do arquivo raiz.

## Conversas

| ID (curto) | Ferramenta | Agente | Data | Relevancia | Arquivo |
|------------|------------|--------|------|------------|---------|
| 7636668b | claude-code | journey-writer | 2026-05-13 | primary | [7636668b-claude-code.md](./conversations/7636668b-claude-code.md) |

## Commits

Ver [artifacts/commits.md](./artifacts/commits.md) se existir; senao lista inline:

- `eac92f5` (2026-05-13): descricao

## Arquivos do repo

Ver [artifacts/files.md](./artifacts/files.md) se existir.

## Resgates externos

| Data | LLM | Assunto | Arquivo |
|------|-----|---------|---------|
| — | — | — | — |

## Notas de migracao

- _opcional: de onde veio material legado do frontmatter_

## Pendencias

- [ ] digest X ainda so tem resumo — rodar extract-conversation.sh
```
