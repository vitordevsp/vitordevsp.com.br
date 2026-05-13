---
title: TASK-003 - Documentar produto e modelo de conteudo
status: concluida
priority: P0
type: documentacao
metadata:
  owner: docs-foundation
  created_at: 2026-05-12 22:35
  updated_at: 2026-05-13 00:50
  tags:
    - tasks
    - docs
    - product
---

# TASK-003 - Documentar produto e modelo de conteudo

## Objetivo

Consolidar visao, posicionamento, principios, sitemap e modelos internos de conteudo.

## Contexto local

Documentos sao base normativa para toda decisao posterior de UX, conteudo e modelagem. Sao consumidos por outros planos (especialmente PLAN-004 a PLAN-008).

Nota historica: foi entregue inicialmente um `docs/roadmap.md` com fases de evolucao. O conteudo foi absorvido em `docs/product.md` (norte, principios) e em [`.claude/plans/`](../../../) (fases v1 viraram PLAN-001..PLAN-010 e fases pos-v1 viraram [`PLAN-000-desktop/post-v1-candidates.md`](../../../PLAN-000-desktop/post-v1-candidates.md)). `docs/roadmap.md` foi removido.

## Escopo

- `docs/product.md` (visao, posicionamento, principios, sitemap, areas);
- `docs/content-model.md` (modelos `TextPost`, `Project`, `Video`, `Book`, `CultureItem`, `Place`, `Course`, plus `PublicationStatus` e `MaturityStage`).

## Nao inclui

- arquitetura tecnica (TASK-004);
- integracao Notion (TASK-007);
- ADRs (TASK-006).

## Entradas e contratos

- prioridades editoriais do autor;
- restricoes do MVP em [`docs/README.md`](../../../../../docs/README.md).

## Resultado esperado

- dois documentos publicados em `docs/` e linkados pelo `docs/README.md`.

## Criterios de aceite

- [x] sitemap completo documentado em [`docs/product.md`](../../../../../docs/product.md);
- [x] modelos canonicos definidos em [`docs/content-model.md`](../../../../../docs/content-model.md);
- [x] modelos diferenciam `PublicationStatus` de `MaturityStage`.

## Validacao minima

- leitura cruzada entre [`docs/product.md`](../../../../../docs/product.md) e [`docs/content-model.md`](../../../../../docs/content-model.md) sem contradicao.

## Dependencias

- TASK-001 (estrutura `docs/`).

## Referencias

- [`docs/product.md`](../../../../../docs/product.md)
- [`docs/content-model.md`](../../../../../docs/content-model.md)
- [`.claude/plans/PLAN-000-desktop/post-v1-candidates.md`](../../../PLAN-000-desktop/post-v1-candidates.md)

## Perguntas em aberto

- nenhuma.
