---
title: Historico de versao da journey-writer
description: Registra a base do framework aplicada a esta skill e as customizacoes locais preservadas ao longo do tempo.
metadata:
  author: agents-studio
  last_updated: 2026-05-16 14:00
  version: "2.0.0"
---

# Historico de versao da journey-writer

## Politica resumida

- todas as skills desta base nascem em `1.0.0`;
- bump `patch` para refino de copy, idioma ou ajustes que nao mudam destino;
- bump `minor` quando uma nova acao, lente, tipo ou pattern for incorporado;
- bump `major` quando o contrato com o usuario mudar de forma incompativel;
- o sufixo `-local` fica reservado para customizacoes locais futuras sobre uma base distribuida do framework;
- toda mudanca relevante deve registrar o que mudou e qual base foi preservada.

## Registro

| Data | Versao | Base do framework | Tipo | Resumo |
|------|------|------|------|------|
| 2026-05-13 | 1.0.0 | 1.0.0 | framework_base | Versao inicial da skill consolidada a partir do insumo em `docs/references/journey-writer.md`. Inclui acoes `inicializar`, `analisar-insumo`, `registrar`, `refinar` e `colher-conteudo`; patterns de autoria e estrutura; fluxos Mermaid por acao; e cinco templates copiaveis para `.journey/` (README, hero, timeline-entry, episode, content-seed). |
| 2026-05-13 | 1.1.0 | 1.1.0 | enrichment_from_session | Endurecimento da skill com aprendizado da primeira aplicacao real (este projeto). Mudancas: (1) **3 acoes novas** — `enriquecer`, `reorganizar`, `validar`; (2) **frontmatter como contrato** em todo episodio com campos `status`, `type` (`introducao`/`cronologico`/`meta`/`retrospectiva`), `era`, `lentes`, `metadata.sources`; (3) **mecanismo `sources` anti-retrabalho** registrando sessoes JSONL, commits, files, branches, derived_from e last_review; (4) **passo zero obrigatorio** de buscar historico (sessoes, git log, CHANGELOG) antes de qualquer escrita substancial; (5) **2 patterns novos** — `pattern-source-extraction.md` (extracao de fontes objetivas) e `pattern-renumeration-safe.md` (renomeacao topologica + validacao); (6) **marcacoes editoriais especiais** (`> Hipotese editorial:`, `[promovido para:]`, `[ainda raw]`, `[origem: ep-NNN]`); (7) **template de episodio removido de `episodes/`** — vive apenas em `assets/template-episode.md` da skill; episodios comecam em `001`; (8) checklist de qualidade ampliado com itens objetivos (cita commit? cita numero? frontmatter completo? refs orfas? last_review bumpado?); (9) workflow de bootstrap com ramificacao por presenca de historico; (10) recomendacao explicita de `AskUserQuestion` estruturada antes de escrita substancial. |
| 2026-05-16 | 2.0.0 | 2.0.0 | breaking_episode_package | Episodios (e knowledges) como **pastas**: `episode.md` + `sources/INDEX.md` + `sources/conversations/{8hex}-{tool}.md` com frontmatter (`tool.id`, `storage.path`, `agent.name`). Patterns `pattern-episode-package`, `pattern-migration-episode-packages`; templates INDEX e conversation-digest; `validate.sh` suporta pacote + aviso flat legado; `source-add.py` resolve pacote/flat; EP-009 migrado como piloto. Listas `sessions` no frontmatter deprecated. |
| 2026-05-16 | 1.4.0 | 1.4.0 | feature_knowledges | Camada `knowledges/` para posts de blog com co-autoria honesta agente + humano. Mudancas: (1) **acao nova** `compilar-conhecimento`; (2) **pattern novo** `pattern-knowledge-authoring.md` — persona de redator descolado em primeira pessoa LLM, bloco de creditos obrigatorio, antipadrao de ghostwriting; (3) **assets novos** `template-knowledge.md`, `template-knowledges-readme.md`; (4) estrutura `.journey/` e bootstrap atualizados; (5) tabela de destino em `pattern-journey-authoring.md`; (6) excecao explicita a "preservar tom autoral do usuario" em knowledges. |
| 2026-05-14 | 1.3.0 | 1.3.0 | feature_scripts | Camada de scripts deterministas em `scripts/` separando operacao mecanica (vira script) de juizo narrativo (fica com agente). Mudancas: (1) **7 scripts novos** — `validate.sh` (substitui acao `validar`), `extract-sessions.sh` (interativo com 6 perguntas: periodo, branches, tamanho, sessoes vazias, ordenacao, formato), `extract-conversation.sh` (intercala USER+ASSISTANT como pair-programming; texto do agente conta igual ao do usuario), `reorganize.py` (renumeracao topologica vacate-then-fill + update refs + validate ao final), `gen-rescue-prompt.py` (renderiza template-external-rescue substituindo variaveis a partir de CLAUDE.md/hero/open-questions), `episode-status-map.py` (regenera "Mapa rapido" em timeline.md), `source-add.py` (append em `metadata.sources` + bump `last_review`); (2) **novo pattern** `pattern-scripts.md` com mapa acao->script, obrigatoriedades, trade-offs e antipadroes; (3) **secao nova "Scripts disponiveis"** em `SKILL.md`; (4) workflow de bootstrap e validacao agora chamam scripts diretamente; (5) **PyYAML como dependencia opcional** (migracao futura para ruamel.yaml). Razao: acao `validar` exigia ~5 ferramentas e re-leitura de arquivos; `reorganizar` exigia ~12 ferramentas. Scripts deterministas eliminam classes de erro (refs orfas perdidas, mv em ordem errada, frontmatter inconsistente) e economizam tokens. Aprendizado vivido: `extract-sessions.sh` ganhou modo interativo por design — escopo de extracao tem impacto grande no resultado; `extract-conversation.sh` foi renomeado de `extract-user-text.sh` para incluir texto do assistant — pair-programming nao e monologo. |
| 2026-05-13 | 1.2.0 | 1.2.0 | feature_external_rescue | Ciclo de resgate em LLM externo (ChatGPT, Claude.ai, Gemini). Mudancas: (1) **2 acoes novas** — `gerar-prompt-externo` (gera prompt copiavel parametrizado a partir de assunto curto) e `absorver-resgate-externo` (cola resposta estruturada do LLM externo de volta no ep alvo); (2) **novo asset** `template-external-rescue-prompt.md` com template parametrizado (`{PROJECT_NAME}`, `{PROJECT_SUMMARY}`, `{ASSUNTO}`, `{ERA}`, `{EPISODIO_ALVO}`, `{NIVEL_EXPOSICAO}`, `{LACUNAS_CONHECIDAS}`); (3) **extensao do schema `metadata.sources`** com campo `external_rescues` (lista de resgates: `llm`, `date`, `assunto`, `exposicao`, `summary`); (4) **2 fluxos Mermaid novos** em `sequence-workflows.md`; (5) **regras de exposicao** — `{PROJECT_SUMMARY}` enviado a LLM externo nunca contem secrets/tokens/dados sensiveis; respostas marcadas `privado` exigem revisao de diff antes de absorver; (6) **secao nova em `pattern-source-extraction.md`** sobre resgate externo como sexta fonte; (7) **antipadroes novos** sobre exposicao indevida e absorcao sem revisao. Caso de uso central: usuario tem memoria que so existe na cabeca dele (ou em conversas com outros LLMs nao versionadas) — ciclo permite trazer essa memoria pra `.journey/` em formato estruturado, com rastreabilidade da origem. |

## Mudancas resumidas por arquivo (1.0.0 -> 1.1.0)

- `SKILL.md` — adicao de 3 acoes, secao "Frontmatter como contrato", secao "Mecanismo sources", secao "Marcacoes editoriais especiais"; workflow expandido com ramificacao bootstrap; antipadroes ampliados.
- `references/pattern-journey-authoring.md` — adicao de principios 6 (material real), 7 (numeros > prosa), 8 (hipoteses marcadas); secao de marcacoes especiais; secao de validacao via AskUserQuestion; checklist ampliado.
- `references/pattern-journey-structure.md` — adicao de tabela de tipos de episodio; secao de frontmatter como contrato; ref a pattern de renumeracao.
- `references/pattern-source-extraction.md` — **arquivo novo**. Como localizar/filtrar/extrair sessoes JSONL via jq; uso de git log + tags + CHANGELOG; instrumentacao de `metadata.sources`; indicadores de qualidade objetivos.
- `references/pattern-renumeration-safe.md` — **arquivo novo**. Procedimento topologico para mv sem colisao; cuidados pos-mv (Read antes de Edit); checklist de refs a atualizar; comandos de validacao.
- `references/sequence-workflows.md` — adicao de 3 fluxos Mermaid (`enriquecer`, `reorganizar`, `validar`) + ramificacao no fluxo `inicializar`.
- `assets/template-episode.md` — reescrito com frontmatter completo (sem `priority`); secao `## Status` removida do corpo; spec de `sources` inline; instrucoes para nao criar `000-template.md` em `episodes/`.

## Mudancas resumidas por arquivo (1.2.0 -> 1.3.0)

- `SKILL.md` — bump versao + secao "Scripts disponiveis" com tabela acao->script + obrigatoriedade; workflow bootstrap aponta para scripts; "Apos qualquer escrita" passa a chamar `validate.sh` e `source-add.py`.
- `scripts/validate.sh` — **arquivo novo**. Bash + jq + grep. Output humano ou `--json`. Exit 0/1.
- `scripts/extract-sessions.sh` — **arquivo novo**. Bash + jq. Modo interativo com 6 perguntas (periodo, branches, tamanho minimo, sessoes vazias, ordenacao, formato) + modo `--non-interactive` para uso headless.
- `scripts/extract-conversation.sh` — **arquivo novo**. Bash + jq. Intercala USER e ASSISTANT (default) com flag `--include-tools` opcional. Suporta `--grep`, `--range`, `--format markdown|plain`.
- `scripts/reorganize.py` — **arquivo novo**. Python + PyYAML. Recebe map YAML (`renames`, `deletes`, `creates`). mv em duas fases (`.tmp__N__` -> destino) + update self-refs + update cross-refs + criar placeholder + `validate.sh` final. `--dry-run`.
- `scripts/gen-rescue-prompt.py` — **arquivo novo**. Python. Le CLAUDE.md, hero.md, docs/README.md para PROJECT_SUMMARY; filtra open-questions por keyword do assunto; renderiza template-external-rescue-prompt.
- `scripts/episode-status-map.py` — **arquivo novo**. Python + PyYAML. Regenera tabela em timeline.md entre marcadores `<!-- BEGIN/END: status-map -->` ou sob `## Mapa rapido de status dos episodios`.
- `scripts/source-add.py` — **arquivo novo**. Python + PyYAML. Append em `metadata.sources` (`session`, `commit`, `file`, `branch`, `external`, `derived`) + bump `last_review`. Aviso de reformatacao do frontmatter por PyYAML.
- `references/pattern-scripts.md` — **arquivo novo**. Mapa acao->script, scripts em detalhe (uso, sintaxe, output), trade-offs (bash vs python, PyYAML vs ruamel), antipadroes, migracao futura.

## Mudancas resumidas por arquivo (1.1.0 -> 1.2.0)

- `SKILL.md` — adicao de 2 acoes (`gerar-prompt-externo`, `absorver-resgate-externo`); secao "Resgate externo (LLM de fora)" no workflow; campo `external_rescues` no schema de `sources`; ref ao novo asset; antipadroes sobre exposicao.
- `assets/template-external-rescue-prompt.md` — **arquivo novo**. Template parametrizado completo com 7 variaveis, prompt copiavel pre-formatado, formato estruturado de saida esperado, restricoes obrigatorias e regras de geracao para a skill.
- `assets/template-episode.md` — campo `external_rescues` adicionado a tabela de campos do frontmatter e ao bloco de exemplo expandido.
- `references/pattern-source-extraction.md` — secao "7. Resgates externos (LLM de fora)" como sexta fonte objetiva; entrada `external_rescues` no exemplo de `metadata.sources`; novo indicador de qualidade para eps enriquecidos por resgate externo.
- `references/sequence-workflows.md` — 2 fluxos Mermaid novos (`gerar-prompt-externo`, `absorver-resgate-externo`).

## Mudancas resumidas por arquivo (1.3.0 -> 1.4.0)

- `SKILL.md` — acao `compilar-conhecimento`; secao workflow "Compilar conhecimento"; estrutura com `knowledges/`; antipadroes de ghostwriting; refs a novos assets/pattern.
- `references/pattern-knowledge-authoring.md` — **arquivo novo**. Voz, co-autoria, workflow, checklist, antipadroes.
- `references/pattern-journey-structure.md` — secao `knowledges/`; passo 7 no bootstrap.
- `references/pattern-journey-authoring.md` — linha na tabela de destino.
- `assets/template-knowledge.md`, `assets/template-knowledges-readme.md` — **arquivos novos**.
- `assets/template-journey-readme.md` — estrutura lista `knowledges/`.
- `agents/openai.yaml` — default_prompt menciona compilar knowledges.
- `.journey/knowledges/README.md` — pasta criada em projetos existentes (manual ou proximo `inicializar` incompleto).

## Compatibilidade

Versao 1.4.0 e **retrocompativel** com 1.0.0 - 1.3.0 para projetos que adotarem progressivamente:

- pasta `knowledges/` e aditiva — projetos antigos funcionam sem ela ate o primeiro `compilar-conhecimento` ou copia do README;
- acao `compilar-conhecimento` nao altera contrato de episodios.

Versao 1.3.0 e **retrocompativel** com 1.0.0 - 1.2.0 para projetos que adotarem progressivamente:

- frontmatter padrao funciona em ep antigo sem ele (so adicionar quando refinar);
- `metadata.sources` opcional ate o primeiro refinamento substancial;
- `metadata.sources.external_rescues` so existe quando o ciclo `gerar-prompt-externo` + `absorver-resgate-externo` for usado;
- acoes novas (`enriquecer`, `reorganizar`, `validar`, `gerar-prompt-externo`, `absorver-resgate-externo`) sao aditivas — nao quebram acoes existentes;
- patterns novos sao referenciados sob demanda — nao requerem leitura previa;
- **scripts em `scripts/` sao opcionais e aditivos** — agente pode operar como antes; scripts so eliminam repeticao e classes de erro;
- pre-requisitos novos (`jq` e `PyYAML`) sao comuns em ambientes Linux/macOS. Sem eles, agente usa fallback manual (Read/Edit/jq inline).

Recomendacao para projetos ja com `.journey/` em versao anterior: ao proxima refinamento, popular frontmatter retroativamente e adicionar `metadata.sources` aos eps tocados. Migracao incremental, sem big bang.
