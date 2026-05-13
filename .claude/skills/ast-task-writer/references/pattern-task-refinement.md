---
title: Pattern de refinamento de task
description: Aprofunda como endurecer uma task antes da execucao, com perguntas ao usuario, corte de escopo e validacao objetiva.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 20:52
  version: "1.1.0"
---

# Pattern de refinamento de task

## Objetivo

Evitar tasks vagas, grandes demais ou dependentes de contexto oral, tornando explicito o que precisa ser perguntado e o que precisa ficar registrado.

## O que um bom refinamento fecha

- objetivo direto e sem dupla interpretacao;
- contexto local suficiente;
- escopo e nao inclui com fronteira real;
- entradas e contratos necessarios;
- resultado esperado observavel;
- criterios de aceite verificaveis;
- validacao minima executavel;
- dependencias claras;
- perguntas em aberto reduzidas ao minimo.

## Status durante o refinamento

- ao entrar na rodada de refinamento, usar `refinando`;
- ao fechar todas as lacunas relevantes, mudar para `refinado`;
- se ainda restar pergunta que altera escopo, contrato ou validacao, nao sair de `refinando`.

## Quando perguntar antes de fechar

Pergunte ao usuario quando faltar qualquer um destes pontos:

- existe mais de um recorte plausivel para a mesma task;
- o fora de escopo nao evita drift suficiente;
- a validacao ainda depende de adivinhacao;
- a task parece grande demais e talvez mereca plano;
- a dependencia externa ainda nao foi confirmada.

## Como perguntar

- faca poucas perguntas;
- seja objetivo;
- explicite o impacto de cada lacuna;
- pergunte antes de escrever uma task "bonita", mas errada.

## Sinais de que a task ainda nao esta pronta

- aceita implementacoes muito diferentes entre si;
- nao deixa claro o que validar ao final;
- depende de varias suposicoes nao registradas;
- mistura descoberta, desenho e execucao sem corte;
- nao diz quando deve virar plano.

## Fechamento esperado

Se o refinamento terminou bem, a task deve:

- estar em `refinado`;
- refletir no corpo as respostas que vieram do usuario;
- deixar `Perguntas em aberto` vazia ou com `nenhuma no momento`.
