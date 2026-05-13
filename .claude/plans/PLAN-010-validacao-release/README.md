---
title: PLAN-010 - Validacao, hardening e release v1
status: draft
tags:
  - plans
  - release
  - validation
  - hardening
metadata:
  owner: release
  created_at: 2026-05-13 00:35
  updated_at: 2026-05-13 00:35
---

# PLAN-010 - Validacao, hardening e release v1

## Objetivo

Fechar a v1 com validacoes finais, revisao de exposicao de secrets, conferencia de coerencia docs vs implementacao, checklist de deploy e registro de release. Encaminhar para `ast-release-manager` quando aplicavel.

## Contexto

Apos PLAN-002 a PLAN-009 entregarem funcionalidade, este plano leva o projeto para publicacao. Foco em verificacao e rastreabilidade.

Skill responsavel pelo fechamento tecnico: [`ast-release-manager`](../../skills/ast-release-manager/SKILL.md).

## Escopo

- rodar `npm run lint`, `npm run build`, `npx tsc --noEmit` e registrar resultados;
- revisar exposicao de secrets (`NOTION_TOKEN`, ids de databases) em todo o codigo;
- revisar docs vs implementacao - corrigir divergencias relevantes;
- criar checklist de deploy com variaveis necessarias e pontos de validacao;
- registrar release v1 (changelog ou release notes) com escopo entregue + pendencias;
- encaminhar fechamento de commit/release para [`ast-release-manager`](../../skills/ast-release-manager/SKILL.md).

## Fora do escopo

- deploy efetivo (decisao do usuario);
- configuracao de hosting (Vercel) - documentar requisitos, nao executar;
- analytics, observabilidade;
- testes automatizados (projeto nao tem suite ainda).

## Areas afetadas

- `package.json` (sem mudanças esperadas);
- `docs/` (apenas registro do release, se aplicavel);
- novo `RELEASE.md` ou `CHANGELOG.md` (decidir local);
- eventualmente `docs/notion.md` para registrar pendencias resolvidas/abertas.

## Tasks

- [`TASK-001 - Rodar validacoes finais`](./tasks/TASK-001-rodar-validacoes/README.md)
- [`TASK-002 - Revisar exposicao de secrets`](./tasks/TASK-002-revisar-secrets/README.md)
- [`TASK-003 - Revisar docs vs implementacao`](./tasks/TASK-003-revisar-docs/README.md)
- [`TASK-004 - Criar checklist de deploy`](./tasks/TASK-004-checklist-deploy/README.md)
- [`TASK-005 - Registrar release v1`](./tasks/TASK-005-registrar-release/README.md)

## Riscos e dependencias

- depende de PLAN-002 a PLAN-009;
- risco: divergencias docs vs implementacao crescerem ao longo do projeto. Mitigar revisando incremental;
- risco: secrets vazarem por log/import client - exigir grep manual + ferramenta automatizada (e.g. `gitleaks`) se disponivel;
- risco: release sem changelog cria atrito para evolucao pos-v1.

## Validacao

- comandos passam ou pendencias registradas explicitamente;
- nenhum `NEXT_PUBLIC_*` em variavel de token;
- nenhum token logado em codigo;
- docs e implementacao alinhados;
- changelog/release notes registrados.

## Criterio de encerramento

- v1 pronta para publicar (deploy fica para o usuario);
- pendencias conhecidas listadas;
- proximos planos pos-v1 sugeridos (puxar de [`PLAN-000-desktop/post-v1-candidates.md`](../PLAN-000-desktop/post-v1-candidates.md)).

## Referencias

- [`docs/README.md`](../../../docs/README.md)
- [`docs/notion.md`](../../../docs/notion.md)
- [`.claude/skills/ast-release-manager/SKILL.md`](../../skills/ast-release-manager/SKILL.md)

## Perguntas em aberto

- gerar `CHANGELOG.md` na raiz ou registrar release em `docs/`?
- versao da v1: `1.0.0` ou `0.1.0`? (recomendacao: `0.1.0` para indicar maturidade ainda em evolucao).
- deploy alvo (Vercel) ja decidido?
