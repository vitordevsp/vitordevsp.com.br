---
title: TASK-004 - Criar pagina Viagens
status: draft
priority: P2
type: implementacao
metadata:
  owner: gallery
  created_at: 2026-05-13 00:25
  updated_at: 2026-05-13 00:25
  tags:
    - tasks
    - gallery
    - travel
---

# TASK-004 - Criar pagina Viagens

## Objetivo

Implementar `src/app/galeria/viagens/page.tsx` apresentando lugares visitados. Schema atual do Notion e minimo; recomenda-se estatico na v1.

## Contexto local

Base `Viagens & Lugares` em [`docs/notion.md`](../../../../../docs/notion.md) tem so `Nome` conhecido. Pagina deve ser estatica ou ter texto explicativo + curadoria manual.

## Escopo

- pagina Server Component;
- texto curto explicando a area;
- listagem inicial estatica (1-3 lugares como curadoria);
- estado "em construcao" claro;
- metadata basica.

## Nao inclui

- mapa interativo;
- pagina de detalhe;
- galeria de fotos.

## Entradas e contratos

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Viagens";
- modelo `Place` em [`docs/content-model.md`](../../../../../docs/content-model.md).

## Resultado esperado

- `/galeria/viagens` renderiza pagina basica.

## Criterios de aceite

- [ ] Server Component;
- [ ] estado vazio/em construcao explicito;
- [ ] metadata basica;
- [ ] build passa.

## Validacao minima

- abrir `/galeria/viagens` no dev.

## Dependencias

- PLAN-005 TASK-003;
- PLAN-003.

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Viagens & Lugares".

## Perguntas em aberto

- enriquecer base no Notion antes da v1 ou aceitar curadoria estatica?
