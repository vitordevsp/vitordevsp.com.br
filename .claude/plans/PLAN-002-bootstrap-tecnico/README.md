---
title: PLAN-002 - Bootstrap tecnico da aplicacao
status: draft
tags:
  - plans
  - bootstrap
  - next
metadata:
  owner: app-foundation
  created_at: 2026-05-12 22:40
  updated_at: 2026-05-12 22:40
---

# PLAN-002 - Bootstrap tecnico da aplicacao

## Objetivo

Estabelecer a base tecnica do projeto Next.js alinhada a [`docs/architecture.md`](../../../docs/architecture.md): estrutura de `src/`, aliases, estilos globais minimos e configuracao estatica do site.

## Contexto

Projeto ja inicializado parcialmente: `next@16.2.4`, `react@19.2.4`, `typescript@5`, `eslint@9`, `eslint-config-next` instalados. `src/app/` contem `layout.tsx`, `globals.css` e route group `(home)`. Alias `@/*` -> `./src/*` ja configurado em `tsconfig.json`. Plano cobre o que falta: criar diretorios `features/`, `integrations/`, `shared/`, `content/`, normalizar estilos globais com `reset.css` e `tokens.css`, e introduzir `src/content/site.ts`.

## Escopo

- estrutura completa de `src/` conforme [`docs/architecture.md`](../../../docs/architecture.md);
- alias `@/*` validado;
- estilos globais minimos em `src/shared/styles/` (reset, tokens, globals);
- `src/content/site.ts` com nome, descricao, links sociais, navegacao principal;
- scripts `npm run dev | build | lint | tsc` rodando sem erro;
- nenhuma feature de domínio adicionada (cobertas por PLAN-003 em diante).

## Fora do escopo

- header, footer, layout visual (PLAN-003);
- integracao Notion (PLAN-004);
- paginas alem do layout raiz minimo (PLAN-005);
- componentes de dominio (PLAN-006/007/008);
- frameworks CSS, libs de estado, libs de UI.

## Areas afetadas

- [`src/app/`](../../../src/app/)
- `src/features/`, `src/integrations/`, `src/shared/`, `src/content/` (a criar)
- [`tsconfig.json`](../../../tsconfig.json)
- [`package.json`](../../../package.json)

## Tasks

- [`TASK-001 - Validar bootstrap Next.js`](./tasks/TASK-001-validar-bootstrap-next/README.md)
- [`TASK-002 - Criar estrutura src`](./tasks/TASK-002-criar-estrutura-src/README.md)
- [`TASK-003 - Validar aliases`](./tasks/TASK-003-validar-aliases/README.md)
- [`TASK-004 - Criar estilos globais minimos`](./tasks/TASK-004-criar-estilos-globais/README.md)
- [`TASK-005 - Criar configuracao estatica do site`](./tasks/TASK-005-criar-site-config/README.md)

## Riscos e dependencias

- depende de PLAN-001 (decisoes ja registradas em `docs/`);
- risco: estrutura existente de `src/app/(home)` precisa ser preservada ao reorganizar; nao remover sem decisao;
- risco: introducao prematura de subpastas em `features/` (criar apenas conforme demanda das frentes posteriores);
- risco: tokens CSS mal definidos no inicio dificultam refino visual em PLAN-003 - manter minimo e neutro.

## Validacao

- `npm run lint` passa;
- `npm run build` passa;
- `npx tsc --noEmit` passa;
- arvore `src/` com `app/`, `features/`, `integrations/`, `shared/`, `content/` presentes;
- `src/shared/styles/` contem `reset.css`, `tokens.css`, `globals.css`;
- `src/content/site.ts` exporta `siteConfig` consumivel pelo layout raiz.

## Criterio de encerramento

- aplicacao roda localmente com `npm run dev`;
- estrutura de pastas alinhada a [`docs/architecture.md`](../../../docs/architecture.md);
- comandos `lint`, `build`, `tsc` passam;
- sem dependencias extras instaladas.

## Referencias

- [`docs/architecture.md`](../../../docs/architecture.md)
- [`docs/styling.md`](../../../docs/styling.md)
- [`docs/decisions/ADR-004-rsc-first-frontend.md`](../../../docs/decisions/ADR-004-rsc-first-frontend.md)
- [`docs/decisions/ADR-005-css-modules.md`](../../../docs/decisions/ADR-005-css-modules.md)

## Perguntas em aberto

- conjunto inicial de tokens CSS (cores neutras, tipografia base) deve ser proposto aqui ou postergado para PLAN-003?
- `src/content/site.ts` deve ja incluir handles sociais reais ou usar placeholders ate v1 fechar?
- manter route group `(home)` existente ou mover Home direto para `src/app/page.tsx`?
