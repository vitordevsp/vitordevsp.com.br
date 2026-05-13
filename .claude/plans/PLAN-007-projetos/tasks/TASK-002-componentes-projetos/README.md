---
title: TASK-002 - Criar componentes de Projetos
status: draft
priority: P0
type: implementacao
metadata:
  owner: projects
  created_at: 2026-05-13 00:20
  updated_at: 2026-05-13 00:20
  tags:
    - tasks
    - projects
    - ui
---

# TASK-002 - Criar componentes de Projetos

## Objetivo

Implementar `project-card`, `project-list` e `project-status-badge` em `src/features/projects/ui/`, Server Components com CSS Modules.

## Escopo

- `src/features/projects/ui/project-card/`:
  - aceita `project: Project`;
  - mostra nome, descricao, status badge, tags e versao quando houver;
  - linka para `/projetos/[slug]`;
- `src/features/projects/ui/project-list/`:
  - grid/lista de cards;
  - estado vazio simples;
- `src/features/projects/ui/project-status-badge/`:
  - mapeia `ProjectStatus` para rotulo + cor via `data-status`.

## Nao inclui

- componentes especificos de timeline ou versionamento;
- promocao para `shared/ui/`.

## Entradas e contratos

- tipos `Project`, `ProjectStatus` (PLAN-004 TASK-006);
- componentes base (PLAN-003 TASK-004).

## Resultado esperado

- tres componentes prontos para consumo na pagina de listagem.

## Criterios de aceite

- [ ] tres pastas criadas com `.tsx` + `.module.css`;
- [ ] sem `"use client"`;
- [ ] sem dependencia em Notion bruto;
- [ ] rotulos em pt-BR.

## Validacao minima

- playground/listagem.

## Dependencias

- PLAN-003 TASK-004;
- PLAN-004 TASK-006.

## Referencias

- [`docs/content-model.md`](../../../../../docs/content-model.md)
- [`docs/styling.md`](../../../../../docs/styling.md)

## Perguntas em aberto

- exibir versao no card?
- exibir categoria (`personal`, `professional` etc.) no card?
