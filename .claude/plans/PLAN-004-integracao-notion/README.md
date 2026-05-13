---
title: PLAN-004 - Integracao Notion e modelos internos
status: draft
tags:
  - plans
  - notion
  - integration
  - mappers
metadata:
  owner: notion-integration
  created_at: 2026-05-13 00:05
  updated_at: 2026-05-13 00:05
---

# PLAN-004 - Integracao Notion e modelos internos

## Objetivo

Implementar a integracao server-only com o Notion, criando cliente, configuracao de databases, queries reutilizaveis, tipos e mappers para `TextPost` e `Project`, alem do renderer minimo de blocos textuais. Sustenta PLAN-005, PLAN-006 e PLAN-007.

## Contexto

Notion e o CMS editorial do projeto ([ADR-002](../../../docs/decisions/ADR-002-notion-as-cms.md)). UI nao recebe objetos brutos da API ([`docs/architecture.md`](../../../docs/architecture.md) + [`docs/notion.md`](../../../docs/notion.md)). Sete databases ja conhecidas em [`docs/notion.md`](../../../docs/notion.md) (Textos, Projetos, Videos, Livros, Cultura, Viagens, Cursos). Esta frente cobre as duas prioritarias da v1 (`TextPost` e `Project`) + renderer minimo de blocos textuais; demais mappers ficam para planos posteriores ou planos paralelos (Galeria/Cursos podem usar dados estaticos na v1).

## Escopo

- adicionar SDK oficial do Notion (`@notionhq/client`) se for o caminho escolhido;
- criar `src/integrations/notion/client.ts` server-only;
- criar `src/integrations/notion/databases.ts` lendo ids de env vars;
- criar `src/integrations/notion/queries.ts` (query database, retrieve page, retrieve block children, paginacao);
- criar `src/integrations/notion/blocks.ts` (fetch e preparo de blocos para renderizacao);
- criar `src/integrations/notion/types.ts` (tipos auxiliares da camada de integracao);
- criar tipos internos em `src/features/garden/model/text-post.ts` (`TextPost`, `TextPostKind`, `MaturityStage`);
- criar tipos internos em `src/features/projects/model/project.ts` (`Project`, `ProjectStatus`, `ProjectCategory`);
- criar `src/integrations/notion/mappers/text-post.mapper.ts`;
- criar `src/integrations/notion/mappers/project.mapper.ts`;
- criar renderer minimo de blocos em `src/features/garden/ui/notion-renderer/` (paragraph, headings, listas, quote, code, image, divider; fallback seguro para blocos nao suportados);
- documentar env vars necessarias.

## Fora do escopo

- mappers de `Video`, `Book`, `CultureItem`, `Place`, `Course` (postergados; pos-v1 PLAN-016);
- backlinks automaticos / busca / grafo;
- API routes (sem necessidade clara);
- cache custom alem do default do Next + revalidacao por tempo;
- syntax highlight em `code` (postergar para PLAN-013).

## Areas afetadas

- `src/integrations/notion/`
- `src/features/garden/model/`
- `src/features/projects/model/`
- `src/features/garden/ui/notion-renderer/`
- [`package.json`](../../../package.json) (adicao do SDK)
- variaveis de ambiente do projeto

## Tasks

- [`TASK-001 - Instalar e configurar cliente Notion`](./tasks/TASK-001-cliente-notion/README.md)
- [`TASK-002 - Configurar databases`](./tasks/TASK-002-configurar-databases/README.md)
- [`TASK-003 - Criar queries base`](./tasks/TASK-003-queries-base/README.md)
- [`TASK-004 - Criar tipos internos do Jardim`](./tasks/TASK-004-tipos-jardim/README.md)
- [`TASK-005 - Criar mapper de TextPost`](./tasks/TASK-005-mapper-text-post/README.md)
- [`TASK-006 - Criar tipos e mapper de Project`](./tasks/TASK-006-tipos-e-mapper-project/README.md)
- [`TASK-007 - Criar renderer minimo de blocos Notion`](./tasks/TASK-007-renderer-blocos/README.md)

## Riscos e dependencias

- depende de PLAN-002 (estrutura `src/integrations/`, `src/features/`);
- depende parcialmente de PLAN-003 para componentes editoriais usados pelo renderer (Tag eventualmente; renderer pode iniciar com markup puro);
- risco: vazamento de token (`NOTION_TOKEN`) por erro de import client/server. Mitigacao: `import 'server-only'` no client.ts;
- risco: schema do Notion mudar; mappers devem ter fallback e erro claro quando campo obrigatorio faltar;
- risco: items sem slug. Definir politica - excluir do publico ou cair em fallback (recomendado: excluir);
- risco: campos `Wiki` -> `TextPostKind` ainda indefinido (ver pendencias em [`docs/notion.md`](../../../docs/notion.md));
- risco: paginacao + revalidacao escolhidos cedo demais. Comecar com `revalidate` por tempo (ex.: 600s) e ajustar com volume real.

## Validacao

- `npm run lint` passa;
- `npm run build` passa;
- `npx tsc --noEmit` passa;
- com `NOTION_TOKEN` e `NOTION_DATABASE_TEXTS_ID` definidos, `get-text-posts` (a ser criado em PLAN-006) retorna lista nao vazia em ambiente real;
- nenhum token referenciado em codigo client;
- renderer cobre blocos minimos e falha silenciosa em desconhecido.

## Criterio de encerramento

- cliente, queries, tipos e mappers para `TextPost` e `Project` prontos e tipados;
- renderer minimo entrega corpo textual usavel para `/jardim/[slug]`;
- pendencias de schema documentadas em [`docs/notion.md`](../../../docs/notion.md) ou em `report.md` deste plano se necessario;
- segredos confinados ao servidor.

## Referencias

- [`docs/notion.md`](../../../docs/notion.md)
- [`docs/content-model.md`](../../../docs/content-model.md)
- [`docs/architecture.md`](../../../docs/architecture.md)
- [`docs/decisions/ADR-002-notion-as-cms.md`](../../../docs/decisions/ADR-002-notion-as-cms.md)

## Perguntas em aberto

- usar SDK oficial `@notionhq/client` ou `fetch` direto?
- politica para item sem slug: excluir do publico ou cair em slug derivado de titulo normalizado?
- `Wiki` deve alimentar `TextPostKind` na v1 ou criar campo dedicado no Notion antes?
- `revalidate` por tempo (e.g. 600s) e suficiente para a v1 ou precisa de revalidacao manual via webhook?
- regra de publicacao publica por database (campo a ser padronizado segundo [`docs/notion.md`](../../../docs/notion.md) secao "Pendencias gerais").
