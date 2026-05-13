---
title: PLAN-003 - Design base, layout e componentes compartilhados
status: draft
tags:
  - plans
  - design-system
  - layout
metadata:
  owner: design-system
  created_at: 2026-05-12 22:45
  updated_at: 2026-05-12 22:45
---

# PLAN-003 - Design base, layout e componentes compartilhados

## Objetivo

Construir a base visual minima do site: layout raiz, header, footer, container, section, heading e os primeiros componentes editoriais (tag, status badge, card), todos em CSS Modules conforme [`docs/styling.md`](../../../docs/styling.md).

## Contexto

Depois do bootstrap (PLAN-002), o site precisa de uma fundacao visual reutilizavel antes de qualquer pagina concreta. Header e footer alimentam-se de `src/content/site.ts`. Componentes editoriais (tag, status badge, card) sao a fronteira entre `shared/ui` e o que vier especifico de feature (jardim, projetos).

Base visual e neutra na v1 - identidade autoral mais forte fica para evolucao posterior.

## Escopo

- `src/app/layout.tsx` definitivo da v1 com estilos globais, metadata base, estrutura HTML semantica;
- `src/shared/layout/site-header/` (componente Server por padrao; cliente so se houver menu mobile com toggle real);
- `src/shared/layout/site-footer/`;
- `src/shared/ui/container/`;
- `src/shared/ui/section/`;
- `src/shared/ui/page-heading/`;
- `src/shared/ui/tag/`;
- `src/shared/ui/status-badge/`;
- `src/shared/ui/card/`;
- todos com CSS Modules co-localizados;
- props explicitas e tipadas;
- nenhum estado global, nenhum CSS-in-JS, nenhuma lib de UI.

## Fora do escopo

- componentes especificos de Jardim (maturity-badge, text-post-card vao para PLAN-006);
- componentes especificos de Projetos (project-card vai para PLAN-007);
- imagens de marca, logo final;
- tema escuro;
- animacoes complexas;
- design system completo.

## Areas afetadas

- [`src/app/layout.tsx`](../../../src/app/layout.tsx)
- `src/shared/layout/`
- `src/shared/ui/`
- [`src/content/site.ts`](../../../src/content/site.ts) (consumo)

## Tasks

- [`TASK-001 - Refinar layout raiz`](./tasks/TASK-001-refinar-layout-raiz/README.md)
- [`TASK-002 - Criar site-header e site-footer`](./tasks/TASK-002-site-header-footer/README.md)
- [`TASK-003 - Criar componentes estruturais`](./tasks/TASK-003-componentes-estruturais/README.md)
- [`TASK-004 - Criar componentes editoriais basicos`](./tasks/TASK-004-componentes-editoriais/README.md)

## Riscos e dependencias

- depende de PLAN-002 (estrutura `src/`, `site.ts`, estilos globais);
- risco: promover componente de feature para `shared` cedo demais. Mitigar mantendo `tag`, `status-badge`, `card` genericos e tipados via `data-*`;
- risco: introducao desnecessaria de `"use client"` no header por causa de menu mobile. Adiar interatividade ate ser necessario;
- risco: tokens insuficientes em `tokens.css` levarem a duplicacao de valores. Refinar tokens conforme componentes nascerem.

## Validacao

- `npm run build` passa;
- `npx tsc --noEmit` passa;
- header e footer renderizam usando `siteConfig.mainNav`;
- componentes editoriais sao consumiveis em playground simples (mock page) sem regressao;
- nenhum `"use client"` adicionado sem justificativa registrada.

## Criterio de encerramento

- layout raiz pronto para receber qualquer pagina;
- componentes reutilizaveis disponiveis para PLAN-005 (Home/Sobre/Galeria/Cursos), PLAN-006 (Jardim) e PLAN-007 (Projetos);
- conjunto de tokens CSS estabilizado para v1 (refino fino fica para evolucao).

## Referencias

- [`docs/styling.md`](../../../docs/styling.md)
- [`docs/architecture.md`](../../../docs/architecture.md)
- [`src/content/site.ts`](../../../src/content/site.ts) (criado por PLAN-002 TASK-005)

## Perguntas em aberto

- menu mobile entra na v1 ou fica para evolucao? Se entrar, header vira Client Component pontual.
- card deve suportar `media` (imagem de capa) na v1 ou apenas texto + meta?
- usar `<nav>` semantico unico no header ou separar nav principal + nav de areas?
