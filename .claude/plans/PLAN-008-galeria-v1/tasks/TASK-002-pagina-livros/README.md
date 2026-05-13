---
title: TASK-002 - Criar pagina Livros
status: draft
priority: P1
type: implementacao
metadata:
  owner: gallery
  created_at: 2026-05-13 00:25
  updated_at: 2026-05-13 00:25
  tags:
    - tasks
    - gallery
    - books
---

# TASK-002 - Criar pagina Livros

## Objetivo

Implementar `src/app/galeria/livros/page.tsx` apresentando livros/referencias. Dados podem ser estaticos ou via Notion.

## Contexto local

Base Notion `Livros` possui campos `Name`, `Autor`, `State`, `Tags`, `Descricao`, `Indice`, `Inicio`, `Finalizacao`. Mapeamento `State` -> `BookStatus` ja documentado em [`docs/notion.md`](../../../../../docs/notion.md).

## Escopo

- pagina Server Component;
- listar livros com `Name`, `Autor`, `State`, `Tags`;
- ordenar por `Indice` quando disponivel;
- estado vazio claro;
- metadata basica.

## Nao inclui

- pagina de detalhe;
- estantes/categorias visuais;
- rating numerico exibido (postergar).

## Entradas e contratos

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Livros";
- modelo `Book` em [`docs/content-model.md`](../../../../../docs/content-model.md).

## Resultado esperado

- `/galeria/livros` renderiza listagem inicial.

## Criterios de aceite

- [ ] Server Component;
- [ ] estado vazio se necessario;
- [ ] metadata basica;
- [ ] build passa.

## Validacao minima

- abrir `/galeria/livros` no dev.

## Dependencias

- PLAN-005 TASK-003;
- PLAN-003.

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Livros".

## Perguntas em aberto

- estatico ou via Notion?
