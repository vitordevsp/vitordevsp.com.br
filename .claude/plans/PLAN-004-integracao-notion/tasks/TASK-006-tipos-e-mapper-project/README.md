---
title: TASK-006 - Criar tipos e mapper de Project
status: draft
priority: P0
type: implementacao
metadata:
  owner: notion-integration
  created_at: 2026-05-13 00:05
  updated_at: 2026-05-13 00:05
  tags:
    - tasks
    - notion
    - mapper
    - projects
---

# TASK-006 - Criar tipos e mapper de Project

## Objetivo

Definir tipos `Project`, `ProjectStatus`, `ProjectCategory` em `src/features/projects/model/project.ts` e implementar `src/integrations/notion/mappers/project.mapper.ts`.

## Contexto local

Database `Projetos` documentada em [`docs/notion.md`](../../../../../docs/notion.md). Propriedades atuais: `Nome` (title), `Status` (status), `Descricao` (text), `Tags` (multi_select), `Versão` (text), `Publicado Em` (date). Slug, repositorio, stack, papel, links pendentes - tratar como opcionais por enquanto.

## Escopo

- criar `src/features/projects/model/project.ts` com:
  - `type ProjectStatus = 'active' | 'paused' | 'completed' | 'archived' | 'concept'`;
  - `type ProjectCategory = 'professional' | 'personal' | 'open-source' | 'experiment' | 'product' | 'study'`;
  - `type Project = { ... }` conforme [`docs/content-model.md`](../../../../../docs/content-model.md);
- criar `src/integrations/notion/mappers/project.mapper.ts`:
  - `toProject(page)` -> `Project | null`;
  - mapear `Status` -> `ProjectStatus` (`Nao iniciada` -> `concept`, `Em andamento` -> `active`, `Concluido` -> `completed`);
  - mapear `Versão` -> `version`;
  - `slug` obrigatorio (se ausente, `null`);
  - demais campos opcionais com fallback documentado.

## Nao inclui

- queries de feature (`get-projects` fica em PLAN-007);
- renderizacao de blocos da pagina de projeto (cobre TASK-007 para Jardim; reaproveitavel pelo plano de Projetos);
- ADR para introducao de novos campos no Notion.

## Entradas e contratos

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Projetos";
- [`docs/content-model.md`](../../../../../docs/content-model.md) secao "Project".

## Resultado esperado

- tipos + mapper exportados e tipados;
- consumivel por PLAN-007.

## Criterios de aceite

- [ ] tipos batem com [`docs/content-model.md`](../../../../../docs/content-model.md);
- [ ] mapper retorna `null` quando item nao publico ou sem slug;
- [ ] `Versão` mapeada para `version`;
- [ ] sem vazamento de tipos brutos;
- [ ] `npx tsc --noEmit` passa.

## Validacao minima

- testar com pagina real em ambiente com env definida;
- verificar listagem em `/projetos` (PLAN-007).

## Dependencias

- TASK-001, TASK-002, TASK-003 (cliente, databases, queries);
- PLAN-002 TASK-002 (`src/features/`).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)
- [`docs/content-model.md`](../../../../../docs/content-model.md)

## Perguntas em aberto

- enquanto repositorio/stack/papel nao estao na base, deixar opcionais ou criar tarefa Notion-side para padronizar?
- politica de publicacao publica em Projetos: criterio derivado ou campo dedicado?
