---
title: TASK-004 - Criar pagina /jardim/[slug]
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
    - pages
    - detail
---

# TASK-004 - Criar pagina /jardim/[slug]

## Objetivo

Implementar `src/app/jardim/[slug]/page.tsx` como Server Component, buscando `TextPost` por slug + blocos e renderizando metadados editoriais + corpo via `NotionRenderer`.

## Escopo

- criar `src/app/jardim/[slug]/page.tsx`;
- chamar `get-text-post-by-slug(slug)` server-side;
- usar `notFound()` quando ausente;
- renderizar cabecalho com titulo, maturidade, tags, datas;
- renderizar corpo com `NotionRenderer` (PLAN-004 TASK-007);
- implementar `generateMetadata({ params })` retornando titulo/descricao do post;
- considerar `generateStaticParams` para SSG (opcional).

## Nao inclui

- backlinks/relacionados (pos-v1);
- comentarios;
- indice lateral (pos-v1 PLAN-011);
- compartilhamento social;
- pre-busca de paginas vizinhas.

## Entradas e contratos

- `get-text-post-by-slug` (TASK-001);
- `NotionRenderer` (PLAN-004 TASK-007);
- componentes (PLAN-003 + TASK-002).

## Resultado esperado

- pagina renderiza posts com corpo legivel;
- slug ausente cai em `notFound()`.

## Criterios de aceite

- [ ] Server Component;
- [ ] `notFound()` quando slug ausente;
- [ ] `generateMetadata` por post;
- [ ] corpo renderizado via `NotionRenderer`;
- [ ] sem `"use client"`;
- [ ] build passa.

## Validacao minima

- abrir uma rota real `/jardim/<slug>` com env definida.

## Dependencias

- TASK-001 (API);
- PLAN-004 TASK-007 (renderer).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)
- [`docs/product.md`](../../../../../docs/product.md)

## Perguntas em aberto

- usar `generateStaticParams` para SSG na v1?
