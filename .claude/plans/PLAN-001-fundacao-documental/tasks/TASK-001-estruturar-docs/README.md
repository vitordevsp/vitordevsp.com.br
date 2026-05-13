---
title: TASK-001 - Estruturar pasta docs
status: concluida
priority: P0
type: estrutura
metadata:
  owner: docs-foundation
  created_at: 2026-05-12 22:35
  updated_at: 2026-05-12 22:35
  tags:
    - tasks
    - docs
---

# TASK-001 - Estruturar pasta docs

## Objetivo

Criar a estrutura inicial de `docs/` que sustenta toda a documentacao da v1.

## Contexto local

Layout final adotado e flat (sem subpastas `product/`, `architecture/`, `agent/`, `reference/` propostas no insumo). Ver [`CLAUDE.md`](../../../../../CLAUDE.md) secao "Estrutura documental" e [`docs/README.md`](../../../../../docs/README.md).

## Escopo

- criar pastas `docs/` e `docs/decisions/`;
- garantir que `docs/` seja ponto unico da camada humana de decisao;
- preservar arquivos existentes ao reorganizar.

## Nao inclui

- preencher conteudo dos documentos (coberto pelas tasks 002-007);
- criar subpastas alem de `decisions/` sem decisao explicita;
- migrar `plans/` legados.

## Entradas e contratos

- decisao registrada em [`CLAUDE.md`](../../../../../CLAUDE.md) sobre layout flat.

## Resultado esperado

- arvore `docs/` existe com `README.md` indice e pasta `decisions/`;
- nenhum arquivo de aplicacao criado.

## Criterios de aceite

- [x] `docs/README.md` presente como indice;
- [x] `docs/decisions/` criada;
- [x] nenhum arquivo de aplicacao em `src/` adicionado por esta task;
- [x] layout flat respeitado.

## Validacao minima

- inspecao manual da arvore de `docs/`.

## Dependencias

- nenhuma.

## Referencias

- [`docs/README.md`](../../../../../docs/README.md)
- [`CLAUDE.md`](../../../../../CLAUDE.md)

## Perguntas em aberto

- nenhuma.
