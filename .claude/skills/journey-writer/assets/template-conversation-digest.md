---
title: Template de digest de conversa
description: Arquivo condensado por conversa dentro de sources/conversations/.
metadata:
  author: agents-studio
  last_updated: 2026-05-16 14:00
  version: "1.0.0"
---

# Template conversation digest

Copiar para `sources/conversations/{8hex}-{tool-id}.md`.

Nome do arquivo: primeiros 8 caracteres do UUID + `-` + `tool.id` (ex.: `7636668b-claude-code.md`).

```yaml
---
kind: conversation-digest
conversation:
  id: 00000000-0000-0000-0000-000000000000
  id_short: 00000000
tool:
  id: claude-code
  label: null
storage:
  path: /home/USER/.claude/projects/ENCODED-CWD/00000000-0000-0000-0000-000000000000.jsonl
  path_kind: jsonl
  project_encoded: ENCODED-CWD
  note: null
agent:
  name: journey-writer
  kind: skill
session:
  started_at: AAAA-MM-DD
  ended_at: AAAA-MM-DD
  git_branch: branch-name
relevance: primary
extraction:
  method: extract-conversation.sh
  extracted_at: AAAA-MM-DD HH:MM
  extracted_by: journey-writer
  coverage: partial
parent:
  kind: episode
  slug: NNN-slug
  path: episodes/NNN-slug
---
```

```md
# Conversa {id_short} ({tool.id})

## Resumo executivo

2–5 paragrafos: o que esta conversa contribui para o ep. Sem inventar fora do transcript.

## Decisoes e viradas

- decisao 1 (quem propôs: user | assistant)

## Citacoes verbatim — humano

> "trecho exato"

_Contexto:_ por que importa.

## Citacoes verbatim — assistente

> "trecho do agente quando relevante para pair-programming"

## Numeros e fatos objetivos

| Item | Valor | Contexto |
|------|-------|----------|
| | | |

## Material nao usado no ep ainda

- bullet de insight que ficou de fora da narrativa

## Lacunas

- o que nao deu para confirmar nesta conversa

## Re-leitura

Caminho bruto: ver `storage.path` no frontmatter. Para re-extrair:

```bash
bash .claude/skills/journey-writer/scripts/extract-conversation.sh <conversation.id>
```
```

### Campos obrigatorios do frontmatter

| Campo | Regra |
|-------|--------|
| `conversation.id` | UUID completo quando existir; senao id estavel do export |
| `tool.id` | enum fechado — ver [`pattern-episode-package.md`](../references/pattern-episode-package.md) |
| `storage.path` | absoluto OU `unknown` com `storage.note` |
| `agent.name` | skill, produto ou `unknown` |
| `relevance` | `primary` \| `secondary` |
| `parent.slug` | slug do pacote dono |
