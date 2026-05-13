---
title: Fluxos de sequencia da ast-plan-writer
description: Explicita os fluxos principais por acao da skill com diagramas Mermaid curtos para reduzir ambiguidade entre plano, task e execucao direta.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 22:06
  version: "1.2.0"
---

# Fluxos de sequencia da ast-plan-writer

## Avaliar se merece plano

Quando ainda existe duvida entre plano, task ou execucao direta.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant P as ast-plan-writer
    participant R as Repositorio
    U->>P: descreve a frente
    P->>R: inspeciona contexto e areas afetadas
    P->>P: avalia risco, persistencia e escopo
    P-->>U: recomenda plano, task ou execucao direta
```

## Criar ou refinar plano

Quando a frente merece um plano novo ou quando um plano existente precisa ser endurecido.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant P as ast-plan-writer
    participant L as Plano
    U->>P: pede criacao ou refinamento
    P->>L: cria em draft ou le plano existente
    P->>L: move para refinando
    P->>P: identifica lacunas e perguntas obrigatorias
    P->>U: pergunta o que falta para fechar plano ou estrutura inicial de tasks
    U->>P: responde lacunas criticas
    P->>P: organiza dossie, fronteiras e validacoes
    P->>L: atualiza README e mapa de tasks
    P->>L: fecha refinamento em refinado
    P-->>U: entrega plano mais claro e executavel
```

## Handoff para ast-task-writer

Quando o plano ja foi aberto, suas tasks ja pertencem ao pacote e a manutencao deve sair desta skill.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant P as ast-plan-writer
    participant T as ast-task-writer
    participant K as Task
    U->>P: pede plano com tasks ou refinamento estrutural
    P->>P: define estrutura inicial de tasks, dependencias e contexto herdado
    P->>U: explicita quando chamar ast-task-writer
    U->>T: pede criacao ou refinamento da task
    T->>K: aplica o contrato proprio da task
    T-->>U: devolve task pronta para execucao segura
```
