---
title: TASK-001 - Instalar e configurar cliente Notion
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
    - integration
---

# TASK-001 - Instalar e configurar cliente Notion

## Objetivo

Adicionar SDK oficial do Notion (ou alternativa via `fetch`), criar `src/integrations/notion/client.ts` server-only e validar que o token nao vaza para o client.

## Contexto local

[`docs/notion.md`](../../../../../docs/notion.md) exige integracao server-only, `NOTION_TOKEN` nunca em `NEXT_PUBLIC_`, sem log de token. ADR-002 referenda Notion como CMS.

## Escopo

- decidir SDK: `@notionhq/client` (oficial) ou `fetch` direto;
- instalar dependencia se aplicavel (`npm install @notionhq/client`);
- criar `src/integrations/notion/client.ts`:
  - `import 'server-only'`;
  - leitura de `process.env.NOTION_TOKEN` com erro claro se ausente;
  - exporta `notionClient` singleton;
- documentar variavel `NOTION_TOKEN` em local apropriado (env example ou doc).

## Nao inclui

- queries (TASK-003);
- databases (TASK-002);
- mappers (TASK-005, TASK-006);
- caching custom.

## Entradas e contratos

- [`docs/notion.md`](../../../../../docs/notion.md);
- [`docs/architecture.md`](../../../../../docs/architecture.md) secao "Variaveis de ambiente".

## Resultado esperado

- `src/integrations/notion/client.ts` exporta cliente server-only;
- import via `@/integrations/notion/client` funciona em Server Components;
- erro explicito se `NOTION_TOKEN` ausente.

## Criterios de aceite

- [ ] `import 'server-only'` presente;
- [ ] cliente exportado e funcional;
- [ ] erro claro com mensagem util quando `NOTION_TOKEN` ausente;
- [ ] sem `NEXT_PUBLIC_` em variavel de token;
- [ ] tipagem do cliente preservada;
- [ ] `npm run build` passa.

## Validacao minima

- importar em uma pagina server-side e logar tipo;
- tentar importar em um Client Component e confirmar erro de build.

## Dependencias

- PLAN-002 TASK-002 (`src/integrations/`).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)
- [`docs/decisions/ADR-002-notion-as-cms.md`](../../../../../docs/decisions/ADR-002-notion-as-cms.md)

## Perguntas em aberto

- SDK oficial ou `fetch` direto?
