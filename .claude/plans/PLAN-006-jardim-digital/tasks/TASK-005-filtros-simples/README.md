---
title: TASK-005 - Filtros simples por query string
status: draft
priority: P2
type: implementacao
metadata:
  owner: garden
  created_at: 2026-05-13 00:15
  updated_at: 2026-05-13 00:15
  tags:
    - tasks
    - garden
    - filters
    - optional
---

# TASK-005 - Filtros simples por query string

## Objetivo

Adicionar filtros server-side em `/jardim` via query string (`?kind=`, `?tag=`, `?stage=`), sem virar Client Component a pagina inteira.

## Contexto local

Filtros sao opcionais na v1. Podem ser adiados se exigirem mais de meio dia adicional. Caso entrem, devem usar `searchParams` da pagina e filtrar resultado de `get-text-posts` (server-side), com links em `<a>` que reescrevem a query.

## Escopo

- aceitar `searchParams` na pagina de listagem;
- aceitar parametros `kind`, `tag`, `stage`;
- filtrar resultado server-side;
- mostrar chips/badges com filtros ativos e link para limpar;
- sem `"use client"` na pagina.

## Nao inclui

- filtros combinados complexos;
- ordenacao dinamica;
- paginacao;
- filtros como Client Component;
- multipla selecao por categoria.

## Entradas e contratos

- `get-text-posts({ kind?, tag?, stage? })` (TASK-001 ja recebe filtros);
- componentes `Tag`, `StatusBadge` (PLAN-003).

## Resultado esperado

- `/jardim?kind=essay` lista apenas ensaios;
- chips visiveis quando filtros ativos.

## Criterios de aceite

- [ ] Server Component preserva;
- [ ] filtros refletem em URL;
- [ ] chips com link "limpar filtros";
- [ ] sem `"use client"`;
- [ ] build passa.

## Validacao minima

- testar com URLs reais;
- `npm run build` passa.

## Dependencias

- TASK-001 (API com filtros);
- TASK-003 (pagina de listagem).

## Referencias

- [`docs/product.md`](../../../../../docs/product.md) secao "Navegacao secundaria".

## Perguntas em aberto

- adiar para pos-v1 PLAN-012 se exigir mais de meio dia adicional?
- exibir contagem de itens por filtro?
