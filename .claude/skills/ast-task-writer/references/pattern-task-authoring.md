---
title: Pattern de autoria de tasks pequenas
description: Define a estrutura-base compartilhada entre task solta e task vinculada a plano, incluindo frontmatter com metadata, perguntas em aberto e handoff com a ast-plan-writer.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 20:52
  version: "1.1.0"
---

# Pattern de autoria de tasks pequenas

## Objetivo

Usar `task` como unidade operacional curta e verificavel, sem criar uma taxonomia paralela nem inflar a camada de planejamento.

## Estrutura-base compartilhada

Toda task desta skill deve deixar claros, no minimo:

- `title`, `status`, `priority` e `type` na raiz do frontmatter;
- `metadata` para ownership, datas e `tags`;
- objetivo;
- contexto local suficiente;
- escopo;
- fora do escopo;
- entradas ou contratos relevantes;
- resultado ou comportamento esperado;
- criterios de aceite verificaveis;
- validacao;
- dependencias e referencias.
- perguntas em aberto, quando houver.

## Diferenca entre os contextos

### Task solta

- pertence a uma demanda pequena sem plano pai claro;
- precisa ser mais autocontida;
- deve carregar no proprio arquivo o contexto que faltaria fora de um plano.

### Task vinculada a plano

- pertence a uma frente multi-etapas ja registrada em `.claude/plans/PLAN-*/`;
- pode herdar contexto, riscos e referencias do plano pai;
- deve focar no recorte local sem duplicar todo o dossie do plano.

## Regra de transicao desta base

- `task` passa a ser o modelo conceitual padrao desta skill;
- `.claude/tasks/` passa a ser o contexto canonico para tasks soltas;
- `.claude/plans/<plan>/tasks/` continua sendo o contexto vivo ja existente para tasks de plano;
- nao criar novas taxonomias paralelas nem misturar a nomenclatura antiga com `task` como se fossem categorias distintas de trabalho curto.

## Perguntas em aberto

- use a secao final `Perguntas em aberto` apenas para lacunas que realmente bloqueiam ou mudam o recorte;
- quando nao houver duvida relevante, registre `nenhuma no momento`;
- depois que o usuario responder, promova a resposta para a task e remova perguntas obsoletas.

## Quando escalar para plano

Escalar para `ast-plan-writer` quando a demanda:

- precisa de mais de uma task;
- exige ordem entre subtarefas;
- vai atravessar varias sessoes;
- precisa de concentracao de riscos, dependencias ou historico num plano pai.

## Antipadroes

- escrever task curta sem validacao objetiva;
- duplicar o mesmo problema em task solta e task de plano;
- usar task para backlog amplo ou roadmap;
- criar `.claude/tasks/` por inferencia durante uma frente que nao e taxonomica;
- manter a linguagem antiga como camada viva preferencial depois de a estrutura-base ja estar definida em termos de task.
