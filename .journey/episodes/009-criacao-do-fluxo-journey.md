---
title: EP-009 - Criacao do fluxo .journey/
status: refinando
type: cronologico
metadata:
  owner: journey-writer
  created_at: 2026-05-13 19:30
  updated_at: 2026-05-14 03:50
  tags:
    - episode
    - cronologico
    - journey
    - meta-narrativa
    - sdd
    - skill
    - scripts
  era: v3.2
  lentes:
    - metodo
    - descoberta
    - oferta
    - transformacao
  sources:
    sessions:
      - id: 7636668b-af70-4eb3-950b-84082727c9cc
        date: 2026-05-13
        relevance: primary
        summary: criacao da skill journey-writer via ast-skill-writer; decisao de nao usar prefixo app-
      - id: 14342648-dd84-4be8-90d5-80f28f1587ed
        date: 2026-05-13
        relevance: primary
        summary: aplicacao da skill - estrutura .journey/ inicial, pivô para CHANGELOG como insumo, reorganizacao cronologica, enriquecimento, bumps 1.1.0 e 1.2.0
      - id: 08c8d64a-971d-46d0-87a3-71e338e9849a
        date: 2026-05-14
        relevance: primary
        summary: resgate de contexto da sessao 14342648 + criacao da camada de scripts (1.3.0) com 7 scripts deterministas
    commits:
      - eac92f5
    files:
      - .claude/skills/journey-writer/
      - .claude/skills/journey-writer/scripts/
      - .claude/skills/journey-writer/references/pattern-scripts.md
      - .journey/
      - CHANGELOG.md
    last_review: 2026-05-14 03:50
---

# EP-009 — Criacao do fluxo `.journey/`

## Gancho

A ultima peca da serie era a propria peca que estava sendo escrita. EP-009 ficou em boilerplate enquanto o fluxo `journey-writer` ainda estava se descobrindo. Quando o fluxo amadureceu — quatro versoes da skill em duas datas, sete scripts deterministas, tres sessoes de uso real — sobrou popular este episodio. O material veio do proprio uso.

## Contexto

Em **2026-05-13**, a skill `journey-writer` nasceu via `ast-skill-writer` (commit `eac92f5`). No mesmo dia, a estrutura `.journey/` foi aplicada pela primeira vez no projeto. Nove episodios cronologicos foram planejados, mas EP-009 foi deixado em boilerplate por decisao explicita do usuario:

> "vai ser sobre a criacao desse fluxo de journey, mas nao precisa popular o arquivo ainda, só cria ele com o boilerplate pra fazermos isso como o ultimo passo."

Entre **2026-05-13 e 2026-05-14**, a skill atravessou quatro versoes:

| Data | Versao | Marco |
|---|---|---|
| 2026-05-13 | `1.0.0` | Bootstrap: 5 acoes (`inicializar`, `analisar-insumo`, `registrar`, `refinar`, `colher-conteudo`), 5 templates copiaveis. |
| 2026-05-13 | `1.1.0` | Endurecimento via primeira aplicacao real: 3 acoes novas (`enriquecer`, `reorganizar`, `validar`), frontmatter como contrato, mecanismo `metadata.sources` anti-retrabalho, 2 patterns novos (extracao de fontes + renumeracao topologica). |
| 2026-05-13 | `1.2.0` | Resgate em LLM externo: 2 acoes novas (`gerar-prompt-externo`, `absorver-resgate-externo`), novo asset `template-external-rescue-prompt.md`. |
| 2026-05-14 | `1.3.0` | Camada de scripts deterministas: 7 scripts em `scripts/`, novo pattern `pattern-scripts.md`. |

Cada bump nasceu de uma friccao especifica vivida na propria aplicacao da skill — nao de um roadmap pre-definido.

## Conflito

Quatro tensoes apareceram, na ordem em que pesaram:

1. **Registrar em tempo real vs documentar depois.** Documentacao tradicional (`docs/`) e retrospectiva (`/post-mortem`) sao escritas depois que tudo aconteceu. `.journey/` precisava capturar a travessia *enquanto* ela acontecia, sem virar checklist.
2. **Camada virar overhead.** Mais um lugar pra manter, mais um diretorio pra esquecer. Risco real: virar pasta abandonada com 3 arquivos rascunhados em dois meses.
3. **Diferenciar de changelog ou retrospectiva agil.** Changelog conta o *o que*; retrospectiva conta o *o que aprendemos como time*. `.journey/` precisava contar o *como o autor atravessou*, sem virar diario nem manual.
4. **Custo de re-leitura para o agente.** Cada rodada de refinacao reabria sessoes inteiras. Em sessao com 1061 linhas e 3.8MB de JSONL (caso real da sessao `14342648`), reler tudo a cada toque era caro em tokens e devagar.

## Virada

Quatro decisoes consecutivas resolveram as tensoes:

**1. Separar tres camadas com fronteiras claras** (no mesmo commit `eac92f5`):
- `docs/` — documentacao humana, normativa, funcional;
- `.claude/` — camada operacional para agentes (skills, plans, tasks);
- `.journey/` — narrativa autoral da travessia, separada das outras duas.

**2. Frontmatter como contrato** (1.1.0). Episodios viraram artefatos vivos com `status: draft -> refinando -> refinado -> publicado`, `type: introducao | cronologico | meta | retrospectiva`, `metadata.era`, `metadata.lentes`. Frontmatter inspirado em task da camada `.claude/`.

**3. `metadata.sources` como mecanismo anti-retrabalho.** A skill passou a registrar em cada ep quais sessoes JSONL, commits, files e branches ja foram consultados. Pedido textual do usuario na sessao 14342648:

> "Precisamos controlar de alguma forma as conversas que já foram checadas pra nao precisar olhar pra msm conversa sempre que for rodar a skill journey-writer."

Aprendizado vivido: rascunho generico criado antes de buscar historico real **sempre era reescrito depois**. Passo zero virou obrigatorio — buscar fontes (sessoes, git log, CHANGELOG) antes de qualquer escrita substancial.

**4. Camada de scripts deterministas** (1.3.0, 2026-05-14). Pedido do usuario no final da sessao 14342648:

> "Avaliar se alguma acao da skill pode virar um script para ajudar no fluxo deixando ele mais assertivo, mais rapido e barato de executar."

A separacao ficou: **parte mecanica determinista vira script; interpretacao narrativa fica com o agente.** Resultado:

| Script | Substitui |
|---|---|
| `validate.sh` | acao `validar` inteira (refs orfas, frontmatter, last_review, title vs filename) |
| `extract-sessions.sh` | sequencia `jq + for + grep` para listar sessoes JSONL com 6 perguntas interativas de escopo |
| `extract-conversation.sh` | `jq` manual para extrair conversa intercalando USER + ASSISTANT |
| `reorganize.py` | sequencia `mv + Read + Edit + grep` da acao `reorganizar` (~12 ferramentas viram 1 chamada) |
| `gen-rescue-prompt.py` | montagem manual do prompt em `gerar-prompt-externo` |
| `episode-status-map.py` | regeneracao manual da tabela "Mapa rapido" em `timeline.md` |
| `source-add.py` | `Read + Edit` so para registrar fonte em `metadata.sources` |

Duas obs do usuario sobre os scripts viraram decisoes de design:

- **`extract-sessions.sh` ganhou modo interativo com 6 perguntas** (periodo, branches, tamanho minimo, sessoes vazias, ordenacao, formato), porque escopo de extracao tem impacto grande no resultado. Pedido textual:

  > "scripts/extract-sessions.sh nao deve focar só na branch atual, o ideial é ele perguntar para o usuario qual o periodo que a skill deve contemplar, coloque um passo com pelo menos 5 perguntas antes de executar a skill pra garantir que nao vai ter lacunas em aberto."

- **`extract-user-text.sh` foi renomeado para `extract-conversation.sh`** e passou a intercalar USER + ASSISTANT. Pedido textual:

  > "scripts/extract-user-text.sh <session-id> o texto do llm é tao importante quanto o texto do usuario, a ideia é analisar como se fosse uma conversa entre duas pessoas, fazendo um pair-progamming."

## Aprendizado

- **Camada narrativa nao e luxo, e infra de continuidade entre humano e agente.** Sem `.journey/`, cada nova sessao reabriria o passado. Com `.journey/` + `metadata.sources`, agente sabe o que ja foi consultado e foca em material novo.
- **Registrar antes que vire retrospectiva muda a qualidade do material.** Quotes verbatim, datas exatas, numeros concretos so existem se forem capturados perto do acontecimento. Refinar depois preserva a textura.
- **Skill propria como prova de framework.** `journey-writer` nasceu, evoluiu por quatro versoes e ganhou scripts em duas datas — todas as mudancas vieram de friccao real, nenhuma de roadmap especulativo. Versionamento leve (`patch/minor/major`) deu disciplina sem peso.
- **Separar mecanico de narrativo libera atencao.** Scripts em `1.3.0` nao reduzem o juizo editorial — eliminam re-leitura, re-execucao de operacoes ja conhecidas e a classe de erro silencioso (refs orfas, mv em ordem errada, frontmatter incompleto). Agente fica livre pra interpretar.
- **Pair-programming nao e monologo.** A versao inicial do extrator de conversa pegava so texto do usuario. Pegar tambem o texto do assistant transformou a leitura — diagnosticos, decisoes, propostas e raciocinio do agente sao tao valiosos quanto o input do humano.

## Possivel conteudo publico

- **Formato sugerido:** post longo (capa do jardim digital).
- **Titulo possivel:** "Como registrar a travessia antes que vire retrospectiva".
- **Promessa:** mostrar uma estrutura mantida em tempo real (`.journey/`) que substitui o changelog tecnico e a retrospectiva agil quando o produto e autoral.
- **Publico:** devs que criam projetos pessoais autorais, autores tecnicos, criadores de conteudo de processo.

Outros formatos derivados:

- **lead magnet:** estrutura `.journey/` + skill `journey-writer` empacotada como template replicavel para qualquer projeto Claude Code.
- **aula em curso de SDD:** "memoria do processo como ativo" — usar este ep como caso real.
- **thread tecnica:** sete scripts em uma rodada, separando mecanico de narrativo, com numeros de tokens economizados.

## Perguntas abertas

- [x] **Quando este episodio vai ser populado de verdade?** Resolvido em 2026-05-14, apos a entrega de `1.3.0`. Marco simbolico do fechamento do ciclo de criacao do fluxo.
- [x] **O fluxo `.journey/` precisa de scripts proprios?** Sim. Resolvido em `1.3.0` com 7 scripts (`validate.sh`, `extract-sessions.sh`, `extract-conversation.sh`, `reorganize.py`, `gen-rescue-prompt.py`, `episode-status-map.py`, `source-add.py`).
- [ ] **Os episodios publicos no jardim digital vao apontar para os arquivos brutos em `.journey/`, ou vao tratar `.journey/` como bastidor privado?** Decisao pendente. Provavel: jardim aponta para versoes editadas (formato publico), com link opcional para o ep cru.
- [ ] **Qual o primeiro projeto do Vitor que vai receber `.journey/` apos esse?** Pendente. Candidato natural: o proximo projeto autoral apos a v3.2 entrar em ar.
- [ ] **Quando promover scripts de PyYAML para `ruamel.yaml`?** Quando preservacao de formato/comentarios virar problema real, nao agora.

## Fragmentos aproveitaveis

> "vai ser sobre a criacao desse fluxo de journey, mas nao precisa popular o arquivo ainda, só cria ele com o boilerplate pra fazermos isso como o ultimo passo." — usuario, sessao 14342648 (origem desta meta-narrativa).

> "Precisamos controlar de alguma forma as conversas que já foram checadas pra nao precisar olhar pra msm conversa sempre que for rodar a skill journey-writer." — usuario, sessao 14342648 (origem do mecanismo `metadata.sources`).

> "Avaliar se alguma acao da skill pode virar um script para ajudar no fluxo deixando ele mais assertivo, mais rapido e barato de executar." — usuario, sessao 14342648 (origem da 1.3.0).

> "o texto do llm é tao importante quanto o texto do usuario, a ideia é analisar como se fosse uma conversa entre duas pessoas, fazendo um pair-progamming." — usuario, sessao 08c8d64a (origem do `extract-conversation.sh` cobrindo USER+ASSISTANT).

> Hipotese editorial: cada ciclo da skill — bootstrap (1.0.0), aplicacao (1.1.0), resgate (1.2.0), scripts (1.3.0) — corresponde a uma camada da jornada do heroi aplicada a SDD: chamado, atrito, descoberta, metodo. EP-009 fecha o ciclo de "metodo".

## Commits relacionados

- `eac92f5` (2026-05-13): `chore(.claude): adiciona skill journey-writer`.
- _proximo commit_ (2026-05-14): bump da skill para `1.3.0` + 7 scripts + `pattern-scripts.md` + populacao deste ep — pendente.
