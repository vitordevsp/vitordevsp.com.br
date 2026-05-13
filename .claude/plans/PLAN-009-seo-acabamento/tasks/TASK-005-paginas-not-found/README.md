---
title: TASK-005 - Criar paginas not-found
status: draft
priority: P0
type: implementacao
metadata:
  owner: editorial-polish
  created_at: 2026-05-13 00:30
  updated_at: 2026-05-13 00:30
  tags:
    - tasks
    - polish
    - not-found
---

# TASK-005 - Criar paginas not-found

## Objetivo

Criar `not-found.tsx` global em `src/app/not-found.tsx` e variantes especificas onde fizer sentido (`src/app/jardim/[slug]/not-found.tsx`, `src/app/projetos/[slug]/not-found.tsx`).

## Escopo

- `src/app/not-found.tsx` com mensagem clara e link para Home + Jardim;
- not-found especifico para Jardim e Projetos quando ajudar (apontar para listagem da area);
- usar componentes compartilhados;
- metadata basica do not-found.

## Nao inclui

- pagina de erro generica avancada (`error.tsx`) com retry - decidir se cobre nesta task ou em outra revisao;
- redirect personalizado de slugs antigos.

## Entradas e contratos

- componentes (PLAN-003);
- `siteConfig`.

## Resultado esperado

- `/<rota-inexistente>` renderiza not-found global;
- `/jardim/<slug-inexistente>` renderiza not-found do Jardim;
- `/projetos/<slug-inexistente>` renderiza not-found de Projetos.

## Criterios de aceite

- [ ] not-found global criado;
- [ ] not-found do Jardim criado;
- [ ] not-found de Projetos criado;
- [ ] mensagens em pt-BR;
- [ ] build passa.

## Validacao minima

- testar rotas inexistentes.

## Dependencias

- PLAN-006, PLAN-007 (slug-based routes existindo).

## Referencias

- documentacao do Next.js sobre `not-found.tsx`.

## Perguntas em aberto

- adicionar `error.tsx` na v1 ou postergar?
