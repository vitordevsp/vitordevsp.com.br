---
title: Pattern de autoria de planos
description: Define quando abrir plano, como estruturar o README como dossie e como preservar fronteiras entre plano, task e SPEC no Agents Studio v0.1.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 22:06
  version: "1.2.0"
---

# Pattern de autoria de planos

## Objetivo

Padronizar a criacao, o refinamento e a reestruturacao de planos em `.claude/plans/` sem inflar a camada operacional.

## Regras centrais

- abra plano apenas quando a frente for multi-sessao, tiver risco real ou precisar de checkpoints duraveis;
- trate `README.md` como dossie principal do plano;
- mantenha o plano com começo e fim claros;
- todo plano deve nascer com `tasks/`; se a frente nao sustentar isso, provavelmente ainda cabe melhor como task;
- se a mudanca ainda couber em `task`, nao force um plano;
- se a demanda principal for descrever comportamento vivo do sistema, direcione para a skill dona de `SPEC.md`.

## Estrutura recomendada do plano

Um plano bom deste repositorio costuma explicitar:

1. titulo
2. status
3. objetivo
4. contexto
5. escopo
6. fora do escopo
7. areas afetadas
8. tasks
9. riscos e dependencias
10. referencias

Outros arquivos so entram quando a leitura realmente melhora.

## Excecao estrutural: `PLAN-000-desktop`

`PLAN-000-desktop` nao e um plano de entrega comum. Ele funciona como desktop operacional temporario da pasta `.claude/plans/`.

Use essa excecao quando o material:

- ainda nao merece um plano dedicado;
- ainda nao cabe como task isolada;
- precisa existir por algumas sessoes para apoiar investigacao, organizacao ou triagem.

Esse desktop pode receber:

- arquivos temporarios;
- notas simples ainda sem definicao consolidada;
- relatorios curtos de compreensao rapida dos planos;
- checkpoints e pendencias curtas em `progress.md`.

Nao deixe o desktop virar backlog permanente nem substituir o destino final do material. O que estabilizar deve ser promovido para a camada correta.

## Plano versus task versus SPEC

- `plan`: frente grande, com persistencia entre sessoes e criterio de encerramento;
- `task`: ajuste pequeno e autocontido, seja solto ou dentro de um plano;
- `SPEC.md`: documento vivo de um artefato do sistema, mantido pelas skills donas da camada.

## Fluxo transversal e handoff

- quando a frente atravessar varias camadas, explicite estados, dependencias e validacoes;
- antes de fechar o plano, transforme lacunas reais em perguntas objetivas ao usuario;
- quando o plano precisar de tasks, registre o mapa inicial e encaminhe criacao/refinamento para `ast-task-writer`;
- quando a frente estiver pronta para fechamento tecnico, encaminhe para `ast-release-manager`;
- nao duplique specs, docs de dominio ou rotinas inteiras dentro do plano.
