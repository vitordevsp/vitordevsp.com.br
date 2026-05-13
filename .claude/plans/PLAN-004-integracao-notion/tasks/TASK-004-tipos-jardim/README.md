---
title: TASK-004 - Criar tipos internos do Jardim
status: draft
priority: P0
type: implementacao
metadata:
  owner: notion-integration
  created_at: 2026-05-13 00:05
  updated_at: 2026-05-13 00:05
  tags:
    - tasks
    - model
    - garden
---

# TASK-004 - Criar tipos internos do Jardim

## Objetivo

Definir `TextPost`, `TextPostKind`, `MaturityStage` e `PublicationStatus` em `src/features/garden/model/text-post.ts`, alinhados a [`docs/content-model.md`](../../../../../docs/content-model.md).

## Contexto local

Modelos internos sao a camada estavel entre Notion e UI. Mappers (TASK-005) e queries de feature (PLAN-006 TASK-001) dependem destes tipos.

## Escopo

- criar `src/features/garden/model/text-post.ts`:
  - `type TextPostKind = 'note' | 'insight' | 'post' | 'essay' | 'milestone' | 'changelog' | 'pattern' | 'gist'`;
  - `type MaturityStage = 'seed' | 'sprout' | 'sapling' | 'plant' | 'tree'`;
  - `type PublicationStatus = 'draft' | 'public' | 'archived'`;
  - `type TextPost = { ... }` conforme [`docs/content-model.md`](../../../../../docs/content-model.md) secao "TextPost";
- exports nomeados claros.

## Nao inclui

- tipos de outras features;
- mapper (TASK-005);
- helpers de filtragem (features cuidam disso).

## Entradas e contratos

- [`docs/content-model.md`](../../../../../docs/content-model.md).

## Resultado esperado

- arquivo criado com tipos exportados.

## Criterios de aceite

- [ ] tipos batem com [`docs/content-model.md`](../../../../../docs/content-model.md);
- [ ] `TextPost` inclui `type: 'text-post'`, `kind`, `publicationStatus`, `maturityStage`;
- [ ] sem `any`;
- [ ] `npx tsc --noEmit` passa.

## Validacao minima

- importar `TextPost` em arquivo de teste manual ou no proprio mapper (TASK-005).

## Dependencias

- PLAN-002 TASK-002 (`src/features/`).

## Referencias

- [`docs/content-model.md`](../../../../../docs/content-model.md)

## Perguntas em aberto

- mover `PublicationStatus` para `src/shared/model` se for compartilhado com Project? Sugestao: deixar local em cada feature ate aparecer duplicacao real.
