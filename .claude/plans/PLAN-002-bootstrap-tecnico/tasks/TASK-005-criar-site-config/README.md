---
title: TASK-005 - Criar configuracao estatica do site
status: draft
priority: P0
type: implementacao
metadata:
  owner: app-foundation
  created_at: 2026-05-12 22:40
  updated_at: 2026-05-12 22:40
  tags:
    - tasks
    - config
    - content
---

# TASK-005 - Criar configuracao estatica do site

## Objetivo

Criar `src/content/site.ts` exportando dados estaticos do site: identidade, descricao padrao, links sociais e navegacao principal.

## Contexto local

Este arquivo e fonte unica de dados nao-editoriais sobre o site (separados do conteudo do Notion). Consumido por layout raiz, metadata global e header/footer (PLAN-003 em diante).

## Escopo

- criar `src/content/site.ts` com:
  - `siteName`;
  - `authorName`;
  - `defaultDescription`;
  - `siteUrl` (placeholder ate dominio definitivo);
  - `socialLinks` (Github, X/Twitter, LinkedIn, etc. - placeholders aceitos);
  - `mainNav` (Home, Jardim, Projetos, Galeria, Cursos, Sobre);
  - `defaultLocale` (`pt-BR`).
- tipos explicitos para cada estrutura.

## Nao inclui

- conteudo editorial (vem do Notion);
- metadata dinamica por pagina (PLAN-009);
- imagem social (Open Graph) - cobrir em PLAN-009.

## Entradas e contratos

- [`docs/product.md`](../../../../../docs/product.md) (sitemap e navegacao);
- [`docs/architecture.md`](../../../../../docs/architecture.md) (papel de `src/content/`).

## Resultado esperado

```ts
// src/content/site.ts
export const siteConfig = {
  siteName: '...',
  authorName: '...',
  defaultDescription: '...',
  siteUrl: '...',
  defaultLocale: 'pt-BR',
  socialLinks: [...],
  mainNav: [...]
} as const
```

## Criterios de aceite

- [ ] arquivo `src/content/site.ts` criado;
- [ ] export `siteConfig` consumivel via `import { siteConfig } from '@/content/site'`;
- [ ] tipos explicitos (sem `any`);
- [ ] `mainNav` cobre as seis areas principais;
- [ ] typecheck passa.

## Validacao minima

- `npx tsc --noEmit` passa;
- import experimental em `layout.tsx` funciona (pode ser desfeito apos validacao).

## Dependencias

- TASK-002 (pasta `src/content/`);
- TASK-003 (alias validado).

## Referencias

- [`docs/product.md`](../../../../../docs/product.md)
- [`docs/architecture.md`](../../../../../docs/architecture.md)

## Perguntas em aberto

- usar handles sociais reais ou placeholders ate v1?
- `siteUrl` definitivo ja existe ou usar placeholder ate decisao de dominio?
