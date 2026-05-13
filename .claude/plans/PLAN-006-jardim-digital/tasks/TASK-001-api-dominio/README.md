---
title: TASK-001 - Criar API de dominio do Jardim
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
    - api
---

# TASK-001 - Criar API de dominio do Jardim

## Objetivo

Implementar `src/features/garden/api/get-text-posts.ts` e `src/features/garden/api/get-text-post-by-slug.ts`, ambos server-only, retornando modelos internos `TextPost`.

## Contexto local

Camada de fetching especifica do Jardim. Usa `queries.ts` e `mappers/text-post.mapper.ts` de PLAN-004. UI nao chama Notion direto.

## Escopo

- criar `src/features/garden/api/get-text-posts.ts`:
  - `import 'server-only'`;
  - chamada a `queryDatabase` filtrando por publicacao publica;
  - `paginateAll` ate fim;
  - mapeia cada page com `toTextPost`;
  - descarta `null`;
  - ordenacao default por `publishedAt` desc (sujeito a decisao);
  - aceita filtros opcionais (`kind`, `tag`, `stage`) para uso pela pagina de listagem;
- criar `src/features/garden/api/get-text-post-by-slug.ts`:
  - `import 'server-only'`;
  - consulta filtrando por slug;
  - retorna `TextPost | null`;
  - opcional: recuperar blocos via `retrieveBlockChildren` e retornar pacote `{ post, blocks }`.

## Nao inclui

- componentes (TASK-002);
- pagina (TASK-003, TASK-004);
- filtros server-side avancados (cobertos por TASK-005);
- cache custom (usar `revalidate` padrao da pagina).

## Entradas e contratos

- `queries.ts` (PLAN-004 TASK-003);
- `databases.ts` (PLAN-004 TASK-002);
- mapper `toTextPost` (PLAN-004 TASK-005).

## Resultado esperado

- duas funcoes exportadas e tipadas;
- consumiveis pelas paginas em TASK-003 e TASK-004.

## Criterios de aceite

- [ ] `import 'server-only'`;
- [ ] retorno tipado com `TextPost`;
- [ ] paginacao completa;
- [ ] sem dependencia em tipos brutos do Notion fora do mapper;
- [ ] `npx tsc --noEmit` passa.

## Validacao minima

- chamar `get-text-posts` em rota server-side com env real e validar retorno.

## Dependencias

- PLAN-004 TASK-001, TASK-002, TASK-003, TASK-004, TASK-005.

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)
- [`docs/content-model.md`](../../../../../docs/content-model.md)

## Perguntas em aberto

- `get-text-post-by-slug` retorna `{ post, blocks }` ou apenas `post` (e a pagina busca blocks separado)?
- ordenacao default - `publishedAt` desc com fallback `updatedAt`?
