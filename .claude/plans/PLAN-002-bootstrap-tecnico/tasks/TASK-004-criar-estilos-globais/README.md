---
title: TASK-004 - Criar estilos globais minimos
status: draft
priority: P0
type: implementacao
metadata:
  owner: app-foundation
  created_at: 2026-05-12 22:40
  updated_at: 2026-05-12 22:40
  tags:
    - tasks
    - css
    - styling
---

# TASK-004 - Criar estilos globais minimos

## Objetivo

Estabelecer base CSS minima em `src/shared/styles/` com `reset.css`, `tokens.css` e `globals.css`, conforme [`docs/styling.md`](../../../../../docs/styling.md).

## Contexto local

Hoje existe `src/app/globals.css`. Padrao do projeto e CSS Modules co-localizados ([ADR-005](../../../../../docs/decisions/ADR-005-css-modules.md)) com globals minimos. Esta task migra ou substitui o `globals.css` atual por estrutura segmentada.

## Escopo

- criar:
  - `src/shared/styles/reset.css` (reset basico);
  - `src/shared/styles/tokens.css` (cores neutras, tipografia, espacamentos, raios);
  - `src/shared/styles/globals.css` (importa reset + tokens, aplica defaults de body/html);
- importar `globals.css` no `src/app/layout.tsx`;
- remover o `src/app/globals.css` legado ou consolidar com a nova estrutura (decidir);
- nenhum framework CSS, nenhum CSS-in-JS;
- tokens minimos e neutros (sem cores autorais ainda).

## Nao inclui

- design system completo;
- componentes;
- temas dark/light (postergar);
- tipografia customizada com fontes externas (postergar).

## Entradas e contratos

- [`docs/styling.md`](../../../../../docs/styling.md)
- [`docs/decisions/ADR-005-css-modules.md`](../../../../../docs/decisions/ADR-005-css-modules.md)

## Resultado esperado

```text
src/shared/styles/
  reset.css
  tokens.css
  globals.css
```

Layout raiz importa `@/shared/styles/globals.css`.

## Criterios de aceite

- [ ] tres arquivos CSS criados;
- [ ] layout raiz importa o globals.css novo;
- [ ] sem dependencia de framework CSS;
- [ ] build passa;
- [ ] estilos basicos visiveis (font-family base, espacamento, reset).

## Validacao minima

- `npm run build` passa;
- inspecao visual de qualquer pagina (mesmo a Home placeholder existente).

## Dependencias

- TASK-002 (pasta `src/shared/`).

## Referencias

- [`docs/styling.md`](../../../../../docs/styling.md)
- [`src/app/globals.css`](../../../../../src/app/globals.css) atual (referencia para nao perder estilos existentes)

## Perguntas em aberto

- conjunto inicial de tokens (paleta, escala tipografica, espacamento) precisa de decisao? Sugestao: usar tokens neutros e refinar em PLAN-003.
- remover `src/app/globals.css` legado ou manter como reexport de `@/shared/styles/globals.css`?
