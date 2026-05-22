# Episodios

## Formato atual (pacote v2)

Cada episodio e uma **pasta**:

```text
NNN-titulo-em-kebab/
  episode.md           # narrativa
  sources/
    INDEX.md           # indice de todas as fontes
    conversations/     # um digest condensado por conversa
    artifacts/         # commits, files, resgates externos
```

Link canonico: `episodes/NNN-slug/episode.md`  
Slug logico (refs em `derived_from`): `NNN-slug`

Spec completa: [`.claude/skills/journey-writer/references/pattern-episode-package.md`](../../.claude/skills/journey-writer/references/pattern-episode-package.md)

## Formato legado (flat)

Arquivos `NNN-slug.md` na raiz de `episodes/` ainda existem nos eps 001–008. Serao migrados incrementalmente ao refinar. Ver [migracao](../../.claude/skills/journey-writer/references/pattern-migration-episode-packages.md).

## Piloto migrado

- [`009-criacao-do-fluxo-journey/`](./009-criacao-do-fluxo-journey/)
