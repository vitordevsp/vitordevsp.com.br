---
title: TASK-004 - Revisar estados vazios
status: draft
priority: P0
type: revisao
metadata:
  owner: editorial-polish
  created_at: 2026-05-13 00:30
  updated_at: 2026-05-13 00:30
  tags:
    - tasks
    - polish
    - empty-state
---

# TASK-004 - Revisar estados vazios

## Objetivo

Revisar todas as rotas publicas para que estados vazios sejam claros, uteis e nao pareçam quebrados.

## Contexto local

Estados vazios afetam `/jardim`, `/projetos`, `/galeria/*`, `/cursos`. Mensagem deve:

- explicar por que esta vazio;
- indicar quando ou como aparecera conteudo;
- linkar para outra area relevante.

## Escopo

- revisar copy + visual de cada estado vazio;
- garantir uso dos componentes compartilhados (`Section`, `Card`, `PageHeading`);
- nao usar imagens elaboradas - texto claro basta na v1;
- prever caso de erro real (Notion fora) vs vazio editorial.

## Nao inclui

- design rico de empty state;
- ilustracoes customizadas;
- A/B testing.

## Entradas e contratos

- paginas existentes (PLAN-005, PLAN-006, PLAN-007, PLAN-008).

## Resultado esperado

- estados vazios revisados em todas as rotas listadas.

## Criterios de aceite

- [ ] cada rota com listagem tem estado vazio explicito;
- [ ] copys revisadas em pt-BR;
- [ ] sem "Loading..." stub;
- [ ] sem fallback `console.error`.

## Validacao minima

- simular dados vazios por env temporaria ou query forcada;
- inspecao visual.

## Dependencias

- PLAN-005, PLAN-006, PLAN-007, PLAN-008.

## Referencias

- [`docs/product.md`](../../../../../docs/product.md)

## Perguntas em aberto

- diferenciar visualmente "vazio por escolha editorial" vs "erro temporario"?
