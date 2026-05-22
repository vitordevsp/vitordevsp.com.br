---
title: Migracao de episodios flat para pacote (pasta)
description: Passo a passo para converter episodes/NNN-slug.md em episodes/NNN-slug/ sem perder refs.
metadata:
  author: agents-studio
  last_updated: 2026-05-16 14:00
  version: "1.0.0"
---

# Migracao flat -> pacote

## Quando migrar

- ep com `metadata.sources.sessions` populado (maior ganho);
- ep que sera enriquecido em breve;
- ep piloto antes de migrar o lote (recomendado: um ep por sessao de migracao).

Nao e obrigatorio migrar todos de uma vez. Flat legado continua valido com aviso no validate.

## Procedimento por ep

1. **Criar pasta** `episodes/NNN-slug/`.
2. **Mover** `episodes/NNN-slug.md` -> `episodes/NNN-slug/episode.md`.
3. **Criar** `sources/INDEX.md` a partir de [`template-sources-index.md`](../assets/template-sources-index.md).
4. Para cada entrada em `metadata.sources.sessions` (legado):
   - criar `sources/conversations/{id[0:8]}-{tool-id}.md` via [`template-conversation-digest.md`](../assets/template-conversation-digest.md);
   - preencher frontmatter (inferir `tool.id: claude-code` se path contem `.claude/projects/`);
   - colar `summary` legado em "Resumo executivo"; rodar `extract-conversation.sh` para enriquecer corpo depois.
5. Opcional: `sources/artifacts/commits.md` e `files.md` a partir de listas legadas.
6. **Substituir** bloco `metadata.sources` no `episode.md` pelo formato ponteiro (ver [`pattern-episode-package.md`](./pattern-episode-package.md)).
7. **Atualizar refs** no repo: `episodes/NNN-slug.md` -> `episodes/NNN-slug/episode.md` (grep `NNN-slug`).
8. Rodar `bash .claude/skills/journey-writer/scripts/validate.sh`.

## Inferir tool.id a partir do path

| Padrao no `storage.path` | `tool.id` |
|--------------------------|-----------|
| `~/.claude/projects/` + `.jsonl` | `claude-code` |
| `.cursor/` ou export Cursor | `cursor` |
| `codex` no path ou metadata Codex | `codex` |
| antigravity | `antigravity` |
| incerto | `other` + `tool.label` |

## Piloto neste repositorio

`009-criacao-do-fluxo-journey` migrado primeiro (meta do proprio fluxo journey).

Demais eps: migrar incrementalmente quando forem refinados (`enriquecer`).
