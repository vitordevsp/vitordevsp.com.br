---
title: TASK-003 - Criar queries base Notion
status: draft
priority: P0
type: implementacao
metadata:
  owner: notion-integration
  created_at: 2026-05-13 00:05
  updated_at: 2026-05-13 00:05
  tags:
    - tasks
    - notion
    - queries
---

# TASK-003 - Criar queries base Notion

## Objetivo

Criar `src/integrations/notion/queries.ts` com funcoes genericas reutilizaveis: consultar database, recuperar pagina por id, recuperar blocos filhos e helper de paginacao.

## Contexto local

[`docs/notion.md`](../../../../../docs/notion.md) exige paginacao centralizada nesta camada. Sem logica de dominio aqui (mappers e features cuidam disso).

## Escopo

- criar `src/integrations/notion/queries.ts`:
  - `queryDatabase({ databaseId, filter, sorts, pageSize })`
  - `retrievePage(pageId)`
  - `retrieveBlockChildren(blockId, { pageSize? })`
  - `paginateAll(fetchPage)` helper para iterar `has_more` + `next_cursor`;
- `import 'server-only'`;
- usar `notionClient` da TASK-001;
- tipagem usa tipos auxiliares de `src/integrations/notion/types.ts` (criado tambem nesta task ou inline).

## Nao inclui

- queries especificas de feature (`get-text-posts`, `get-project-by-slug` ficam em features, criadas em PLAN-006 e PLAN-007);
- cache custom;
- revalidacao - decidir politica padrao (sugestao: `revalidate` por tempo configurado por funcao de feature, nao aqui).

## Entradas e contratos

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Estrutura da integracao";
- [`docs/architecture.md`](../../../../../docs/architecture.md).

## Resultado esperado

- `queries.ts` exporta as quatro funcoes;
- features podem consumir sem reimplementar paginacao.

## Criterios de aceite

- [ ] quatro funcoes implementadas;
- [ ] sem logica de dominio;
- [ ] sem `NEXT_PUBLIC_`;
- [ ] tipagem clara;
- [ ] `npx tsc --noEmit` passa;
- [ ] testavel manualmente com env real.

## Validacao minima

- chamar `queryDatabase` em rota server-side com env definida, verificar retorno paginado.

## Dependencias

- TASK-001 (client);
- TASK-002 (databases).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)

## Perguntas em aberto

- helper `paginateAll` retorna array completo ou async iterator? Sugestao: array completo na v1 (volume baixo).
