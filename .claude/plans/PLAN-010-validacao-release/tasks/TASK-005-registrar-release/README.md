---
title: TASK-005 - Registrar release v1
status: draft
priority: P0
type: documentacao
metadata:
  owner: release
  created_at: 2026-05-13 00:35
  updated_at: 2026-05-13 00:35
  tags:
    - tasks
    - release
    - changelog
---

# TASK-005 - Registrar release v1

## Objetivo

Documentar o escopo entregue na v1 e listar pendencias / proximos planos pos-v1.

## Escopo

- criar `CHANGELOG.md` na raiz (ou release notes em `docs/`);
- estrutura:
  - versao (recomendacao: `0.1.0`);
  - data;
  - escopo entregue (resumo dos 10 planos);
  - pendencias conhecidas;
  - proximos planos sugeridos puxados de [`PLAN-000-desktop/post-v1-candidates.md`](../../../PLAN-000-desktop/post-v1-candidates.md);
- encaminhar fechamento de commit/tag para [`ast-release-manager`](../../../../skills/ast-release-manager/SKILL.md).

## Nao inclui

- publicacao em GitHub Releases sem decisao do usuario;
- tag automatica;
- divulgacao publica.

## Criterios de aceite

- [ ] `CHANGELOG.md` (ou equivalente) criado;
- [ ] escopo entregue documentado;
- [ ] pendencias listadas;
- [ ] proximos planos sugeridos;
- [ ] handoff para `ast-release-manager` registrado.

## Validacao minima

- leitura do documento por humano.

## Dependencias

- TASK-001 a TASK-004 desta frente.

## Referencias

- [`.claude/skills/ast-release-manager/SKILL.md`](../../../../skills/ast-release-manager/SKILL.md)
- [`PLAN-000-desktop/post-v1-candidates.md`](../../../PLAN-000-desktop/post-v1-candidates.md)

## Perguntas em aberto

- versao da v1: `0.1.0` ou `1.0.0`?
- local do changelog: raiz (`CHANGELOG.md`) ou `docs/`?
