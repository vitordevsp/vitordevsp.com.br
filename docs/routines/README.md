# Routines do projeto

Esta pasta concentra rotinas do repositório.

Ela existe para registrar momentos operacionais específicos do ciclo de trabalho que precisam de uma ordem clara de checagem, mas que não se comportam exatamente como `skills` amplas de execução.

## Papel desta pasta

- `docs/patterns/` define regra;
- `docs/skills/` define fluxos recorrentes de execucao;
- `docs/routines/` define rituais operacionais situacionais, geralmente perto de fechamento, transicao ou validacao;
- `docs/agents/` define papeis especializados quando houver julgamento proprio.

Em resumo:

- `skill` ajuda a executar;
- `routine` ajuda a fechar, revisar ou passar por um momento especifico do ciclo.

## Quando usar uma routine

Criar uma routine quando:

- o fluxo acontecer em um momento muito especifico do trabalho;
- a ordem de checagem for importante;
- o valor estiver mais no ritual de passagem do que na capacidade de construir algo novo;
- o fluxo servir de apoio a uma skill maior, como `build-commit`.

Nao criar routine quando:

- o caso for melhor descrito como skill de execucao ampla;
- o assunto for apenas regra ou convencao, sem sequencia operacional;
- a verificacao for pontual demais para merecer artefato proprio.

## Estrutura recomendada

Cada rotina deve morar em uma pasta propria:

- `docs/routines/<nome-da-routine>/ROUTINE.md`

Isso preserva espaco para anexar exemplos, checklists auxiliares ou referencias locais no futuro.

## Boilerplate recomendado

```markdown
---
name: nome-da-routine
description: Explicar que momento do ciclo esta rotina cobre e por que ela existe.
trigger: descrever quando esta rotina costuma ser acionada
last_updated: AAAA-MM-DD HH:MM
---

# Nome da Routine

## Quando usar

- ...

## Leitura obrigatoria

1. ...
2. ...

## Entradas

- ...

## Sequencia recomendada

1. ...
2. ...
3. ...

## O que esta rotina deve verificar

- ...

## Saida esperada

1. ...
2. ...

## O que esta rotina nao deve fazer

- ...
```

## Regra de metadata

Toda routine deve manter no frontmatter:

- `name`
- `description`
- `trigger`
- `last_updated`

O campo `last_updated` deve usar `AAAA-MM-DD HH:MM`.

## Regra de README por ferramenta

Toda routine em pasta propria deve manter tambem um `README.md` curto na mesma pasta com:

- explicacao breve do papel da ferramenta;
- conhecimento util consolidado;
- log de evolucao da propria ferramenta.

Isso ajuda a manter a camada de rotinas navegavel e compreensivel mesmo fora do arquivo principal da routine.

## Rotinas atuais

### [close-implementation](./close-implementation/ROUTINE.md)

Rotina de fechamento tecnico e documental antes de considerar um recorte pronto para commit ou encerramento de execucao.

### [finalize-changelog](./finalize-changelog/ROUTINE.md)

Rotina para revisar e fechar `CHANGELOG.md` antes de release, merge ou publicação.

### [pre-release](./pre-release/ROUTINE.md)

Rotina para revisar changelog, versão, planos concluídos e riscos antes de publicar, taguear ou comunicar uma release.
