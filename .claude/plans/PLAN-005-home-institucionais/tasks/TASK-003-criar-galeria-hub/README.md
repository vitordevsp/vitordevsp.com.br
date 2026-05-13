---
title: TASK-003 - Criar hub Galeria
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
    - gallery
---

# TASK-003 - Criar hub Galeria

## Objetivo

Implementar `src/app/galeria/page.tsx` como Server Component que explica a funcao da Galeria e linka subareas (Videos, Livros, Cultura, Viagens).

## Contexto local

[`docs/product.md`](../../../../../docs/product.md) define Galeria como hub de conteudos nao textuais. Detalhe das subrotas vem em PLAN-008. Este hub pode ser estatico na v1.

## Escopo

- criar `src/app/galeria/page.tsx`;
- breve descricao do que e a Galeria;
- cards/links para `/galeria/videos`, `/galeria/livros`, `/galeria/cultura`, `/galeria/viagens`;
- estado vazio aceitavel se subrotas ainda nao existirem;
- metadata basica.

## Nao inclui

- listagens dinamicas;
- conteudo vindo do Notion (cobre PLAN-016 pos-v1);
- thumbnails reais (placeholder/icone aceito).

## Entradas e contratos

- [`docs/product.md`](../../../../../docs/product.md);
- componentes (`Container`, `Section`, `Card`).

## Resultado esperado

- `/galeria` renderiza hub e linka as quatro subrotas.

## Criterios de aceite

- [ ] Server Component;
- [ ] quatro subareas linkadas;
- [ ] metadata basica;
- [ ] build passa.

## Validacao minima

- abrir `/galeria`;
- conferir que links resolvem (404 aceitavel se subrota ainda nao criada por PLAN-008).

## Dependencias

- PLAN-003 (componentes).

## Referencias

- [`docs/product.md`](../../../../../docs/product.md)

## Perguntas em aberto

- usar icones para cada subarea ou apenas texto?
