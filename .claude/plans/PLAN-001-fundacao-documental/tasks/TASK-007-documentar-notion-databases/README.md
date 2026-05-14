---
title: TASK-007 - Documentar databases do Notion
status: concluida
priority: P0
type: documentacao
metadata:
  owner: docs-foundation
  created_at: 2026-05-12 22:35
  updated_at: 2026-05-14 16:17
  tags:
    - tasks
    - docs
    - notion
---

# TASK-007 - Documentar databases do Notion

## Objetivo

Criar [`docs/notion.md`](../../../../../docs/notion.md) consolidando integracao Notion + referencia das databases conhecidas.

## Contexto local

Insumo direto para PLAN-004 (mappers e cliente Notion). Mantem nomeacao, ids esperados em env vars e mapeamento canonico Notion -> modelo interno em um unico lugar.

## Escopo

- principios da integracao Notion (server-only, env vars, fallback de ausencia);
- mapa de databases: Textos -> `TextPost`, Projetos -> `Project`, Galeria (Videos/Livros/Cultura/Viagens), Cursos;
- propriedades canonicas esperadas em cada database;
- pendencias e gaps documentados explicitamente.

## Nao inclui

- codigo do cliente Notion (PLAN-004);
- mappers (PLAN-004);
- decisoes sobre database schema (lado do Notion, fora do escopo do repo).

## Entradas e contratos

- ADR-002 (Notion como CMS);
- [`docs/content-model.md`](../../../../../docs/content-model.md) (modelos internos).

## Resultado esperado

- documento publicado em `docs/notion.md`, referenciado por [`docs/README.md`](../../../../../docs/README.md) e por [`docs/architecture.md`](../../../../../docs/architecture.md).

## Criterios de aceite

- [x] integracao Notion descrita como server-only;
- [x] bases conhecidas registradas;
- [x] mapeamento esperado documentado;
- [x] pendencias de campos, slug e publicacao explicitas.

## Validacao minima

- leitura cruzada entre [`docs/notion.md`](../../../../../docs/notion.md), [`docs/content-model.md`](../../../../../docs/content-model.md) e [`docs/architecture.md`](../../../../../docs/architecture.md).

## Dependencias

- TASK-001 (estrutura `docs/`);
- TASK-003 (modelos internos);
- TASK-006 (ADR-002).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)
- [`docs/content-model.md`](../../../../../docs/content-model.md)

## Perguntas em aberto

- nenhuma.
