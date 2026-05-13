---
title: TASK-002 - Criar componentes do Jardim
status: draft
priority: P0
type: implementacao
metadata:
  owner: garden
  created_at: 2026-05-13 00:15
  updated_at: 2026-05-13 00:15
  tags:
    - tasks
    - garden
    - ui
---

# TASK-002 - Criar componentes do Jardim

## Objetivo

Implementar `text-post-card`, `maturity-badge` e `text-post-list` em `src/features/garden/ui/`, Server Components com CSS Modules.

## Contexto local

Componentes especificos do dominio Jardim. Reutilizam `Card`, `Tag`, `StatusBadge` de `shared/ui/` (PLAN-003) sem duplicar logica. `maturity-badge` mapeia `MaturityStage` para rotulos editoriais em pt-BR (`seed` -> Semente, `sprout` -> Broto, etc., conforme [`docs/content-model.md`](../../../../../docs/content-model.md)).

## Escopo

- `src/features/garden/ui/maturity-badge/`:
  - aceita `stage: MaturityStage`;
  - rotulo + cor/tom via `data-stage`;
- `src/features/garden/ui/text-post-card/`:
  - aceita `post: TextPost`;
  - mostra titulo, descricao, tags, maturidade, data;
  - linka para `/jardim/[slug]`;
- `src/features/garden/ui/text-post-list/`:
  - aceita `posts: TextPost[]`;
  - renderiza grid/lista de cards;
  - estado vazio simples.

## Nao inclui

- filtros (TASK-005);
- paginas (TASK-003, TASK-004);
- promocao para `shared/ui/` (nao fazer ate aparecer segundo consumidor com necessidade real).

## Entradas e contratos

- tipos `TextPost`, `MaturityStage` (PLAN-004 TASK-004);
- componentes base (PLAN-003 TASK-004).

## Resultado esperado

- tres componentes consumiveis pela pagina de listagem.

## Criterios de aceite

- [ ] tres pastas criadas com `.tsx` + `.module.css`;
- [ ] sem `"use client"`;
- [ ] consome `TextPost` sem vazar Notion bruto;
- [ ] `MaturityStage` rotulado em pt-BR via mapping local.

## Validacao minima

- consumo experimental em playground/listagem.

## Dependencias

- PLAN-003 TASK-004 (`Tag`, `StatusBadge`, `Card`);
- PLAN-004 TASK-004 (tipos).

## Referencias

- [`docs/content-model.md`](../../../../../docs/content-model.md)
- [`docs/styling.md`](../../../../../docs/styling.md)

## Perguntas em aberto

- exibir `kind` no card?
- `maturity-badge` usa cor/icone ou apenas texto?
