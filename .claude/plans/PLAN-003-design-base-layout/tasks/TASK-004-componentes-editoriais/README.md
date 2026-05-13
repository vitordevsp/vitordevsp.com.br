---
title: TASK-004 - Criar componentes editoriais basicos
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
    - editorial
---

# TASK-004 - Criar componentes editoriais basicos

## Objetivo

Implementar `tag`, `status-badge` e `card` em `src/shared/ui/` como Server Components com CSS Modules. Sao a fronteira reutilizavel entre Jardim e Projetos.

## Contexto local

Estes componentes nao podem depender de feature especifica. Variacoes via `data-*` (`data-tone`, `data-status`, `data-stage`). `card` na v1 expoe `media?`, `header`, `body`, `footer` opcionais via composicao de slots (children) ou props - definir na execucao.

## Escopo

- criar:
  - `src/shared/ui/tag/tag.tsx + .module.css`
  - `src/shared/ui/status-badge/status-badge.tsx + .module.css`
  - `src/shared/ui/card/card.tsx + .module.css`
- `tag`: aceita `children`, `tone?`;
- `status-badge`: aceita `label`, `status?` (string livre); cores via `data-status` mapeadas em CSS;
- `card`: aceita `as?`, `href?`, `children`; reutilizavel para listagem de posts e projetos;
- nenhum acoplamento com modelos `TextPost`/`Project`;
- ariaSemantica adequada.

## Nao inclui

- `maturity-badge` (especifico do Jardim, PLAN-006);
- `project-status-badge` (especifico de Projetos, PLAN-007);
- cards de listagem por feature (PLAN-006, PLAN-007).

## Entradas e contratos

- [`docs/styling.md`](../../../../../docs/styling.md);
- [`docs/content-model.md`](../../../../../docs/content-model.md) (apenas como referencia conceitual; sem acoplar).

## Resultado esperado

- tres componentes consumiveis em qualquer feature;
- variantes via `data-*`;
- build e typecheck passam.

## Criterios de aceite

- [ ] tres pastas criadas com `.tsx` + `.module.css`;
- [ ] sem `"use client"`;
- [ ] sem acoplamento com modelo de feature;
- [ ] aceitam composicao (children) onde fizer sentido;
- [ ] aplicam `data-*` para variantes.

## Validacao minima

- consumir cada componente em playground simples (pagina experimental ou story textual) e validar visual.

## Dependencias

- TASK-001 (layout raiz);
- PLAN-002 TASK-004 (tokens).

## Referencias

- [`docs/styling.md`](../../../../../docs/styling.md) secoes "Variantes" e "Data attributes".

## Perguntas em aberto

- `card` aceita imagem (`media`) ja na v1 ou apenas texto?
- `tone` do `tag` precisa ser tipado em uniao restrita ou aceita string livre?
