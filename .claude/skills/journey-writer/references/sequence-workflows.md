---
title: Fluxos de sequencia da journey-writer
description: Explicita os fluxos principais por acao da skill com diagramas Mermaid curtos para reduzir ambiguidade operacional sem inflar o SKILL principal.
metadata:
  author: agents-studio
  last_updated: 2026-05-16 12:00
  version: "1.4.0"
---

# Fluxos de sequencia da journey-writer

## Objetivo

Registrar visualmente como a skill opera nas acoes principais, preservando passo a passo facil de revisar sem duplicar `SKILL.md`.

## Convencao sobre scripts

A partir de 1.3.0, varios passos chamam scripts deterministas em `scripts/`. Quando um passo aparece como `S->S: <descricao>` mas existe script equivalente, preferir chamar o script. Mapa completo em [`pattern-scripts.md`](./pattern-scripts.md).

## Inicializar (com ramificacao por historico)

Quando `.journey/` ainda nao existe ou esta incompleto. Caminho A (projeto novo, sem historico) e Caminho B (projeto vivo, com sessoes/commits/CHANGELOG).

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant R as Repositorio
    participant H as Historico
    U->>S: pede para iniciar jornada
    S->>R: verifica se .journey/ existe
    S->>H: busca historico (git log, tags, scripts/extract-sessions.sh em modo interativo, CHANGELOG)
    alt projeto novo (sem historico)
        S->>U: pede contexto editorial (protagonista, incomodo, chamado)
        U-->>S: contexto editorial
        S->>R: copia templates de assets/ (exceto template-episode) para .journey/
        S->>R: rascunho generico em hero/timeline/open-questions com lacunas marcadas
    else projeto vivo (com historico)
        S->>S: mapeia sessoes/commits/CHANGELOG a episodios candidatos
        S->>U: apresenta sintese (linha do tempo + temas) via AskUserQuestion
        U-->>S: valida sintese
        S->>R: copia templates de assets/ (exceto template-episode) para .journey/
        S->>R: escreve eps com material real (citacoes verbatim, numeros, datas)
        S->>R: registra metadata.sources em cada ep
    end
    S-->>U: entrega mapa inicial + indica proximos passos de refinacao
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
    S->>J: se ep novo, popula frontmatter completo + sources
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
    S->>J: le estado atual + metadata.sources do ep
    S->>S: identifica fontes ja consultadas vs novas
    S->>S: identifica lacuna a fechar sem reescrever blocos consolidados
    S->>J: atualiza secoes especificas e mantem hipoteses marcadas
    S->>J: atualiza metadata.sources (novas entradas) + bumpa last_review
    S-->>U: devolve arquivo refinado e seeds atualizadas se houver
```

## Enriquecer

Quando episodio existente esta raso e precisa ganhar numeros, citacoes ou tabelas. Diferente de `refinar` (que cobre lacuna conceitual): `enriquecer` adiciona densidade objetiva.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant J as .journey/
    participant H as Historico
    U->>S: indica ep alvo e tipo de enriquecimento (numeros, citacoes, lista detalhada)
    S->>J: le ep + metadata.sources
    S->>H: scripts/extract-sessions.sh (filtra periodo+branch nao listados em sources)
    S->>H: scripts/extract-conversation.sh <id> (intercala USER+ASSISTANT)
    S->>S: extrai material concreto (quotes verbatim, datas, contagens, tabelas)
    S->>J: insere material no ep sem reescrever conceito ja consolidado
    S->>J: scripts/source-add.py (registra fonte + bumpa last_review)
    S->>J: scripts/validate.sh (audita refs/frontmatter ao final)
    S-->>U: devolve ep enriquecido com diff visivel das adicoes
```

## Reorganizar

Quando numeracao cronologica precisa mudar (novo ep no meio, fusao, divisao). Detalhe em `pattern-renumeration-safe.md`.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant J as .journey/
    U->>S: pede reorganizacao (mapa antigo -> novo)
    S->>U: apresenta plano de renomeacao + mapa de absorcao se houver delecao (formato map.yaml)
    U-->>S: aprova plano
    S->>J: scripts/reorganize.py --map map.yaml --dry-run (preview)
    U-->>S: aprova diff
    S->>J: scripts/reorganize.py --map map.yaml (executa mv 2-fase + self-refs + cross-refs + validate.sh)
    S-->>U: entrega relatorio (arvore final + zero refs orfas)
```

## Validar

Quando ha suspeita de refs quebradas, frontmatter incompleto ou sources defasados.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant J as .journey/
    U->>S: pede validacao da camada
    S->>J: scripts/validate.sh (executa em ms; substitui acao inteira)
    Note over S,J: refs orfas + frontmatter incompleto + last_review > 30d + title vs filename + eps sem sources
    S-->>U: relatorio categorizado (exit 0 = limpo, exit 1 = pendencias)
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

## Gerar prompt externo

Quando ha memoria que so o usuario tem (ou que precisa de outro modelo pra destravar). Skill gera prompt parametrizado pra usuario levar a ChatGPT, Claude.ai ou Gemini.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant R as Repositorio
    participant T as template-external-rescue-prompt
    U->>S: "gerar prompt sobre <assunto>"
    S->>S: agente escolhe ep alvo, era, nivel de exposicao (juizo)
    S->>R: scripts/gen-rescue-prompt.py --assunto "..." --ep ... --era ... --exposicao ...
    Note over S,R: script le CLAUDE.md/hero/docs/open-questions e renderiza template
    S-->>U: devolve bloco markdown copiavel pronto pra colar no LLM externo
    Note over U: Usuario cola no LLM externo,<br/>conduz conversa,<br/>recebe resposta estruturada
```

## Absorver resgate externo

Quando usuario volta com resposta estruturada vinda do LLM externo.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant J as .journey/
    U->>S: cola resposta markdown do LLM externo + indica ep alvo
    S->>S: parseia secoes (Fatos, Motivacoes, Decisoes, Citacoes, Hipoteses, Lacunas)
    S->>J: le ep alvo + metadata.sources existente
    S->>S: mapeia secoes da resposta para secoes do ep (Contexto, Conflito, Virada, Aprendizado, Fragmentos, Perguntas)
    S->>S: respeita nivel de exposicao declarado no resgate
    alt nivel de exposicao = privado
        S-->>U: mostra diff antes de salvar e pede confirmacao
        U-->>S: aprova ou ajusta
    end
    S->>J: aplica enriquecimento no ep alvo (citacoes verbatim em quote block, hipoteses externas marcadas separadamente)
    S->>J: scripts/source-add.py --type external (registra rescue + bumpa last_review)
    S->>J: scripts/validate.sh (audita ao final)
    S-->>U: devolve ep enriquecido + lista de novas lacunas que viraram open-questions
```

## Compilar conhecimento

Quando material maduro em episodios/notas deve virar post de blog em `knowledges/` com voz de agente e co-autoria explicita.

```mermaid
sequenceDiagram
    participant U as Usuario
    participant S as journey-writer
    participant J as .journey/
    U->>S: pede post / compilar conhecimento sobre tema X
    S->>J: le eps e notas em compiled_from candidatos
    S->>U: confirma tese, fontes e exposicao (AskUserQuestion se ambiguo)
    U-->>S: valida escopo
    S->>S: aplica pattern-knowledge-authoring (voz redator descolado, 1a pessoa LLM)
    S->>J: cria knowledges/NNN-slug.md com frontmatter + creditos honestos
    S->>J: marca eps fonte com [compilado em: knowledges/NNN-slug]
    S->>J: scripts/validate.sh (refs de episodes/)
    S-->>U: devolve draft para revisao-humana do co-autor
```
