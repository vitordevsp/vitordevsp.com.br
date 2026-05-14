---
title: PLAN-001 - Fundacao documental e governanca do projeto
status: concluida
tags:
  - plans
  - docs
  - governance
metadata:
  owner: docs-foundation
  created_at: 2026-05-12 22:35
  updated_at: 2026-05-14 16:17
---

# PLAN-001 - Fundacao documental e governanca do projeto

## Objetivo

Criar a camada documental inicial em `docs/` e o `CLAUDE.md` na raiz, orientando humanos e agentes antes de qualquer implementacao de codigo.

## Contexto

Reconstrucao do `site-vitorsampaio` do zero. Decisoes estruturais (CMS, stack, modelos editoriais, fronteiras de arquitetura) precisam estar documentadas antes da implementacao, conforme [`docs/README.md`](../../../docs/README.md) e [ADR-001](../../../docs/decisions/ADR-001-rebuild-from-zero.md). Sem essa camada, agentes tomam decisoes arquiteturais por conta propria.

Estrutura final entregue divergiu da proposta inicial (layout flat em `docs/` em vez de subpastas `product/`, `architecture/`, `agent/`, `reference/`). Insumos originais (`docs/plans/PLAN-001.md` + roadmap.md) foram absorvidos e removidos.

## Escopo

- estrutura flat de `docs/` consolidada;
- `CLAUDE.md` na raiz com regras de operacao para agentes;
- documentos funcionais: `product.md`, `content-model.md`, `architecture.md`, `notion.md`, `styling.md`, `agents.md`;
- ADRs iniciais (`ADR-001` a `ADR-005`);
- referencia de databases Notion documentada em `docs/notion.md`;
- indice consolidado em [`docs/README.md`](../../../docs/README.md).

## Fora do escopo

- qualquer codigo de aplicacao;
- instalacao de dependencias;
- scaffolding de `src/`;
- skills ou planos operacionais em `.claude/` (camada feita em paralelo, fora desta frente).

## Areas afetadas

- [`docs/`](../../../docs/)
- [`CLAUDE.md`](../../../CLAUDE.md)
- [`docs/decisions/`](../../../docs/decisions/)

## Tasks

- [`TASK-001 - Estruturar pasta docs`](./tasks/TASK-001-estruturar-docs/README.md)
- [`TASK-002 - Criar CLAUDE.md`](./tasks/TASK-002-criar-claude-md/README.md)
- [`TASK-003 - Documentar produto`](./tasks/TASK-003-documentar-produto/README.md)
- [`TASK-004 - Documentar arquitetura`](./tasks/TASK-004-documentar-arquitetura/README.md)
- [`TASK-005 - Documentar agentes`](./tasks/TASK-005-documentar-agentes/README.md)
- [`TASK-006 - Criar ADRs iniciais`](./tasks/TASK-006-criar-adrs/README.md)
- [`TASK-007 - Documentar databases Notion`](./tasks/TASK-007-documentar-notion-databases/README.md)

## Riscos e dependencias

- nenhuma dependencia ascendente (plano-zero da v1);
- risco residual: divergencia entre proposta inicial (subpastas) e entrega final (flat). Mitigado por [`CLAUDE.md`](../../../CLAUDE.md) e por [`docs/README.md`](../../../docs/README.md), que descrevem o layout flat.

## Validacao

- estrutura de `docs/` existe e segue layout flat documentado;
- `CLAUDE.md` aprovado pela leitura humana;
- ADRs 001 a 005 presentes em `docs/decisions/`;
- demais documentos preenchidos com decisoes consolidadas.

## Criterio de encerramento

- entrega ja realizada em commits anteriores (ver `git log` em `docs/`);
- plano nasce em `concluida` apenas para registro historico e rastreabilidade.

## Referencias

- [`docs/README.md`](../../../docs/README.md)
- [`CLAUDE.md`](../../../CLAUDE.md)
- ADRs em [`docs/decisions/`](../../../docs/decisions/)

## Perguntas em aberto

- nenhuma.
