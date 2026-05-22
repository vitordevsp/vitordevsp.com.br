---

title: EP-009 - Criacao do fluxo .journey/
status: refinando
type: cronologico
metadata:
  owner: journey-writer
  created_at: 2026-05-13 19:30
  updated_at: 2026-05-16 14:00
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
    index: sources/INDEX.md
    package: episode-package/1.0
    last_review: 2026-05-16 14:00
    counts:
      conversations: 3
      commits: 1
      files: 5
  external: 0

---

# EP-009 — Criacao do fluxo `.journey/`

Fontes detalhadas: `[sources/INDEX.md](./sources/INDEX.md)` (digests por conversa em `sources/conversations/`).

## Gancho

A ultima peca da serie era a propria peca que estava sendo escrita. EP-009 ficou em boilerplate enquanto o fluxo `journey-writer` ainda estava se descobrindo. Quando o fluxo amadureceu — quatro versoes da skill em duas datas, sete scripts deterministas, tres sessoes de uso real — sobrou popular este episodio. O material veio do proprio uso.

## Contexto

Em **2026-05-13**, a skill `journey-writer` nasceu via `ast-skill-writer` (commit `eac92f5`). No mesmo dia, a estrutura `.journey/` foi aplicada pela primeira vez no projeto. Nove episodios cronologicos foram planejados, mas EP-009 foi deixado em boilerplate por decisao explicita do usuario:

> "vai ser sobre a criacao desse fluxo de journey, mas nao precisa popular o arquivo ainda, só cria ele com o boilerplate pra fazermos isso como o ultimo passo."

(via [digest 14342648](./sources/conversations/14342648-claude-code.md))

Entre **2026-05-13 e 2026-05-14**, a skill atravessou quatro versoes:


| Data       | Versao  | Marco                                                                                                                                                                                                                                       |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-05-13 | `1.0.0` | Bootstrap: 5 acoes (`inicializar`, `analisar-insumo`, `registrar`, `refinar`, `colher-conteudo`), 5 templates copiaveis.                                                                                                                    |
| 2026-05-13 | `1.1.0` | Endurecimento via primeira aplicacao real: 3 acoes novas (`enriquecer`, `reorganizar`, `validar`), frontmatter como contrato, mecanismo `metadata.sources` anti-retrabalho, 2 patterns novos (extracao de fontes + renumeracao topologica). |
| 2026-05-13 | `1.2.0` | Resgate em LLM externo: 2 acoes novas (`gerar-prompt-externo`, `absorver-resgate-externo`), novo asset `template-external-rescue-prompt.md`.                                                                                                |
| 2026-05-14 | `1.3.0` | Camada de scripts deterministas: 7 scripts em `scripts/`, novo pattern `pattern-scripts.md`.                                                                                                                                                |


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

**3. `metadata.sources` como mecanismo anti-retrabalho** (evoluiu para pacote com `sources/INDEX` + digests em 2.0.0). Pedido textual do usuario na sessao 14342648 — ver [digest](./sources/conversations/14342648-claude-code.md).

Aprendizado vivido: rascunho generico criado antes de buscar historico real **sempre era reescrito depois**. Passo zero virou obrigatorio — buscar fontes (sessoes, git log, CHANGELOG) antes de qualquer escrita substancial.

**4. Camada de scripts deterministas** (1.3.0, 2026-05-14). Pedido do usuario documentado no mesmo digest 14342648.

A separacao ficou: **parte mecanica determinista vira script; interpretacao narrativa fica com o agente.** Resultado:


| Script                    | Substitui                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `validate.sh`             | acao `validar` inteira (refs orfas, frontmatter, last_review, title vs filename)            |
| `extract-sessions.sh`     | sequencia `jq + for + grep` para listar sessoes JSONL com 6 perguntas interativas de escopo |
| `extract-conversation.sh` | `jq` manual para extrair conversa intercalando USER + ASSISTANT                             |
| `reorganize.py`           | sequencia `mv + Read + Edit + grep` da acao `reorganizar` (~12 ferramentas viram 1 chamada) |
| `gen-rescue-prompt.py`    | montagem manual do prompt em `gerar-prompt-externo`                                         |
| `episode-status-map.py`   | regeneracao manual da tabela "Mapa rapido" em `timeline.md`                                 |
| `source-add.py`           | registro de fonte (legado flat; pacotes usam digests)                                       |


Duas obs do usuario sobre os scripts viraram decisoes de design (digest [08c8d64a](./sources/conversations/08c8d64a-claude-code.md)).

## Aprendizado

- **Camada narrativa nao e luxo, e infra de continuidade entre humano e agente.** Sem `.journey/`, cada nova sessao reabriria o passado. Com pacote de fontes, agente le digests condensados em vez de JSONL inteiro.
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

- **Quando este episodio vai ser populado de verdade?** Resolvido em 2026-05-14, apos a entrega de `1.3.0`. Marco simbolico do fechamento do ciclo de criacao do fluxo.
- **O fluxo `.journey/` precisa de scripts proprios?** Sim. Resolvido em `1.3.0` com 7 scripts.
- **Os episodios publicos no jardim digital vao apontar para os arquivos brutos em `.journey/`, ou vao tratar `.journey/` como bastidor privado?** Decisao pendente.
- **Qual o primeiro projeto do Vitor que vai receber `.journey/` apos esse?** Pendente.
- **Quando promover scripts de PyYAML para `ruamel.yaml`?** Quando preservacao de formato/comentarios virar problema real, nao agora.
- **Migrar eps 001–008 para pacote com digests?** Pendente — incremental ao refinar cada ep.

## Fragmentos aproveitaveis

> "vai ser sobre a criacao desse fluxo de journey, mas nao precisa popular o arquivo ainda, só cria ele com o boilerplate pra fazermos isso como o ultimo passo." — usuario, sessao 14342648.

> "Precisamos controlar de alguma forma as conversas que já foram checadas pra nao precisar olhar pra msm conversa sempre que for rodar a skill journey-writer." — usuario, sessao 14342648.

> "Avaliar se alguma acao da skill pode virar um script para ajudar no fluxo deixando ele mais assertivo, mais rapido e barato de executar." — usuario, sessao 14342648.

> "o texto do llm é tao importante quanto o texto do usuario, a ideia é analisar como se fosse uma conversa entre duas pessoas, fazendo um pair-progamming." — usuario, sessao 08c8d64a.

> Hipotese editorial: cada ciclo da skill — bootstrap (1.0.0), aplicacao (1.1.0), resgate (1.2.0), scripts (1.3.0) — corresponde a uma camada da jornada do heroi aplicada a SDD: chamado, atrito, descoberta, metodo. EP-009 fecha o ciclo de "metodo".

## Commits relacionados

Detalhe em `[sources/artifacts/commits.md](./sources/artifacts/commits.md)`.