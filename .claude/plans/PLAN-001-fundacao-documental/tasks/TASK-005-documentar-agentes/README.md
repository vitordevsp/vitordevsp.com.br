---
title: TASK-005 - Documentar guia de agentes
status: concluida
priority: P0
type: documentacao
metadata:
  owner: docs-foundation
  created_at: 2026-05-12 22:35
  updated_at: 2026-05-14 16:17
  tags:
    - tasks
    - docs
    - agents
---

# TASK-005 - Documentar guia de agentes

## Objetivo

Criar [`docs/agents.md`](../../../../../docs/agents.md) com instrucoes, workflow e definicao de pronto para agentes de IA.

## Contexto local

Complementa o `CLAUDE.md` com guia mais detalhado, especifico para humanos e agentes consultarem em colaboracao. Foco em workflow, restricoes de escopo e DoD por dominio (docs, frontend, Notion, estilos).

## Escopo

- instrucoes para agentes operarem dentro de `docs/` e `src/`;
- workflow por tarefa;
- definicao de pronto por dominio;
- restricoes recorrentes (server-first, sem dependencias grandes, sem `"use client"` desnecessario).

## Nao inclui

- detalhe de skills operacionais (vai para `.claude/skills/`);
- planos especificos (cobertos pelos demais PLANs).

## Entradas e contratos

- `CLAUDE.md`;
- restricoes do MVP em [`docs/README.md`](../../../../../docs/README.md).

## Resultado esperado

- [`docs/agents.md`](../../../../../docs/agents.md) publicado e referenciado pelo `docs/README.md`.

## Criterios de aceite

- [x] workflow do agente documentado;
- [x] DoD por dominio claro;
- [x] restricoes de escopo explicitas;
- [x] alinhamento com `CLAUDE.md` sem duplicacao excessiva.

## Validacao minima

- leitura cruzada entre [`docs/agents.md`](../../../../../docs/agents.md) e [`CLAUDE.md`](../../../../../CLAUDE.md).

## Dependencias

- TASK-001 (estrutura `docs/`);
- TASK-002 (`CLAUDE.md`).

## Referencias

- [`docs/agents.md`](../../../../../docs/agents.md)
- [`CLAUDE.md`](../../../../../CLAUDE.md)

## Perguntas em aberto

- nenhuma.
