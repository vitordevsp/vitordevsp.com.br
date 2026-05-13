---
title: TASK-003 - Validar aliases de import
status: draft
priority: P1
type: validacao
metadata:
  owner: app-foundation
  created_at: 2026-05-12 22:40
  updated_at: 2026-05-12 22:40
  tags:
    - tasks
    - typescript
---

# TASK-003 - Validar aliases de import

## Objetivo

Confirmar que `@/*` -> `./src/*` funciona em runtime, em typecheck e no build.

## Contexto local

`tsconfig.json` ja contem `paths: { "@/*": ["./src/*"] }`. Esta task valida o uso real do alias em um import simples e confirma comportamento do Next.

## Escopo

- escrever um import temporario usando `@/` em algum arquivo neutro (ex.: `src/app/layout.tsx` importando algo de `src/shared/`) ou criar um teste minimo no `src/content/site.ts` ja criado por TASK-005;
- rodar typecheck e build;
- remover qualquer codigo de teste introduzido apenas para validacao.

## Nao inclui

- mudanca de configuracao de alias;
- introducao de aliases adicionais (`~`, `#`) sem decisao;
- eslint plugin de import order.

## Entradas e contratos

- [`tsconfig.json`](../../../../../tsconfig.json)
- [`docs/architecture.md`](../../../../../docs/architecture.md) secao "Imports".

## Resultado esperado

- alias funciona em runtime e em build;
- nenhum codigo de teste residual.

## Criterios de aceite

- [ ] import com `@/` resolve corretamente;
- [ ] `npx tsc --noEmit` passa;
- [ ] `npm run build` passa;
- [ ] nenhum arquivo de teste residual.

## Validacao minima

- comandos de typecheck e build.

## Dependencias

- TASK-002 (pastas necessarias para escrever imports significativos).

## Referencias

- [`tsconfig.json`](../../../../../tsconfig.json)
- [`docs/architecture.md`](../../../../../docs/architecture.md)

## Perguntas em aberto

- nenhuma.
