---
title: TASK-003 - Criar pagina /jardim
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
    - pages
---

# TASK-003 - Criar pagina /jardim

## Objetivo

Implementar `src/app/jardim/page.tsx` como Server Component buscando posts via `get-text-posts` e renderizando `<TextPostList>`.

## Escopo

- criar `src/app/jardim/page.tsx`;
- chamar `get-text-posts()` server-side;
- renderizar `Container`, `PageHeading`, `TextPostList`;
- estado vazio com mensagem util;
- metadata basica (`title`, `description`);
- `revalidate` por tempo (default sugerido: 600s).

## Nao inclui

- filtros via query (TASK-005);
- paginacao visual (a lista vem completa server-side na v1);
- componentes especificos novos.

## Entradas e contratos

- `get-text-posts` (TASK-001);
- componentes (TASK-002 + PLAN-003).

## Resultado esperado

- `/jardim` lista posts publicos com cards.

## Criterios de aceite

- [ ] Server Component;
- [ ] busca server-side;
- [ ] estado vazio claro;
- [ ] metadata basica;
- [ ] sem `"use client"`;
- [ ] build passa.

## Validacao minima

- abrir `/jardim` em `npm run dev` com env real;
- conferir card + maturidade + tags.

## Dependencias

- TASK-001 (API);
- TASK-002 (componentes).

## Referencias

- [`docs/product.md`](../../../../../docs/product.md)

## Perguntas em aberto

- `revalidate` 600s e adequado? Pode ser ajustado depois.
