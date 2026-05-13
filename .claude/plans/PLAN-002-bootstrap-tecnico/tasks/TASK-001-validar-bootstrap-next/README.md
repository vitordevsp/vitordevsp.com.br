---
title: TASK-001 - Validar bootstrap Next.js
status: draft
priority: P0
type: validacao
metadata:
  owner: app-foundation
  created_at: 2026-05-12 22:40
  updated_at: 2026-05-12 22:40
  tags:
    - tasks
    - next
    - bootstrap
---

# TASK-001 - Validar bootstrap Next.js

## Objetivo

Confirmar que o projeto Next.js inicial roda, builda e passa lint/typecheck na base atual, sem precisar de re-init.

## Contexto local

Projeto ja contem `next@16.2.4`, `react@19.2.4`, `typescript@5`, `eslint@9`. `src/app/layout.tsx` e route group `(home)` presentes. Esta task valida o estado atual; nao recria o projeto.

## Escopo

- rodar `npm install` se necessario;
- rodar `npm run dev` e confirmar inicializacao local;
- rodar `npm run build`;
- rodar `npx tsc --noEmit`;
- rodar `npm run lint`;
- registrar pendencias encontradas (warnings, deprecations).

## Nao inclui

- alteracoes de configuracao do Next.js sem justificativa;
- substituicao do App Router;
- mudanca de versao maior das dependencias;
- introducao de novas dependencias.

## Entradas e contratos

- [`package.json`](../../../../../package.json)
- [`tsconfig.json`](../../../../../tsconfig.json)
- [`next.config.*`](../../../../../) se existir

## Resultado esperado

- relato curto dos quatro comandos rodando;
- lista de warnings e pendencias documentada caso aparecam.

## Criterios de aceite

- [ ] `npm run dev` inicializa sem erro fatal;
- [ ] `npm run build` finaliza sem erro;
- [ ] `npx tsc --noEmit` passa;
- [ ] `npm run lint` passa (ou warnings registrados explicitamente).

## Validacao minima

- comandos do CLAUDE.md secao "Comandos confirmados".

## Dependencias

- nenhuma (primeira task do plano).

## Referencias

- [`CLAUDE.md`](../../../../../CLAUDE.md)
- [`docs/architecture.md`](../../../../../docs/architecture.md)

## Perguntas em aberto

- existe arquivo `next.config.*` customizado? Se sim, ele segue defaults ou tem ajuste relevante?
