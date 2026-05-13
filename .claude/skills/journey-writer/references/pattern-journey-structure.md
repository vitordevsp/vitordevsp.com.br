---
title: Pattern de estrutura da pasta .journey/
description: Define o papel de cada arquivo em `.journey/`, comportamento na criacao e atualizacao, e separacao com `docs/` e `.claude/`.
metadata:
  author: agents-studio
  last_updated: 2026-05-13 00:00
  version: "1.0.0"
---

# Pattern de estrutura da pasta .journey/

## Objetivo

Manter `.journey/` como camada narrativa independente, com papel claro por arquivo e sem sobreposicao com `docs/` ou `.claude/`.

## Localizacao

`.journey/` fica na raiz do projeto, no mesmo nivel de `docs/` e `.claude/`.

Nao mover para dentro de `docs/`, `.claude/` ou `src/`. A pasta nao e fonte de verdade da implementacao.

## Estrutura recomendada

```text
.journey/
├── README.md
├── hero.md
├── timeline.md
├── open-questions.md
├── episodes/
│   └── 000-template.md
├── seeds/
│   └── content-seeds.md
└── notes/
    └── raw-insights.md
```

## Papel de cada arquivo

### `README.md`

Explica proposito da pasta, principios editoriais, convencoes narrativas e como agentes contribuem. Base copiavel em [`../assets/template-journey-readme.md`](../assets/template-journey-readme.md).

### `hero.md`

Define o arco narrativo principal: protagonista, mundo comum, incomodo inicial, chamado, resistencias, mentores e ferramentas, provacoes, metodo emergente, transformacao, elixir, oferta futura. Base em [`../assets/template-hero-arc.md`](../assets/template-hero-arc.md).

Atualize quando a identidade do protagonista, o incomodo inicial ou a transformacao em curso evoluirem.

### `timeline.md`

Registro cronologico dos marcos da jornada. Nao e changelog tecnico. Cada marco captura: o que aconteceu, por que importou, tensao ou decisao, aprendizado, possivel conteudo. Entrada copiavel em [`../assets/template-timeline-entry.md`](../assets/template-timeline-entry.md).

Marcos seguem ordem cronologica decrescente ou crescente, consistente com o que ja existir no arquivo.

### `open-questions.md`

Perguntas abertas que precisam ser respondidas para fortalecer a narrativa, a oferta futura ou o metodo. Uma pergunta por bullet, com contexto curto e marcador `- [ ]`.

### `episodes/`

Registros narrativos por episodio. Nomenclatura `NNN-titulo-em-kebab.md` com numeracao incremental zero-pad. Cada episodio deve poder virar post, video, aula curta, thread, newsletter, roteiro de bastidor ou estudo de caso. Base em [`../assets/template-episode.md`](../assets/template-episode.md).

`000-template.md` permanece como referencia copiavel inicial e nao deve ser usado como episodio real.

### `seeds/content-seeds.md`

Banco de ideias reaproveitaveis. Cada semente declara origem, tese, formatos possiveis, relacao com SDD e maturidade (`bruta`, `promissora`, `pronta para roteiro`, `pronta para publicar`). Base em [`../assets/template-content-seed.md`](../assets/template-content-seed.md).

### `notes/raw-insights.md`

Notas menos processadas, insights soltos, frases que ainda nao viraram episodio. Aceita lista cronologica de fragmentos curtos.

## Comportamento na criacao

Quando `.journey/` nao existe:

1. confirmar com o usuario antes de criar;
2. copiar templates de `assets/` para os caminhos definitivos;
3. preencher `hero.md` com rascunho inicial (mesmo incompleto), marcando lacunas;
4. registrar o primeiro marco em `timeline.md`;
5. adicionar perguntas iniciais em `open-questions.md`;
6. deixar `episodes/000-template.md` intocado como referencia;
7. avisar o usuario de que a primeira versao e um mapa inicial, nao a versao definitiva.

## Comportamento na atualizacao

Quando `.journey/` ja existe:

1. ler o arquivo alvo antes de editar;
2. preservar estilo, tom e ordem ja estabelecidos;
3. evitar duplicacao com registros anteriores;
4. acrescentar de forma incremental, sem sobrescrever blocos consolidados;
5. manter datas em `AAAA-MM-DD` e titulos consistentes;
6. nao deletar nada sem confirmacao explicita.

## Separacao com docs/ e .claude/

- `docs/` permanece com documentacao tecnica humana (PRD, arquitetura, ADRs, content model, styling, agents);
- `.claude/` permanece com camada operacional para agentes (skills, plans, tasks, tools.yaml);
- `.journey/` registra a travessia: tensao, decisao, virada, aprendizado, conteudo potencial.

Quando o material couber em mais de uma camada, escolha pela funcao predominante:

- decisao normativa para implementacao -> `docs/`;
- contrato operacional para agente -> `.claude/`;
- narrativa, tensao, aprendizado ou semente de conteudo -> `.journey/`.

## O que nao registrar

- detalhes sensiveis do projeto;
- credenciais, segredos ou tokens;
- texto puramente tecnico sem elemento narrativo;
- decisoes sem contexto;
- narrativa inventada que nao aparece no insumo.
