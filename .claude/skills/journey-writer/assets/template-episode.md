---
title: Template de episodio (pacote v2)
description: Base para `.journey/episodes/NNN-slug/` com episode.md + sources/.
metadata:
  author: agents-studio
  last_updated: 2026-05-16 14:00
  version: "2.0.0"
---

# Template de episodio

Episodios vivem em **pasta**, nao em arquivo solto na raiz de `episodes/`.

```text
.journey/episodes/NNN-titulo-em-kebab/
  episode.md
  sources/
    INDEX.md
    conversations/
      {8hex}-{tool-id}.md
    artifacts/
      commits.md
      files.md
```

Spec: [`references/pattern-episode-package.md`](../references/pattern-episode-package.md)

## Frontmatter de `episode.md`

```yaml
---
title: EP-NNN - Titulo do episodio
status: draft
type: cronologico
metadata:
  owner: journey-writer
  created_at: AAAA-MM-DD HH:MM
  updated_at: AAAA-MM-DD HH:MM
  tags:
    - episode
  era: atemporal
  lentes: []
  sources:
    index: sources/INDEX.md
    package: episode-package/1.0
    last_review: AAAA-MM-DD HH:MM
    counts:
      conversations: 0
      commits: 0
      files: 0
      external: 0
  derived_from: []
---
```

| Campo | Notas |
|-------|--------|
| `metadata.sources.index` | **obrigatorio** em pacote v2 |
| `metadata.sources.counts` | rollup opcional; manter coerente com INDEX |
| `metadata.derived_from` | slugs de outros pacotes (sem `.md`) |

**Deprecated:** listas `sessions`, `commits`, `files` no frontmatter do ep — vivem em `sources/`.

## Corpo de `episode.md`

Abrir com link para o indice:

```md
# EP-NNN — Titulo

Fontes: [`sources/INDEX.md`](./sources/INDEX.md).

## Gancho
...
```

Secoes: Gancho, Contexto, Conflito, Virada, Aprendizado, Possivel conteudo publico, Perguntas abertas, Fragmentos, Commits (ou link para `sources/artifacts/commits.md`).

Citar digest: `(via [digest 14342648](./sources/conversations/14342648-claude-code.md))`.

## Ao registrar conversa nova

1. Criar digest: [`template-conversation-digest.md`](./template-conversation-digest.md)
2. Atualizar [`template-sources-index.md`](./template-sources-index.md)
3. Bumpar `last_review` no INDEX e no `episode.md`

## Formato flat (legado)

`episodes/NNN-slug.md` ainda aceito com aviso no validate. Migrar com [`pattern-migration-episode-packages.md`](../references/pattern-migration-episode-packages.md).

Nao criar `000-template` em `episodes/`.
