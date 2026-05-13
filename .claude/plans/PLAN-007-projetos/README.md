---
title: PLAN-007 - Projetos
status: draft
tags:
  - plans
  - projects
  - notion
metadata:
  owner: projects
  created_at: 2026-05-13 00:20
  updated_at: 2026-05-13 00:20
---

# PLAN-007 - Projetos

## Objetivo

Entregar a area de Projetos como portfolio contextual: `/projetos` (listagem) e `/projetos/[slug]` (detalhe), consumindo `Project` via Notion (PLAN-004) e usando renderer minimo de blocos para o detalhe.

## Contexto

Projetos comunicam problema, contexto, papel, decisoes e aprendizados ([`docs/product.md`](../../../docs/product.md) Principio 11). Modelagem em [`docs/content-model.md`](../../../docs/content-model.md). Base Notion `Projetos` documentada em [`docs/notion.md`](../../../docs/notion.md), com pendencias (slug, repositorio, stack, links). Frente entrega API de dominio, componentes especificos e duas rotas.

## Escopo

- `src/features/projects/api/get-projects.ts` (server-only);
- `src/features/projects/api/get-project-by-slug.ts`;
- `src/features/projects/ui/project-card/`;
- `src/features/projects/ui/project-list/`;
- `src/features/projects/ui/project-status-badge/`;
- `src/app/projetos/page.tsx`;
- `src/app/projetos/[slug]/page.tsx` (com `generateMetadata` e `notFound()`);
- consumo de `NotionRenderer` (PLAN-004 TASK-007) na pagina de detalhe.

## Fora do escopo

- relacionamentos automaticos com Jardim (pos-v1 PLAN-014);
- pagina de filtros por categoria/status (pos-v1 PLAN-012);
- timeline de versoes;
- comparacao entre projetos;
- compartilhamento social rico.

## Areas afetadas

- `src/features/projects/api/`
- `src/features/projects/ui/`
- `src/app/projetos/`
- `src/app/projetos/[slug]/`

## Tasks

- [`TASK-001 - Criar API de dominio de Projetos`](./tasks/TASK-001-api-dominio/README.md)
- [`TASK-002 - Criar componentes de Projetos`](./tasks/TASK-002-componentes-projetos/README.md)
- [`TASK-003 - Criar pagina /projetos`](./tasks/TASK-003-pagina-listagem/README.md)
- [`TASK-004 - Criar pagina /projetos/[slug]`](./tasks/TASK-004-pagina-detalhe/README.md)

## Riscos e dependencias

- depende de PLAN-003 (componentes compartilhados) e PLAN-004 (cliente/queries/mapper/renderer);
- risco: pendencias da base Notion (slug, stack, repositorio, papel) podem deixar cards pobres. Mitigar com fallback claro quando campo ausente;
- risco: paginas de detalhe podem ficar quase vazias se database tiver pouco conteudo. Decidir se itens sem corpo abrem detalhe ou apenas card;
- risco: status do projeto sem mapeamento completo. Tabela atual cobre apenas tres estados; documentar fallback para outros valores.

## Validacao

- `/projetos` lista projetos publicos com status, tags e descricao;
- `/projetos/[slug]` renderiza detalhe com blocos;
- `notFound()` em slug inexistente;
- `generateMetadata` retorna titulo/descricao por projeto;
- build/lint/tsc passam.

## Criterio de encerramento

- projetos organizados;
- cada projeto comunica mais do que stack;
- pendencias da base Notion registradas em report local ou em [`docs/notion.md`](../../../docs/notion.md).

## Referencias

- [`docs/product.md`](../../../docs/product.md)
- [`docs/content-model.md`](../../../docs/content-model.md)
- [`docs/notion.md`](../../../docs/notion.md)

## Perguntas em aberto

- politica de publicacao publica para `Project`;
- ordenacao default (por `publishedAt`? por `status`?);
- itens sem corpo abrem detalhe ou ficam so como card?
- exibir versao no card quando houver?
