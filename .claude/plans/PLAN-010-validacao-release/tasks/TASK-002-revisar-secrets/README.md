---
title: TASK-002 - Revisar exposicao de secrets
status: draft
priority: P0
type: revisao
metadata:
  owner: release
  created_at: 2026-05-13 00:35
  updated_at: 2026-05-13 00:35
  tags:
    - tasks
    - release
    - security
---

# TASK-002 - Revisar exposicao de secrets

## Objetivo

Garantir que `NOTION_TOKEN`, ids de databases e qualquer secret nao vazem para client, logs, build ou commits.

## Escopo

- grep por `NEXT_PUBLIC_NOTION`, `NOTION_TOKEN`, `console.log.*token` em todo o repo;
- verificar imports de `@/integrations/notion/*` em Client Components - nao devem existir;
- conferir uso de `import 'server-only'` nos modulos sensiveis;
- conferir presence de `.env.local` no `.gitignore`;
- registrar pendencias.

## Nao inclui

- rotacao real de tokens (decisao do usuario fora do repo);
- configurar `gitleaks` ou similar como gate (decidir em pos-v1).

## Criterios de aceite

- [ ] nenhum token em `NEXT_PUBLIC_*`;
- [ ] nenhum import client de `@/integrations/notion/*`;
- [ ] `server-only` presente nos arquivos sensiveis;
- [ ] `.env.local` no `.gitignore`;
- [ ] resultado registrado em `report.md` do plano.

## Validacao minima

- comandos `grep` e `find`;
- inspecao manual.

## Dependencias

- PLAN-004 (integracao Notion entregue).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)
- [`docs/architecture.md`](../../../../../docs/architecture.md) secao "Variaveis de ambiente".

## Perguntas em aberto

- adicionar pre-commit hook anti-secret no pos-v1?
