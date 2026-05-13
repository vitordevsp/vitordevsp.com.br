---
title: PLAN-000 - Desktop de trabalho do LLM
status: pendente
tags:
  - plans
  - desktop
metadata:
  owner: agents-studio
  created_at: 2026-04-21 00:23
  updated_at: 2026-05-12 22:06
---

# PLAN-000 - Desktop de trabalho do LLM

## Objetivo

Servir como desktop operacional temporario do LLM dentro de [`.claude/plans/`](../README.md).

## Contexto

Nem todo material de sessao ja nasce como plano, task, report ou doc vivo. Este desktop existe para dar destino temporario a esse conteudo sem poluir frentes persistentes.

## Escopo

- guardar rascunhos temporarios;
- registrar checkpoints locais curtos;
- concentrar referencias provisoriais;
- apoiar a decisao final sobre o destino do material produzido.

## Fora do escopo

- substituir planos persistentes;
- virar backlog permanente;
- guardar decisoes ja consolidadas;
- manter material que ja deveria ter sido promovido para `docs/`, `.claude/tasks/`, outro plano ou docs vivos do dominio.

## Estrutura esperada

Arquivos so nascem sob demanda:

```text
PLAN-000-desktop/
  README.md
  progress.md
  notes.md
  report.md
  references.md
```

`progress.md` concentra o acompanhamento local e temporario e o indice vivo dos planos da pasta. `notes.md`, `report.md` e `references.md` entram apenas quando realmente ajudarem.

## Regras de uso

- manter curto e temporario;
- promover rapido o que estabilizar;
- nao duplicar backlog de planos ativos;
- nao usar este desktop como substituto de board externo.

## Fluxo de uso

1. Criar arquivo temporario apenas quando o material ainda nao tiver destino claro.
2. Usar [`progress.md`](./progress.md) para checkpoints, pendencias curtas e estado vivo dos planos.
3. Ao final da sessao, promover, consolidar ou descartar o que nao precisa continuar aqui.

## Criterio de limpeza

O resultado esperado e que este desktop fique:

- vazio ou quase vazio; ou
- com apenas materiais explicitamente temporarios; ou
- com links claros para o destino final do que foi promovido.

## Relação com board externo

Este repositorio nao usa board local. O acompanhamento temporario fica em `progress.md` dentro deste desktop. Boards externos, quando existirem, ficam fora do repositorio.

## Referencias

- [`../README.md`](../README.md)
- [`./progress.md`](./progress.md)
