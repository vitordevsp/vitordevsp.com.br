---
title: Fluxos de sequencia da ast-skill-writer
description: Explicita os fluxos principais por acao da skill com diagramas Mermaid curtos para reduzir ambiguidade operacional sem inflar o SKILL principal.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 01:57
  version: "1.0.0"
---

# Fluxos de sequencia da ast-skill-writer

## Objetivo

Registrar de forma visual e curta como a skill deve operar nas suas acoes principais, preservando um passo a passo facil de revisar sem duplicar o `SKILL.md`.

## Criar

Quando a capacidade ainda nao existe como skill e ha recorrencia real.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as ast-skill-writer
    participant R as Repositorio
    U->>S: pede nova skill
    S->>R: inspeciona skill existente, docs e fontes exatas
    S->>S: decide se merece skill ou outro artefato
    S->>R: cria pacote minimo da skill
    S->>R: registra pattern, template, sequencia e historico
    S-->>U: entrega skill nova com contrato claro
```

## Refatorar ou reorganizar

Quando a skill existe, mas precisa ganhar clareza, estrutura ou aderencia ao contrato atual.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as ast-skill-writer
    participant K as Skill alvo
    U->>S: pede refatoracao ou reorganizacao
    S->>K: le estado atual e fontes exatas
    S->>S: identifica lacunas de contrato e estrutura
    S->>K: redistribui conteudo entre SKILL, references, assets e scripts
    S->>K: atualiza versionamento e sequencia
    S-->>U: devolve skill endurecida e coerente
```

## Expandir ou incorporar conhecimento

Quando a skill atual deve absorver capacidade compativel ou aprendizado recorrente vindo de docs, conversa, execucao ou feedback.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as ast-skill-writer
    participant F as Fonte nova
    participant K as Skill alvo
    U->>S: pede expansao ou incorporacao
    S->>F: extrai conhecimento reutilizavel
    S->>S: decide o destino correto no pacote
    S->>K: atualiza contrato, pattern, template, script ou historico
    S->>K: revisa sequence-workflows quando a acao mudar
    S-->>U: entrega skill ampliada sem trocar a responsabilidade central
```
