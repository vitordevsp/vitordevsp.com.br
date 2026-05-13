---
title: TASK-003 - Metadata dinamica de Projetos
status: draft
priority: P0
type: implementacao
metadata:
  owner: editorial-polish
  created_at: 2026-05-13 00:30
  updated_at: 2026-05-13 00:30
  tags:
    - tasks
    - seo
    - projects
---

# TASK-003 - Metadata dinamica de Projetos

## Objetivo

Revisar `generateMetadata` em `src/app/projetos/[slug]/page.tsx` para usar dados do `Project`.

## Escopo

- `generateMetadata({ params })`:
  - busca `Project` por slug via `get-project-by-slug`;
  - retorna `title`, `description`, `openGraph`, `twitter`;
  - fallback seguro.

## Nao inclui

- imagem OG por projeto (postergar).

## Entradas e contratos

- `get-project-by-slug` (PLAN-007 TASK-001);
- `Project` (PLAN-004 TASK-006).

## Resultado esperado

- cada `/projetos/[slug]` tem metadata propria.

## Criterios de aceite

- [ ] `generateMetadata` definido;
- [ ] usa modelo interno;
- [ ] fallback seguro;
- [ ] tags inspecionaveis no HTML.

## Validacao minima

- abrir HTML de um projeto real e validar tags.

## Dependencias

- PLAN-007 TASK-004.

## Referencias

- [`docs/architecture.md`](../../../../../docs/architecture.md)
- [`docs/content-model.md`](../../../../../docs/content-model.md)

## Perguntas em aberto

- exibir `version` no titulo?
