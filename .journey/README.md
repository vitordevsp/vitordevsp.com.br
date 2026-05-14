# .journey

Esta pasta registra a jornada de reconstrucao deste projeto.

Ela nao e documentacao tecnica, changelog, backlog ou fonte de verdade da implementacao.

Ela existe para capturar a travessia: as duvidas, decisoes, viradas, erros, aprendizados e descobertas que aparecem enquanto o projeto nasce com apoio de agentes de IA e SDD.

## Por que esta pasta existe

A reconstrucao deste projeto nao e apenas uma troca de stack ou uma nova versao visual.

Ela tambem e um experimento sobre uma forma diferente de criar software: mais orientada por contexto, especificacoes, agentes, documentacao viva e ciclos de reflexao.

A intencao e transformar esse processo em materia-prima para conteudos futuros sobre SDD, desenvolvimento com IA e construcao de produtos digitais.

## Principio central

Registrar a jornada antes que ela vire retrospectiva.

Quando o aprendizado e documentado so no final, muita coisa importante se perde: duvidas, desvios, erros, motivos reais das decisoes e pequenas descobertas que formam o metodo.

## Como usar

Agentes podem contribuir com esta pasta sempre que uma conversa, decisao ou execucao revelar algo relevante para a narrativa da jornada.

Cada contribuicao deve tentar responder:

- O que aconteceu?
- Por que isso importa?
- Qual tensao apareceu?
- Que decisao ou aprendizado surgiu?
- Como isso se conecta com SDD?
- Que conteudo publico pode nascer daqui?

Use a skill `journey-writer` em `.claude/skills/journey-writer/` para classificar insumos e registrar com tom autoral consistente.

## Porta de entrada

Para quem chega aqui pela primeira vez, ler nesta ordem:

1. [`episodes/001-introducao.md`](./episodes/001-introducao.md) — capa narrativa explicando o que e o projeto e a solucao que ele entrega;
2. [`hero.md`](./hero.md) — arco do protagonista (mundo comum, incomodo, chamado, transformacao, oferta);
3. [`timeline.md`](./timeline.md) — marcos cronologicos com link para episodios;
4. episodios cronologicos (002 a 009) ou meta (004) conforme interesse.

## Estrutura

```text
.journey/
  README.md
  hero.md                Arco da jornada do protagonista
  timeline.md            Marcos cronologicos com refs aos episodios
  open-questions.md      Lacunas com tag de origem por pergunta
  episodes/
    001-introducao.md
    002-v1-e-v2-anos-de-aprendizado-base.md
    003-v3-e-v3.1-sass-bem-e-notion-continua.md
    004-reset-total-como-marca.md           (meta)
    005-v32-nasce-com-sdd-desde-primeira-linha.md
    006-docs-de-categorizado-pra-flat.md
    007-skills-trazidas-do-agents-studio.md
    008-dez-plans-em-draft.md
    009-criacao-do-fluxo-journey.md         (boilerplate, popular por ultimo)
  seeds/
    content-seeds.md     Sementes de conteudo publico futuro
  notes/
    raw-insights.md      Fragmentos brutos, alguns ja promovidos para eps
```

Episodios comecam em `001`. Template copiavel vive na skill em [`.claude/skills/journey-writer/assets/template-episode.md`](../.claude/skills/journey-writer/assets/template-episode.md), nao em `episodes/`.

Ver tambem: [`../CHANGELOG.md`](../CHANGELOG.md) — visao completa do repositorio (5 anos, 3 versoes maiores, 2 resets totais), serve como insumo para refinacao narrativa.

## Frontmatter dos episodios

Cada episodio carrega frontmatter padronizado (spec completo em [`.claude/skills/journey-writer/assets/template-episode.md`](../.claude/skills/journey-writer/assets/template-episode.md)). Campos chave:

- `status`: `draft`, `refinando`, `refinado`, `publicado`;
- `type`: `introducao`, `cronologico`, `meta`, `retrospectiva`;
- `era`: `atemporal`, `v1`, `v2`, `v1-v2`, `v3`, `v3.1`, `v3.2`;
- `metadata.sources`: lista de sessoes JSONL ja consultadas, commits, files, branches e `last_review`. Mecanismo de controle pra `journey-writer` saber o que ja foi lido em rodadas anteriores e nao reler conversas inteiras toda vez.

## O que registrar

- incomodos e motivacoes;
- decisoes importantes;
- mudancas de direcao;
- falhas e ajustes no uso de agentes;
- aprendizados sobre SDD;
- padroes que comecam a se repetir;
- ideias de conteudo;
- perguntas que ainda precisam ser respondidas.

## O que evitar

- documentacao tecnica detalhada;
- changelog de implementacao;
- decisoes sem contexto;
- marketing artificial;
- texto generico;
- narrativa inventada;
- detalhes sensiveis do projeto.

## Separacao com docs/ e .claude/

- `docs/` guarda decisao normativa para implementacao (PRD, arquitetura, ADRs, content model, styling, agents);
- `.claude/` guarda contrato operacional para agentes (skills, plans, tasks, tools.yaml);
- `.journey/` guarda a travessia: tensao, decisao, virada, aprendizado, semente de conteudo.

Quando o material couber em mais de uma camada, escolha pela funcao predominante.

## Destino futuro

Partes desta pasta podem virar:

- posts no jardim digital;
- serie sobre reconstrucao do site;
- roteiro de videos;
- aulas de um curso de SDD;
- estudos de caso;
- lead magnets;
- materiais de comunidade.

Esta pasta e o bastidor antes do palco.
