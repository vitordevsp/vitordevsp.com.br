---
title: Template de prompt para resgate em LLM externo
description: Base parametrizada para gerar prompt copiavel que o usuario leva para ChatGPT, Claude.ai, Gemini ou outro LLM externo. Resposta volta em formato estruturado pra absorcao facil em episodios .journey/.
metadata:
  author: agents-studio
  last_updated: 2026-05-13 21:45
  version: "1.0.0"
---

# Template de prompt para resgate em LLM externo

Skill gera prompt preenchido a partir das variaveis abaixo. Usuario copia, cola no LLM externo, recebe resposta estruturada, cola de volta. Resposta entra como insumo de `absorver-resgate-externo`.

## Variaveis a preencher

Ler antes de gerar:
- `{PROJECT_NAME}` — nome do projeto (default: nome da raiz do repositorio)
- `{PROJECT_SUMMARY}` — 2-4 paragrafos curtos. Fonte: `CLAUDE.md` + `docs/README.md` + `.journey/hero.md` (Mundo comum + Incomodo inicial). Resumir sem expor detalhe sensivel.
- `{ASSUNTO}` — input do usuario, frase curta descrevendo o tema do resgate
- `{EPISODIO_ALVO}` — opcional, slug do ep que vai receber o material (`002-v1-e-v2-...`, etc)
- `{ERA}` — periodo do assunto (`v1`, `v2`, `v3`, `v3.1`, `v3.2`, `atemporal`)
- `{NIVEL_EXPOSICAO}` — `privado`, `semi-publico` ou `publico`. Default: `privado` (resposta nao vai sair do `.journey/` sem revisao)
- `{ANGULO_DESEJADO}` — opcional, ex: "motivacao concreta", "viradas tecnicas", "decisoes esquecidas", "citacoes que voce lembra"
- `{LACUNAS_CONHECIDAS}` — opcional, lista de perguntas em aberto ja registradas no `.journey/` que querem ser fechadas

## Prompt gerado (saida copiavel)

````md
# Resgate de memoria para o projeto {PROJECT_NAME}

Voce e meu parceiro de resgate de memoria. Eu mantenho uma pasta `.journey/` no meu projeto, separada de docs tecnicas, onde registro a travessia do projeto: tensoes, decisoes, viradas, aprendizados. Quero enriquecer um registro existente com memorias que so eu tenho — voce vai me ajudar a estruturar essas memorias antes de eu colar de volta no meu agente local.

## Contexto do projeto

{PROJECT_SUMMARY}

## O que eu quero resgatar

**Assunto:** {ASSUNTO}

**Periodo / era:** {ERA}

**Episodio alvo:** {EPISODIO_ALVO}

**Angulo desejado:** {ANGULO_DESEJADO}

**Nivel de exposicao desta resposta:** {NIVEL_EXPOSICAO}

## Lacunas conhecidas (perguntas que eu ja queria fechar)

{LACUNAS_CONHECIDAS}

## O que eu preciso de voce

1. Me faca **5 a 8 perguntas curtas** que ajudem a destravar memorias sobre o assunto acima. Foco em: motivacao concreta, momento exato em que algo mudou, decisoes que pareceram pequenas mas viraram importantes, frustracoes especificas com ferramentas ou agentes, frases que voce me ouviria dizer na epoca.
2. Quando eu responder, **organize minhas respostas no formato estruturado abaixo**. Nao parafraseie em excesso — preserve minhas palavras quando elas forem boas.
3. Marque o que e fato lembrado vs interpretacao sua. Se algo soar inventado por mim, me avise.

## Formato estruturado da resposta final

Depois das perguntas e das minhas respostas, devolva **um unico bloco markdown** neste formato, pronto pra eu colar no meu agente local:

```md
## Resgate sobre: {ASSUNTO}

### Fatos objetivos lembrados

- ...

### Motivacoes e contexto

- ...

### Decisoes e viradas

- ...

### Citacoes verbatim que o usuario lembrou

> "..."

### Detalhes concretos (numeros, datas, nomes)

- ...

### Hipoteses suas (separadas de fatos)

> Hipotese externa: ...

### Lacunas que persistem (precisam de mais investigacao)

- [ ] ...

### Sugestoes de gancho narrativo

- ...

### Possivel conteudo publico que pode nascer disso

- formato sugerido:
- promessa:
- publico:
```

## Restricoes obrigatorias

- **nao invente fatos.** Se eu nao mencionar algo, nao adicione. Se sentir falta, transforme em pergunta;
- **nao parafraseie demais** — citacoes verbatim sao mais valiosas que reescritas elegantes;
- **nao adicione marketing, hype ou tom motivacional.** Tom: reflexivo, direto, autoral, ligeiramente provocativo quando fizer sentido;
- **separe fato de interpretacao** — minhas memorias vao em "Fatos objetivos lembrados" ou "Decisoes e viradas"; suas leituras vao em "Hipoteses suas";
- **portugues brasileiro** sem acentuacao excessiva (seguir o estilo neutro);
- **respeite o nivel de exposicao `{NIVEL_EXPOSICAO}`** — se `privado`, pode incluir detalhes sensiveis; se `publico`, evite expor terceiros sem consentimento;
- **nao reescreva o que eu ja registrei na `.journey/`** — voce esta gerando material complementar, nao substituto.

Pronto. Pode comecar fazendo as 5-8 perguntas.
````

## Regras de geracao

Skill `journey-writer` ao executar `gerar-prompt-externo`:

1. **carrega contexto do projeto** a partir de `CLAUDE.md`, `docs/README.md`, `.journey/hero.md` (Mundo comum + Incomodo inicial), `.journey/episodes/001-introducao.md` se existir. Resume em 2-4 paragrafos curtos sem expor secrets;
2. **interpreta a linha do usuario** (ex: `gerar prompt sobre reset v3.2`) extraindo `{ASSUNTO}`;
3. **opcionalmente cruza com episodios existentes** para preencher `{ERA}` e `{EPISODIO_ALVO}`. Se ambiguidade, perguntar via AskUserQuestion;
4. **busca em `open-questions.md`** perguntas com `[origem: ep-NNN]` que casem com `{ASSUNTO}` ou `{EPISODIO_ALVO}` para preencher `{LACUNAS_CONHECIDAS}`;
5. **preenche template** e devolve **bloco fechado em ```` ```md ```` para o usuario copiar de uma vez**;
6. avisa o usuario que ao colar a resposta de volta, use `absorver-resgate-externo`.

## Antipadroes na geracao do prompt

- enviar contexto sensivel do projeto sem revisar (segredos, dados de terceiros);
- preencher `{LACUNAS_CONHECIDAS}` com toda a `open-questions.md` (poluicao). Selecionar so as 3-6 mais relevantes ao assunto;
- gerar prompt aberto demais — quanto mais especifico o assunto, melhor a resposta;
- esquecer de pedir formato estruturado de saida. Sem isso, absorcao vira reescrita.
