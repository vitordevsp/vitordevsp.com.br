---
title: TASK-002 - Criar estrutura base de src
status: draft
priority: P0
type: estrutura
metadata:
  owner: app-foundation
  created_at: 2026-05-12 22:40
  updated_at: 2026-05-12 22:40
  tags:
    - tasks
    - structure
---

# TASK-002 - Criar estrutura base de src

## Objetivo

Garantir que `src/` contenha as pastas `app/`, `features/`, `integrations/`, `shared/`, `content/`, conforme [`docs/architecture.md`](../../../../../docs/architecture.md).

## Contexto local

Hoje so existe `src/app/`. Demais diretorios precisam nascer vazios ou com placeholder minimo. Nao criar subpastas dentro de `features/` sem demanda real (regra explicita de [`docs/architecture.md`](../../../../../docs/architecture.md)).

## Escopo

- criar `src/features/`, `src/integrations/`, `src/shared/`, `src/content/`;
- adicionar arquivo placeholder `.gitkeep` ou `README.md` curto em cada pasta vazia (definir padrao);
- nao criar subpastas de feature (`garden`, `projects` etc.) - cobertas por planos especificos;
- preservar route group existente `src/app/(home)` ate decisao explicita (ver perguntas em aberto do plano).

## Nao inclui

- componentes;
- integracoes;
- arquivos `site.ts` (TASK-005);
- estilos globais (TASK-004).

## Entradas e contratos

- [`docs/architecture.md`](../../../../../docs/architecture.md) secao "Estrutura de pastas".

## Resultado esperado

```text
src/
  app/
  features/
  integrations/
  shared/
  content/
```

Pastas vazias com `.gitkeep` ou `README.md` curto (decidir padrao na execucao).

## Criterios de aceite

- [ ] quatro pastas novas criadas (`features`, `integrations`, `shared`, `content`);
- [ ] padrao de placeholder consistente;
- [ ] nenhuma feature de dominio criada;
- [ ] `npx tsc --noEmit` continua passando.

## Validacao minima

- `ls src/` mostra cinco pastas;
- typecheck nao quebra.

## Dependencias

- TASK-001 (bootstrap validado).

## Referencias

- [`docs/architecture.md`](../../../../../docs/architecture.md)

## Perguntas em aberto

- usar `.gitkeep` ou `README.md` curto como placeholder? `README.md` curto costuma documentar melhor a fronteira da pasta.
