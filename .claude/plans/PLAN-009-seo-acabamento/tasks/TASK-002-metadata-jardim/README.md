---
title: TASK-002 - Metadata dinamica do Jardim
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
    - garden
---

# TASK-002 - Metadata dinamica do Jardim

## Objetivo

Revisar `generateMetadata` em `src/app/jardim/[slug]/page.tsx` para usar dados do `TextPost` (titulo, descricao, OG).

## Escopo

- `generateMetadata({ params })`:
  - busca `TextPost` por slug via `get-text-post-by-slug`;
  - retorna `title`, `description`, `openGraph`, `twitter`;
  - fallback seguro quando post nao existe (retornar metadata padrao ou apenas titulo);
- nao acessar Notion bruto - usar modelo interno.

## Nao inclui

- imagem OG por post (postergar);
- structured data JSON-LD (so se baixo custo).

## Entradas e contratos

- `get-text-post-by-slug` (PLAN-006 TASK-001);
- `TextPost` (PLAN-004 TASK-004).

## Resultado esperado

- cada `/jardim/[slug]` tem metadata propria.

## Criterios de aceite

- [ ] `generateMetadata` definido;
- [ ] usa modelo interno;
- [ ] fallback seguro;
- [ ] tags inspecionaveis no HTML.

## Validacao minima

- abrir HTML de um post real e validar tags.

## Dependencias

- PLAN-006 TASK-004 (pagina de detalhe).

## Referencias

- [`docs/architecture.md`](../../../../../docs/architecture.md)
- [`docs/content-model.md`](../../../../../docs/content-model.md)

## Perguntas em aberto

- usar `excerpt` ou `description` como `og:description`?
