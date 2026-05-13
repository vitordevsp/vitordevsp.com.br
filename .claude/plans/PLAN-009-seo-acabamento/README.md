---
title: PLAN-009 - SEO, metadata e acabamento editorial
status: draft
tags:
  - plans
  - seo
  - metadata
  - polish
metadata:
  owner: editorial-polish
  created_at: 2026-05-13 00:30
  updated_at: 2026-05-13 00:30
---

# PLAN-009 - SEO, metadata e acabamento editorial

## Objetivo

Garantir que a v1 publique com metadata coerente em todas as rotas, estados vazios cuidados, `not-found` claros, e que a experiencia editorial passe na primeira leitura. Foco em qualidade publica antes do release.

## Contexto

PLANs anteriores entregam funcionalidade. Este plano consolida o acabamento: metadata global, metadata dinamica por slug, Open Graph, estados vazios revisados e paginas de erro. [`docs/architecture.md`](../../../docs/architecture.md) define que metadata usa modelos internos, nao dados brutos.

## Escopo

- metadata global definitiva em `src/app/layout.tsx` (titulo template, descricao, OG, twitter, locale, themeColor opcional);
- metadata dinamica em `/jardim/[slug]` (revisar) e `/projetos/[slug]` (revisar);
- imagem social default (OG image) - placeholder em `src/content/` ou via rota dinamica (postergar dinamica se exigir muito esforco);
- revisao de estados vazios em `/jardim`, `/projetos`, `/galeria/*`, `/cursos`;
- paginas `not-found.tsx` por rota onde aplicar;
- revisao geral de copys e titulos das paginas institucionais.

## Fora do escopo

- analytics (postergar);
- sitemap.xml e robots.txt (avaliar; decidir entrada na v1 - ver perguntas em aberto);
- internationalization;
- conteudo SEO direcionado por palavra-chave;
- structured data avancado (JSON-LD) - so se baixo custo.

## Areas afetadas

- `src/app/layout.tsx`
- `src/app/jardim/[slug]/page.tsx`
- `src/app/projetos/[slug]/page.tsx`
- todas as paginas com estado vazio;
- `src/app/not-found.tsx` e variantes por rota;
- eventualmente `src/app/sitemap.ts`, `src/app/robots.ts` se decidirem entrar.

## Tasks

- [`TASK-001 - Configurar metadata global`](./tasks/TASK-001-metadata-global/README.md)
- [`TASK-002 - Metadata dinamica do Jardim`](./tasks/TASK-002-metadata-jardim/README.md)
- [`TASK-003 - Metadata dinamica de Projetos`](./tasks/TASK-003-metadata-projetos/README.md)
- [`TASK-004 - Revisar estados vazios`](./tasks/TASK-004-revisar-estados-vazios/README.md)
- [`TASK-005 - Criar paginas not-found`](./tasks/TASK-005-paginas-not-found/README.md)

## Riscos e dependencias

- depende de PLAN-005, PLAN-006, PLAN-007 e PLAN-008 (paginas existindo);
- risco: `generateMetadata` mal implementado vaza tipos Notion brutos;
- risco: imagem OG default pode parecer institucional demais ou pobre. Avaliar ao final.

## Validacao

- inspecionar HTML de cada rota e validar tags `<title>`, `<meta>` e OG;
- pre-visualizar em ferramentas como `metatags.io` ou similar;
- estados vazios visiveis e claros;
- `/<rota-inexistente>` cai em not-found.

## Criterio de encerramento

- toda rota publica tem metadata coerente;
- estados vazios revisados;
- not-found tratados;
- pronto para PLAN-010 (validacao e release).

## Referencias

- [`docs/architecture.md`](../../../docs/architecture.md) secao "SEO e metadados";
- [`docs/product.md`](../../../docs/product.md).

## Perguntas em aberto

- `sitemap.ts` e `robots.ts` entram na v1?
- usar `next/og` para gerar OG dinamico ou usar imagem estatica?
- usar `themeColor` ja na v1 ou aguardar identidade visual?
