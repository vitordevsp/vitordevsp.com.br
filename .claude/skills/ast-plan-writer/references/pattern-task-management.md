---
title: Pattern de gestao de tasks
description: Define como um plano deve estruturar sua base inicial de tasks e quando o handoff correto passa para a ast-task-writer.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 22:06
  version: "1.1.0"
---

# Pattern de gestao de tasks

## Objetivo

Padronizar tasks como unidades operacionais do plano sem transformar cada task em um mini-plano burocratico.

## Contrato minimo do plano

```text
tasks/TASK-xxx-slug/
  README.md
```

Arquivos opcionais sob demanda:

```text
decision-log.md
report.md
references.md
source-matrix.md
```

## Papel da ast-plan-writer

- decidir se a frente realmente merece plano;
- desenhar o conjunto inicial de tasks no contexto do plano;
- levantar perguntas objetivas ao usuario quando faltarem limites para fechar o recorte;
- usar o contrato da `ast-task-writer` quando a task precisar ser criada ou refinada na mesma rodada.

## Papel da ast-task-writer

- criar a task;
- refinar a task;
- revisar a task depois que o plano ja definiu o contexto;
- manter a qualidade do README da task ao longo do tempo.

## Como pensar as tasks do plano

- todo plano deve possuir `tasks/`;
- cada task deve representar uma unidade operacional real da frente;
- a primeira decomposicao deve reduzir ambiguidade, dependencia ou risco;
- se nao houver recorte suficiente para isso, volte e reavalie se o artefato deveria ser plano ou task solta.

## Perguntas que devem ser fechadas antes do handoff

- qual e o objetivo direto da task?
- o que entra e o que fica fora?
- a task e solta ou pertence claramente a este plano?
- quais validacoes minimas definem que a task esta pronta?
- restou alguma pergunta em aberto que precisa ser levada ao usuario?

## Artefatos opcionais

- `decision-log.md` quando houver viradas de escopo, risco ou contrato que precisem rastreabilidade propria;
- `report.md`, `references.md` e `source-matrix.md` apenas quando a leitura melhorar de verdade;
- nao crie esses arquivos por ansiedade organizacional.
