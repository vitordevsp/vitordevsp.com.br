---
title: TASK-002 - Criar site-header e site-footer
status: draft
priority: P0
type: implementacao
metadata:
  owner: design-system
  created_at: 2026-05-13 00:00
  updated_at: 2026-05-13 00:00
  tags:
    - tasks
    - layout
    - shared
---

# TASK-002 - Criar site-header e site-footer

## Objetivo

Implementar `src/shared/layout/site-header/` e `src/shared/layout/site-footer/` como Server Components, consumindo `siteConfig.mainNav` e `siteConfig.socialLinks`.

## Contexto local

Header concentra navegacao principal entre areas (Home, Jardim, Projetos, Galeria, Cursos, Sobre). Footer concentra links sociais, copyright e ponteiros institucionais minimos. Sem menu mobile interativo na v1 (decisao em aberto no plano). Estilos via CSS Modules co-localizados.

## Escopo

- criar:
  - `src/shared/layout/site-header/site-header.tsx`
  - `src/shared/layout/site-header/site-header.module.css`
  - `src/shared/layout/site-footer/site-footer.tsx`
  - `src/shared/layout/site-footer/site-footer.module.css`
- consumir `siteConfig` via `import { siteConfig } from '@/content/site'`;
- usar `<nav>`, `<header>`, `<footer>` semanticos;
- destacar a rota ativa via `data-active` (sem `"use client"` na v1; pode acontecer via segmento ativo do Next ou via prop);
- montar header/footer no `layout.tsx`.

## Nao inclui

- menu mobile interativo (postergar);
- busca no header (futura);
- toggle de tema (futuro);
- breadcrumb.

## Entradas e contratos

- [`src/content/site.ts`](../../../../../src/content/site.ts);
- [`docs/styling.md`](../../../../../docs/styling.md).

## Resultado esperado

- header + footer renderizando em qualquer rota;
- rota ativa marcada visualmente via `data-active`;
- nenhum `"use client"` adicionado;
- typecheck e build passam.

## Criterios de aceite

- [ ] header renderiza `siteConfig.mainNav` completo;
- [ ] footer renderiza `siteConfig.socialLinks` e copyright;
- [ ] sem `"use client"`;
- [ ] CSS Modules aplicados;
- [ ] uso de `<nav>`, `<header>`, `<footer>` semantico.

## Validacao minima

- inspecao visual de qualquer rota;
- `npm run build` passa.

## Dependencias

- TASK-001 (layout raiz);
- PLAN-002 TASK-005 (`site.ts`).

## Referencias

- [`docs/product.md`](../../../../../docs/product.md) secao "Navegacao principal";
- [`docs/styling.md`](../../../../../docs/styling.md) secao "Layout".

## Perguntas em aberto

- menu mobile entra na v1?
- rota ativa via Next `usePathname` (Client) ou via Server Component lendo `headers()`?
