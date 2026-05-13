---
title: TASK-002 - Criar pagina Sobre
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
    - about
---

# TASK-002 - Criar pagina Sobre

## Objetivo

Implementar `src/app/sobre/page.tsx` como Server Component apresentando trajetoria, atuacao, interesses e canais de contato do autor.

## Contexto local

[`docs/product.md`](../../../../../docs/product.md) define Sobre como area de alta prioridade. Texto pode vir de `src/content/` (estatico) na v1 - decidir no plano.

## Escopo

- criar `src/app/sobre/page.tsx`;
- conteudo: apresentacao, trajetoria, areas de atuacao, interesses, links;
- usar `siteConfig.socialLinks` para canais de contato;
- considerar criar `src/content/about.ts` com texto estruturado;
- metadata basica (`title`, `description`).

## Nao inclui

- timeline rica;
- formulario de contato;
- conteudo vindo do Notion (postergar para evolucao);
- foto ou imagem hero customizada (decidir).

## Entradas e contratos

- [`docs/product.md`](../../../../../docs/product.md) (posicionamento, principios);
- `siteConfig`.

## Resultado esperado

- rota `/sobre` apresenta autor com clareza.

## Criterios de aceite

- [ ] Server Component;
- [ ] usa `siteConfig` quando aplicavel;
- [ ] metadata basica presente;
- [ ] build passa.

## Validacao minima

- abrir `/sobre` no `npm run dev`.

## Dependencias

- PLAN-003 (layout, componentes);
- PLAN-002 TASK-005 (`site.ts`).

## Referencias

- [`docs/product.md`](../../../../../docs/product.md)

## Perguntas em aberto

- texto do Sobre fica em `src/content/about.ts` ou inline no `page.tsx`?
- foto/avatar entra na v1?
