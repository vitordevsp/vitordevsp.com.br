---
title: TASK-003 - Criar componentes estruturais
status: draft
priority: P0
type: implementacao
metadata:
  owner: design-system
  created_at: 2026-05-13 00:00
  updated_at: 2026-05-13 00:00
  tags:
    - tasks
    - shared
    - ui
---

# TASK-003 - Criar componentes estruturais

## Objetivo

Implementar `container`, `section` e `page-heading` em `src/shared/ui/` como Server Components com CSS Modules.

## Contexto local

Estes componentes sao base para qualquer pagina. `Container` aplica largura maxima e padding lateral. `Section` agrupa blocos semanticos. `PageHeading` aplica hierarquia de titulo + subtitulo + meta opcional.

## Escopo

- criar:
  - `src/shared/ui/container/container.tsx + .module.css`
  - `src/shared/ui/section/section.tsx + .module.css`
  - `src/shared/ui/page-heading/page-heading.tsx + .module.css`
- props minimas e tipadas;
- nomes de classe semanticos (`.root`, `.header`, `.title`, etc.);
- `data-*` para variantes quando uteis (`data-size`, `data-tone`).

## Nao inclui

- `stack`, `grid` (criar so com necessidade real);
- componentes especificos de feature;
- helpers de classe (`cn`) sem necessidade.

## Entradas e contratos

- [`docs/styling.md`](../../../../../docs/styling.md);
- tokens definidos em PLAN-002 TASK-004.

## Resultado esperado

- tres componentes consumiveis a partir de qualquer pagina via `import { Container } from '@/shared/ui/container/container'`.

## Criterios de aceite

- [ ] tres pastas criadas com `.tsx` + `.module.css`;
- [ ] sem `"use client"`;
- [ ] tipagem explicita;
- [ ] tokens usados via CSS variables;
- [ ] typecheck e build passam.

## Validacao minima

- import em uma pagina existente (Home placeholder);
- `npm run build` passa.

## Dependencias

- TASK-001 (layout raiz);
- PLAN-002 TASK-004 (tokens).

## Referencias

- [`docs/styling.md`](../../../../../docs/styling.md).

## Perguntas em aberto

- `Container` aceita variantes de largura (`narrow`, `wide`) ou apenas uma largura fixa por enquanto?
