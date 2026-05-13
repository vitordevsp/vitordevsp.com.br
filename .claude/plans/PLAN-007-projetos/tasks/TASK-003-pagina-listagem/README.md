---
title: TASK-003 - Criar pagina /projetos
status: draft
priority: P0
type: implementacao
metadata:
  owner: projects
  created_at: 2026-05-13 00:20
  updated_at: 2026-05-13 00:20
  tags:
    - tasks
    - projects
    - pages
---

# TASK-003 - Criar pagina /projetos

## Objetivo

Implementar `src/app/projetos/page.tsx` como Server Component, listando projetos via `get-projects` e renderizando `<ProjectList>`.

## Escopo

- criar `src/app/projetos/page.tsx`;
- chamar `get-projects()` server-side;
- renderizar `Container`, `PageHeading`, `ProjectList`;
- estado vazio com mensagem util;
- metadata basica;
- `revalidate` por tempo (default sugerido: 600s).

## Nao inclui

- filtros por status/categoria (pos-v1 PLAN-012);
- paginacao visual;
- relacionamentos com Jardim.

## Entradas e contratos

- `get-projects` (TASK-001);
- componentes (TASK-002 + PLAN-003).

## Resultado esperado

- `/projetos` lista projetos publicos com cards.

## Criterios de aceite

- [ ] Server Component;
- [ ] busca server-side;
- [ ] estado vazio claro;
- [ ] metadata basica;
- [ ] sem `"use client"`;
- [ ] build passa.

## Validacao minima

- abrir `/projetos` no `npm run dev` com env real.

## Dependencias

- TASK-001 (API);
- TASK-002 (componentes).

## Referencias

- [`docs/product.md`](../../../../../docs/product.md)

## Perguntas em aberto

- `revalidate` 600s ok?
