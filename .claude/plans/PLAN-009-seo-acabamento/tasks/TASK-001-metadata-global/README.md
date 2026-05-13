---
title: TASK-001 - Configurar metadata global
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
    - metadata
---

# TASK-001 - Configurar metadata global

## Objetivo

Definir `metadata` (ou `generateMetadata`) global em `src/app/layout.tsx` com titulo template, descricao default, Open Graph, locale e demais campos basicos.

## Contexto local

Dados vem de `src/content/site.ts` (`siteName`, `defaultDescription`, `siteUrl`). Titulo deve usar template (`%s | siteName`).

## Escopo

- definir `metadata.title.default = siteName`;
- `metadata.title.template = '%s | siteName'`;
- `metadata.description = defaultDescription`;
- `metadata.metadataBase = new URL(siteUrl)`;
- `metadata.openGraph` com `title`, `description`, `url`, `siteName`, `locale: 'pt_BR'`, `type: 'website'`, `images: [...]` (placeholder);
- `metadata.twitter` com card resumo;
- `metadata.robots` default (permitir indexar).

## Nao inclui

- imagem OG dinamica (postergar para subtask se decidirem);
- analytics.

## Entradas e contratos

- `siteConfig` (PLAN-002 TASK-005).

## Resultado esperado

- HTML gerado contem tags coerentes em qualquer rota.

## Criterios de aceite

- [ ] `metadata` definido em `layout.tsx`;
- [ ] template aplicado;
- [ ] OG presente;
- [ ] build passa;
- [ ] inspecao HTML confirma tags.

## Validacao minima

- ver-fonte de qualquer pagina e checar tags;
- pre-visualizar OG em ferramenta externa.

## Dependencias

- PLAN-002 TASK-005 (`site.ts`);
- PLAN-003 TASK-001 (layout raiz).

## Referencias

- [`docs/architecture.md`](../../../../../docs/architecture.md) secao "SEO e metadados".

## Perguntas em aberto

- imagem OG default - estatica ou via `next/og`?
- definir `themeColor` na v1?
