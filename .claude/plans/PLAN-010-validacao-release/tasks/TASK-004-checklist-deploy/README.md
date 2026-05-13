---
title: TASK-004 - Criar checklist de deploy
status: draft
priority: P0
type: documentacao
metadata:
  owner: release
  created_at: 2026-05-13 00:35
  updated_at: 2026-05-13 00:35
  tags:
    - tasks
    - release
    - deploy
---

# TASK-004 - Criar checklist de deploy

## Objetivo

Documentar variaveis necessarias, comandos de build, pontos de validacao e pendencias conhecidas para deploy.

## Escopo

- criar `docs/deploy.md` (ou secao em `docs/README.md`) com:
  - variaveis: `NOTION_TOKEN`, ids de databases (Textos, Projetos, + opcionais);
  - comandos: `npm install`, `npm run build`, `npm run start`;
  - plataforma alvo provavel: Vercel (sem decisao final, registrar como recomendacao);
  - pontos de validacao manual pos-deploy (Home carrega, listagem do Jardim funciona, slug responde);
  - pendencias conhecidas listadas;
- linkar do `docs/README.md`.

## Nao inclui

- automatizar deploy;
- configurar CI/CD;
- comprar dominio;
- configurar DNS.

## Criterios de aceite

- [ ] `docs/deploy.md` criado;
- [ ] variaveis listadas;
- [ ] comandos confirmados;
- [ ] pontos de validacao pos-deploy;
- [ ] linkado no `docs/README.md`.

## Validacao minima

- leitura do documento por alguem que nao acompanhou o projeto.

## Dependencias

- PLAN-004 (variaveis definidas);
- PLAN-009 (acabamento).

## Referencias

- [`docs/README.md`](../../../../../docs/README.md)
- [`docs/notion.md`](../../../../../docs/notion.md)

## Perguntas em aberto

- plataforma de deploy oficialmente decidida?
- dominio definitivo definido?
