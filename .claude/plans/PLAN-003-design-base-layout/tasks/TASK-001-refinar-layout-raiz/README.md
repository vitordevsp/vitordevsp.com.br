---
title: TASK-001 - Refinar layout raiz
status: draft
priority: P0
type: implementacao
metadata:
  owner: design-system
  created_at: 2026-05-12 22:45
  updated_at: 2026-05-12 22:45
  tags:
    - tasks
    - layout
    - app
---

# TASK-001 - Refinar layout raiz

## Objetivo

Consolidar `src/app/layout.tsx` como Server Component com metadata base, estilos globais e estrutura semantica que recebe header/footer e children.

## Contexto local

Hoje `layout.tsx` existe mas pode estar com defaults do `create-next-app`. Esta task ajusta para o padrao da v1: import dos globals em `src/shared/styles/globals.css`, metadata base derivada de `src/content/site.ts`, locale `pt-BR`, sem `"use client"`.

## Escopo

- importar `@/shared/styles/globals.css`;
- definir metadata base com `siteConfig.siteName`, `siteConfig.defaultDescription` e `siteConfig.siteUrl`;
- definir locale `pt-BR` no `<html lang="pt-BR">`;
- estruturar `<body>` com slot para children, header e footer (componentes vem da TASK-002);
- garantir Server Component (sem `"use client"`).

## Nao inclui

- header/footer (TASK-002);
- componentes estruturais (TASK-003);
- metadata por rota (cobre PLAN-009);
- Open Graph completo (cobre PLAN-009).

## Entradas e contratos

- [`src/content/site.ts`](../../../../../src/content/site.ts) (criado em PLAN-002 TASK-005);
- [`src/shared/styles/globals.css`](../../../../../src/shared/styles/globals.css) (criado em PLAN-002 TASK-004).

## Resultado esperado

- `layout.tsx` renderiza estrutura semantica;
- metadata base presente;
- build passa.

## Criterios de aceite

- [ ] sem `"use client"` no `layout.tsx`;
- [ ] import dos globals correto;
- [ ] metadata base derivada de `siteConfig`;
- [ ] `<html lang="pt-BR">`;
- [ ] slot de children renderizado entre header e footer.

## Validacao minima

- `npm run build` passa;
- `npx tsc --noEmit` passa;
- inspecao visual de qualquer rota (Home placeholder).

## Dependencias

- PLAN-002 TASK-004 (estilos globais);
- PLAN-002 TASK-005 (`site.ts`).

## Referencias

- [`docs/architecture.md`](../../../../../docs/architecture.md) secao "Server Components".
- [`docs/styling.md`](../../../../../docs/styling.md).

## Perguntas em aberto

- nenhuma.
