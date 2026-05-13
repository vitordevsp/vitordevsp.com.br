---
title: PLAN-006 - Jardim Digital
status: draft
tags:
  - plans
  - garden
  - notion
metadata:
  owner: garden
  created_at: 2026-05-13 00:15
  updated_at: 2026-05-13 00:15
---

# PLAN-006 - Jardim Digital

## Objetivo

Entregar a area central de conteudos textuais autorais: `/jardim` (listagem) e `/jardim/[slug]` (detalhe), consumindo `TextPost` via Notion (PLAN-004) com renderer minimo de blocos. Maturidade visivel em cada item.

## Contexto

Jardim Digital e o produto central segundo [ADR-003](../../../docs/decisions/ADR-003-digital-garden-as-core-product.md) e [`docs/product.md`](../../../docs/product.md). Modelagem em [`docs/content-model.md`](../../../docs/content-model.md). Notion como CMS via PLAN-004. Esta frente entrega API de dominio (`get-text-posts`, `get-text-post-by-slug`), UI propria (`text-post-card`, `maturity-badge`, `text-post-list`), e as duas rotas com metadata basica. Filtros simples opcionais (por tipo/tag/maturidade) podem entrar via query string se nao comprometerem v1.

## Escopo

- `src/features/garden/api/get-text-posts.ts` (Server-only);
- `src/features/garden/api/get-text-post-by-slug.ts`;
- `src/features/garden/ui/text-post-card/`;
- `src/features/garden/ui/maturity-badge/`;
- `src/features/garden/ui/text-post-list/`;
- `src/app/jardim/page.tsx` (listagem + estado vazio + metadata);
- `src/app/jardim/[slug]/page.tsx` (detalhe + `generateMetadata` + `notFound()` quando ausente);
- consumo de `NotionRenderer` (PLAN-004 TASK-007) para corpo;
- filtros simples opcionais via query string (`?kind=`, `?tag=`, `?stage=`) - sem estado global, sem virar Client Component a pagina inteira.

## Fora do escopo

- backlinks automaticos (pos-v1 PLAN-014);
- busca textual (pos-v1 PLAN-015);
- grafo de conteudo;
- scroll spy e indice lateral (pos-v1 PLAN-011);
- comentarios;
- compartilhamento social rico.

## Areas afetadas

- `src/features/garden/api/`
- `src/features/garden/ui/`
- `src/app/jardim/`
- `src/app/jardim/[slug]/`

## Tasks

- [`TASK-001 - Criar API de dominio do Jardim`](./tasks/TASK-001-api-dominio/README.md)
- [`TASK-002 - Criar componentes do Jardim`](./tasks/TASK-002-componentes-jardim/README.md)
- [`TASK-003 - Criar pagina listagem /jardim`](./tasks/TASK-003-pagina-listagem/README.md)
- [`TASK-004 - Criar pagina detalhe /jardim/[slug]`](./tasks/TASK-004-pagina-detalhe/README.md)
- [`TASK-005 - Filtros simples por query string`](./tasks/TASK-005-filtros-simples/README.md)

## Riscos e dependencias

- depende de PLAN-003 (componentes compartilhados) e PLAN-004 (cliente/queries/mapper/renderer);
- risco: regra de publicacao publica de `TextPost` ainda pendente (ver PLAN-004 perguntas em aberto). Mitigar com fallback documentado (e.g., considera publico se houver `Publicado Em` + slug);
- risco: lista grande no inicio nao acontece, mas paginacao server-side deve ser preparada caso volume aumente;
- risco: filtros adicionarem complexidade desnecessaria; manter opcionais e simples.

## Validacao

- `/jardim` lista posts publicos com card, tags e maturidade;
- `/jardim/[slug]` renderiza titulo, descricao, metadados editoriais e blocos do post;
- `notFound()` em slug inexistente;
- `generateMetadata` retorna titulo/descricao por post;
- nenhum `"use client"` adicionado nas paginas;
- build/lint/tsc passam.

## Criterio de encerramento

- conteudo textual publico aparece;
- maturidade visivel;
- detalhe renderiza com blocos;
- pendencias documentadas em [`docs/notion.md`](../../../docs/notion.md) (se houver) ou em report local.

## Referencias

- [`docs/product.md`](../../../docs/product.md)
- [`docs/content-model.md`](../../../docs/content-model.md)
- [`docs/notion.md`](../../../docs/notion.md)
- [`docs/decisions/ADR-003-digital-garden-as-core-product.md`](../../../docs/decisions/ADR-003-digital-garden-as-core-product.md)

## Perguntas em aberto

- regra de publicacao publica padrao para `TextPost`;
- ordenacao padrao da listagem (`publishedAt` desc? `updatedAt`?);
- exibir `kind` no card e/ou na pagina de detalhe? Como rotular em pt-BR?
- filtros entram na v1 ou ficam para evolucao? Sugestao: adiar se exigirem mais de 2 dias de trabalho.
