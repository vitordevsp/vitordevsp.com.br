---
title: TASK-007 - Criar renderer minimo de blocos Notion
status: draft
priority: P0
type: implementacao
metadata:
  owner: notion-integration
  created_at: 2026-05-13 00:05
  updated_at: 2026-05-13 00:05
  tags:
    - tasks
    - notion
    - renderer
    - garden
---

# TASK-007 - Criar renderer minimo de blocos Notion

## Objetivo

Implementar `src/features/garden/ui/notion-renderer/` capaz de transformar blocos Notion em HTML/JSX para `/jardim/[slug]` e (futuramente) `/projetos/[slug]`.

## Contexto local

[`docs/notion.md`](../../../../../docs/notion.md) define suporte inicial: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, quote, callout, code, image, divider, bookmark, embed. Renderer fica no dominio `garden` por ser primeiro consumidor; pode ser promovido para `shared` quando aparecer segundo consumidor (Projetos) com necessidade real.

## Escopo

- criar pasta `src/features/garden/ui/notion-renderer/`:
  - `notion-renderer.tsx`
  - `notion-renderer.module.css`
  - opcional: subcomponentes por bloco (`paragraph-block.tsx`, `code-block.tsx` etc.) se ajudar legibilidade;
- suportar (v1 minimo): paragraph, heading_1-3, bulleted_list_item, numbered_list_item, quote, code, image, divider;
- fallback seguro para blocos nao suportados (skip ou comentario HTML);
- preservar links em rich text;
- sem syntax highlight em `code` na v1 (PLAN-013 cuida).

## Nao inclui

- callout (postergar para PLAN-013);
- bookmark, embed (postergar);
- toggle, columns, equation;
- syntax highlight;
- imagens com lightbox;
- a11y avancada de listas aninhadas profundas (cobrir nivel basico).

## Entradas e contratos

- blocos pre-buscados via `retrieveBlockChildren` (TASK-003) e `blocks.ts`;
- estilos via CSS Modules ([`docs/styling.md`](../../../../../docs/styling.md));
- Server Component (sem `"use client"`).

## Resultado esperado

- `<NotionRenderer blocks={blocks} />` renderiza corpo de uma pagina Notion;
- estilos coerentes com leitura.

## Criterios de aceite

- [ ] suporta blocos listados;
- [ ] fallback seguro para nao suportados;
- [ ] preserva links em rich text;
- [ ] sem `"use client"`;
- [ ] CSS Modules co-localizado;
- [ ] `npx tsc --noEmit` passa;
- [ ] `npm run build` passa.

## Validacao minima

- consumir em `/jardim/[slug]` mock (sera real em PLAN-006 TASK-004);
- inspecao visual.

## Dependencias

- TASK-003 (queries);
- PLAN-002 TASK-004 (estilos globais).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Blocos de pagina";
- [`docs/styling.md`](../../../../../docs/styling.md) secao "Estilos de conteudo Notion".

## Perguntas em aberto

- subcomponente por tipo de bloco ou switch unico? Sugestao: subcomponente quando bloco for nao-trivial (image, code), switch para os textuais.
- imagens via `<img>` simples ou via `next/image` na v1?
