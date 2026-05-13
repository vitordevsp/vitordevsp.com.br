---
title: Fluxos de sequencia da journey-writer
description: Explicita os fluxos principais por acao da skill com diagramas Mermaid curtos para reduzir ambiguidade operacional sem inflar o SKILL principal.
metadata:
  author: agents-studio
  last_updated: 2026-05-13 00:00
  version: "1.0.0"
---

# Fluxos de sequencia da journey-writer

## Objetivo

Registrar visualmente como a skill opera nas acoes principais, preservando passo a passo facil de revisar sem duplicar `SKILL.md`.

## Inicializar

Quando `.journey/` ainda nao existe ou esta incompleto.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant R as Repositorio
    U->>S: pede para iniciar jornada
    S->>R: verifica se .journey/ existe
    S->>U: confirma criacao e pede contexto inicial (protagonista, incomodo, chamado)
    U-->>S: contexto editorial
    S->>R: copia templates de assets/ para .journey/
    S->>R: preenche hero.md, timeline.md, open-questions.md com rascunho inicial
    S-->>U: entrega mapa inicial e marca lacunas em open-questions.md
```

## Analisar insumo

Quando o usuario traz material bruto e quer saber onde registrar.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    U->>S: entrega trecho de conversa, decisao, plano, erro ou reflexao
    S->>S: classifica tipo de insumo
    S->>S: extrai conflito, decisao, virada, aprendizado, pergunta, conteudo potencial
    S->>S: classifica estagio da jornada e lentes narrativas
    S-->>U: devolve recomendacao de destino e pergunta de confirmacao
```

## Registrar

Quando o destino editorial ja esta claro.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant J as .journey/
    U->>S: confirma destino (marco, episodio, semente, fragmento)
    S->>J: le arquivo alvo
    S->>S: destila material e separa fato de hipotese
    S->>J: acrescenta registro preservando estilo e datas
    S->>J: valida checklist de qualidade
    S-->>U: devolve registro com seeds de conteudo marcadas
```

## Refinar

Quando `hero.md`, episodio existente ou `open-questions.md` precisa amadurecer.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant J as .journey/
    U->>S: indica arquivo alvo e nova evidencia
    S->>J: le estado atual
    S->>S: identifica lacuna a fechar sem reescrever blocos consolidados
    S->>J: atualiza secoes especificas e mantem hipoteses marcadas
    S-->>U: devolve arquivo refinado e seeds atualizadas se houver
```

## Colher conteudo

Quando registros existentes ja tem material suficiente para virar oferta publica.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant J as .journey/
    U->>S: pede para colher seeds a partir de episodios ou marcos
    S->>J: varre episodes/ e timeline.md
    S->>S: extrai teses, formatos possiveis, publico e relacao com SDD
    S->>J: adiciona seeds em seeds/content-seeds.md com maturidade indicada
    S-->>U: devolve lista de seeds priorizada
```
