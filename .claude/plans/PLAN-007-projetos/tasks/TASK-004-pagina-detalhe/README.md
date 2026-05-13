---
title: TASK-004 - Criar pagina /projetos/[slug]
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
    - pages
    - detail
---

# TASK-004 - Criar pagina /projetos/[slug]

## Objetivo

Implementar `src/app/projetos/[slug]/page.tsx` como Server Component, buscando `Project` por slug + blocos e renderizando contexto do projeto + corpo via `NotionRenderer` quando aplicavel.

## Escopo

- criar `src/app/projetos/[slug]/page.tsx`;
- chamar `get-project-by-slug(slug)`;
- usar `notFound()` quando ausente;
- renderizar cabecalho com nome, status, versao, tags, descricao;
- renderizar links (`repositoryUrl`, `liveUrl`) quando houver;
- renderizar corpo via `NotionRenderer` quando blocos existirem;
- implementar `generateMetadata({ params })`.

## Nao inclui

- backlinks/relacionados automaticos;
- comparacao entre projetos;
- timeline de versoes.

## Entradas e contratos

- `get-project-by-slug` (TASK-001);
- `NotionRenderer` (PLAN-004 TASK-007);
- componentes (PLAN-003 + TASK-002).

## Resultado esperado

- pagina renderiza projeto com contexto + corpo.

## Criterios de aceite

- [ ] Server Component;
- [ ] `notFound()` quando ausente;
- [ ] `generateMetadata` por projeto;
- [ ] corpo renderizado quando blocos existirem;
- [ ] sem `"use client"`;
- [ ] build passa.

## Validacao minima

- abrir uma rota real com env definida.

## Dependencias

- TASK-001 (API);
- PLAN-004 TASK-007 (renderer).

## Referencias

- [`docs/product.md`](../../../../../docs/product.md)

## Perguntas em aberto

- itens sem corpo abrem detalhe ou ficam so como card?
- `generateStaticParams` na v1?
