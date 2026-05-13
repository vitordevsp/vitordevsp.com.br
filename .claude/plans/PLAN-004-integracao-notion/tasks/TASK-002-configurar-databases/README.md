---
title: TASK-002 - Configurar databases Notion
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
    - config
---

# TASK-002 - Configurar databases Notion

## Objetivo

Criar `src/integrations/notion/databases.ts` lendo ids das databases conhecidas a partir de variaveis de ambiente, com erro controlado quando ausentes.

## Contexto local

[`docs/notion.md`](../../../../../docs/notion.md) lista sete databases. v1 prioriza Textos e Projetos. Demais ids podem aparecer ja preparados mas marcados como opcionais ate plano correspondente.

## Escopo

- criar `src/integrations/notion/databases.ts`;
- `import 'server-only'`;
- exportar `databases` objeto tipado com chaves `texts`, `projects`, `videos`, `books`, `culture`, `places`, `courses`;
- ler de:
  - `NOTION_DATABASE_TEXTS_ID`
  - `NOTION_DATABASE_PROJECTS_ID`
  - `NOTION_DATABASE_VIDEOS_ID`
  - `NOTION_DATABASE_BOOKS_ID`
  - `NOTION_DATABASE_CULTURE_ID`
  - `NOTION_DATABASE_PLACES_ID`
  - `NOTION_DATABASE_COURSES_ID`;
- funcao helper `requireDatabaseId(key)` que lanca erro controlado quando ausente, usada pelas queries de feature.

## Nao inclui

- queries (TASK-003);
- mappers (TASK-005, TASK-006);
- documentacao final (atualizar [`docs/notion.md`](../../../../../docs/notion.md) so se necessario).

## Entradas e contratos

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Variaveis de ambiente".

## Resultado esperado

- `src/integrations/notion/databases.ts` exporta `databases` + `requireDatabaseId(key)`;
- Textos e Projetos como obrigatorios na v1; demais opcionais.

## Criterios de aceite

- [ ] arquivo criado e tipado;
- [ ] `import 'server-only'` presente;
- [ ] `requireDatabaseId` lanca erro descritivo quando faltar;
- [ ] tipos seguem o padrao de [`docs/notion.md`](../../../../../docs/notion.md);
- [ ] build passa.

## Validacao minima

- chamada simulada de `requireDatabaseId('texts')` em pagina server-side.

## Dependencias

- TASK-001 (client.ts);
- PLAN-002 TASK-002 (`src/integrations/`).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)

## Perguntas em aberto

- declarar databases como obrigatorias ou opcionais por feature? Sugestao: Textos e Projetos obrigatorias; demais opcionais ate planos que as consumam (Galeria/Cursos).
