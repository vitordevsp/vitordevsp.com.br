---
title: TASK-001 - Criar API de dominio de Projetos
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
    - api
---

# TASK-001 - Criar API de dominio de Projetos

## Objetivo

Implementar `src/features/projects/api/get-projects.ts` e `get-project-by-slug.ts`, ambos server-only, retornando modelos `Project`.

## Escopo

- `src/features/projects/api/get-projects.ts`:
  - `import 'server-only'`;
  - usa `queryDatabase` + `paginateAll`;
  - mapeia via `toProject`;
  - descarta `null`;
  - ordenacao default por `publishedAt` desc com fallback;
- `src/features/projects/api/get-project-by-slug.ts`:
  - retorna `Project | null`;
  - opcionalmente acompanha blocos para o detalhe.

## Nao inclui

- componentes (TASK-002);
- paginas (TASK-003, TASK-004);
- relacionamento com Jardim.

## Entradas e contratos

- `queries.ts` e `databases.ts` (PLAN-004);
- `toProject` mapper (PLAN-004 TASK-006);
- tipo `Project` (PLAN-004 TASK-006).

## Resultado esperado

- duas funcoes exportadas e tipadas;
- consumiveis pelas paginas.

## Criterios de aceite

- [ ] `import 'server-only'`;
- [ ] retorno tipado;
- [ ] paginacao completa;
- [ ] `npx tsc --noEmit` passa.

## Validacao minima

- chamar `get-projects` em rota server-side com env real.

## Dependencias

- PLAN-004 TASK-001 a TASK-003, TASK-006.

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)
- [`docs/content-model.md`](../../../../../docs/content-model.md)

## Perguntas em aberto

- ordenacao default por `publishedAt` desc?
- politica de publicacao publica.
