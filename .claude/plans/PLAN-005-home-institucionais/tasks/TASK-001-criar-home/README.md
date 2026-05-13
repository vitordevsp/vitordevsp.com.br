---
title: TASK-001 - Criar pagina Home
status: draft
priority: P0
type: implementacao
metadata:
  owner: site-shell
  created_at: 2026-05-13 00:10
  updated_at: 2026-05-13 00:10
  tags:
    - tasks
    - pages
    - home
---

# TASK-001 - Criar pagina Home

## Objetivo

Implementar `src/app/page.tsx` como Server Component, apresentando autor, destacando Jardim e Projetos e linkando demais areas.

## Contexto local

Hoje existe route group `src/app/(home)`. Decisao em aberto no plano: substituir por `page.tsx` na raiz ou conviver. Default desta task: criar `src/app/page.tsx` na raiz e remover/limpar o route group `(home)` apenas se o usuario confirmar.

## Escopo

- criar `src/app/page.tsx`;
- usar componentes compartilhados (`Container`, `Section`, `PageHeading`, `Card`) de PLAN-003;
- ler `siteConfig` para autor, descricao, navegacao;
- destacar `/jardim` e `/projetos`;
- linkar `/sobre`, `/galeria`, `/cursos`;
- metadata basica (`title`, `description`).

## Nao inclui

- listas dinamicas (postergar para PLAN-006/PLAN-007 que podem alimentar a Home depois);
- destaques editoriais via Notion (postergar);
- imagem hero customizada.

## Entradas e contratos

- [`docs/product.md`](../../../../../docs/product.md);
- `siteConfig` (PLAN-002 TASK-005);
- componentes (PLAN-003).

## Resultado esperado

- rota `/` renderiza Home com identidade minima e navegacao para todas as areas.

## Criterios de aceite

- [ ] Server Component;
- [ ] linka todas as seis areas;
- [ ] destaca Jardim e Projetos;
- [ ] metadata basica presente;
- [ ] build passa.

## Validacao minima

- abrir `/` em `npm run dev` e checar links + visual;
- `npm run build` passa.

## Dependencias

- PLAN-003 TASK-001 (layout raiz);
- PLAN-003 TASK-003 e TASK-004 (componentes);
- PLAN-002 TASK-005 (`site.ts`).

## Referencias

- [`docs/product.md`](../../../../../docs/product.md)
- [`src/content/site.ts`](../../../../../src/content/site.ts)

## Perguntas em aberto

- manter ou remover route group `(home)` existente?
