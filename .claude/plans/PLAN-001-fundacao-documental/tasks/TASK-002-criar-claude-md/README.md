---
title: TASK-002 - Criar CLAUDE.md raiz
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

# TASK-002 - Criar CLAUDE.md raiz

## Objetivo

Definir o arquivo `CLAUDE.md` na raiz, instruindo agentes sobre postura, escopo, stack, restricoes e workflow.

## Contexto local

`CLAUDE.md` e o ponto de entrada operacional do agente. Deve referenciar `docs/` e `.claude/` sem duplicar conteudo, e firmar restricoes do MVP. Ver [`CLAUDE.md`](../../../../../CLAUDE.md) atual.

## Escopo

- definir postura esperada do agente;
- registrar regra principal (docs antes de codigo);
- listar stack, restricoes e regras de implementacao;
- documentar workflow por tarefa e comandos confirmados;
- referenciar camada `.claude/` e mapa documental.

## Nao inclui

- detalhar arquitetura de codigo (vai para [`docs/architecture.md`](../../../../../docs/architecture.md));
- definir modelos de conteudo (vai para [`docs/content-model.md`](../../../../../docs/content-model.md));
- skills operacionais (vai para `.claude/skills/`).

## Entradas e contratos

- decisoes ja em ADRs 001-005;
- restricoes do MVP em [`docs/README.md`](../../../../../docs/README.md).

## Resultado esperado

- `CLAUDE.md` reescrito e alinhado ao layout flat de `docs/` e a camada `.claude/`.

## Criterios de aceite

- [x] postura do agente definida;
- [x] regra "docs antes de codigo" registrada;
- [x] restricoes do MVP listadas;
- [x] comandos confirmados listados;
- [x] sem decisoes inventadas alem das ja registradas em ADR.

## Validacao minima

- leitura humana de [`CLAUDE.md`](../../../../../CLAUDE.md) e cross-check com [`docs/README.md`](../../../../../docs/README.md).

## Dependencias

- TASK-001 (estrutura `docs/`).

## Referencias

- [`CLAUDE.md`](../../../../../CLAUDE.md)
- [`docs/README.md`](../../../../../docs/README.md)
- ADRs 001-005

## Perguntas em aberto

- nenhuma.
