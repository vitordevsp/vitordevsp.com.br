---
title: TASK-006 - Criar ADRs iniciais
status: concluida
priority: P0
type: documentacao
metadata:
  owner: docs-foundation
  created_at: 2026-05-12 22:35
  updated_at: 2026-05-12 22:35
  tags:
    - tasks
    - docs
    - adr
---

# TASK-006 - Criar ADRs iniciais

## Objetivo

Registrar as cinco decisoes estruturais que sustentam a v1.

## Contexto local

Cada ADR fixa contexto, decisao e consequencias. Sao a referencia normativa do projeto. ADRs ja existem em `docs/decisions/` com template enxuto consolidado.

## Escopo

- [`ADR-001-rebuild-from-zero.md`](../../../../../docs/decisions/ADR-001-rebuild-from-zero.md): justificativa de reconstruir do zero;
- [`ADR-002-notion-as-cms.md`](../../../../../docs/decisions/ADR-002-notion-as-cms.md): Notion como CMS editorial;
- [`ADR-003-digital-garden-as-core-product.md`](../../../../../docs/decisions/ADR-003-digital-garden-as-core-product.md): jardim digital como produto central;
- [`ADR-004-rsc-first-frontend.md`](../../../../../docs/decisions/ADR-004-rsc-first-frontend.md): RSC-first;
- [`ADR-005-css-modules.md`](../../../../../docs/decisions/ADR-005-css-modules.md): CSS Modules como padrao de estilos.

## Nao inclui

- ADRs sobre features especificas (criar quando frente surgir);
- decisoes sobre IA, busca semantica, comentarios (postergadas).

## Entradas e contratos

- visao consolidada do produto;
- restricoes do MVP.

## Resultado esperado

- cinco arquivos `ADR-*.md` em `docs/decisions/`;
- formato normativo enxuto (contexto, decisao, consequencias).

## Criterios de aceite

- [x] cinco ADRs presentes;
- [x] template normativo aplicado;
- [x] cada ADR tem contexto, decisao e consequencias.

## Validacao minima

- inspecao do diretorio [`docs/decisions/`](../../../../../docs/decisions/).

## Dependencias

- TASK-001 (estrutura `docs/`).

## Referencias

- [`docs/decisions/`](../../../../../docs/decisions/)
- commit `16af8bd docs(adr): enxuga ADRs 001-005 para template normativo`

## Perguntas em aberto

- nenhuma.
