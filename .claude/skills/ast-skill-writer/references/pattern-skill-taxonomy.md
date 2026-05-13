---
title: Pattern de taxonomia de skills
description: Define como decidir entre skill nova, expansão de skill existente, plan, task, docs e absorções herdadas de agent/routine.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 00:36
  version: "1.0.0"
---

# Pattern de taxonomia de skills

## Objetivo

Reduzir decisões taxonômicas improvisadas ao criar ou evoluir skills.

## Pergunta principal

`isso e uma capacidade recorrente com fluxo reaplicavel, ou o melhor artefato e outro?`

## Tabela de decisão

| Caso | Melhor artefato |
|------|------|
| fluxo recorrente, independente e reutilizavel | skill nova |
| fluxo recorrente, mas encaixa naturalmente em skill existente | expandir skill existente |
| reorganização estrutural sem nova responsabilidade | reorganizar skill existente |
| conhecimento novo vindo de docs, conversa ou execucao real | incorporar conhecimento na skill existente |
| frente multi-etapas, com sequenciamento e tarefas | `plan` |
| ajuste pequeno, bug, spike ou investigacao pontual | `task` |
| regra humana, taxonomia, contexto de produto/time | `docs/` |
| julgamento especializado sem camada viva dedicada | `pattern` ou referencia na skill dona |
| checklist de momento do ciclo | referencia de rotina na skill dona |

## Heuristicas praticas

- prefira expandir antes de criar skill nova;
- se o pedido for grande demais para task, mas pequeno demais para skill, costuma virar `plan` curto ou doc viva;
- se a capacidade ainda depende de contexto demais e quase nenhuma repetição, nao vire skill ainda;
- se a diferenca entre duas skills seria so de copy ou de camada muito fina, consolide.

## Julgamento especializado e rituais de ciclo

- comportamento que depende de julgamento especializado deve virar guidance dentro da skill dona, nao uma camada permanente separada;
- checklist de momento do ciclo deve virar referencia situacional da skill dona, e nao uma categoria global paralela;
- material de apoio deve ficar em `references/` ou `assets/` com dono explicito.

## Sinais de erro de classificacao

- skill nova nasce explicando quase a mesma coisa que uma skill existente;
- o artefato precisa de paginas de contexto para ser entendido;
- o fluxo real nao se repete;
- o pacote cresce mais pela taxonomia do que pelo uso real;
- a manutencao futura parece mais cara do que o ganho de clareza.
