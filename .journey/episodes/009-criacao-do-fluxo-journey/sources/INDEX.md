---
kind: sources-index
parent_kind: episode
parent_slug: 009-criacao-do-fluxo-journey
parent_title: EP-009 - Criacao do fluxo .journey/
package: episode-package/1.0
last_review: 2026-05-16 14:00
counts:
  conversations: 3
  commits: 1
  files: 5
  external: 0
tools_seen:
  - claude-code
---

# Indice de fontes — EP-009

Fonte de verdade para conversas: arquivos em `conversations/`. O frontmatter de `episode.md` so mantem rollup e ponteiro para este indice.

## Conversas

| ID (curto) | Ferramenta | Agente | Data | Relevancia | Arquivo |
|------------|------------|--------|------|------------|---------|
| 7636668b | claude-code | ast-skill-writer → journey-writer | 2026-05-13 | primary | [7636668b-claude-code.md](./conversations/7636668b-claude-code.md) |
| 14342648 | claude-code | journey-writer | 2026-05-13 | primary | [14342648-claude-code.md](./conversations/14342648-claude-code.md) |
| 08c8d64a | claude-code | journey-writer | 2026-05-14 | primary | [08c8d64a-claude-code.md](./conversations/08c8d64a-claude-code.md) |

## Commits

[artifacts/commits.md](./artifacts/commits.md)

## Arquivos do repo

[artifacts/files.md](./artifacts/files.md)

## Resgates externos

Nenhum neste ep.

## Migracao

Material legado do frontmatter flat (lista `sessions`/`commits`/`files`) foi promovido para digests e artifacts em **2026-05-16** (skill `journey-writer` 2.0.0).

## Pendencias

- [ ] Re-executar `extract-conversation.sh` nos tres IDs para expandir corpo dos digests (hoje: resumo migrado + quotes ja no ep).
