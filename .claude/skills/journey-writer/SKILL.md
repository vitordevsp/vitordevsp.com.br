---
name: journey-writer
description: "Transforma conversas, decisões, planos e registros de desenvolvimento em narrativa pública dentro de `.journey/`, com foco editorial, storytelling de SDD e geração futura de conteúdo, sem virar documentação técnica."
compatibility: "Projetada para Agents Studio v0.1. Opera somente em projetos que aceitam manter uma camada narrativa `.journey/` separada de `docs/` e da implementação."
metadata:
  author: agents-studio
  last_updated: 2026-05-14 03:30
  version: "1.3.0"
---

# journey-writer

## Inicio rapido

1. Leia a primeira frase do usuario e classifique a acao principal: `inicializar`, `analisar-insumo`, `registrar`, `refinar`, `enriquecer`, `colher-conteudo`, `reorganizar` ou `validar`.
2. **Antes de escrever qualquer linha narrativa, busque historico real** (sessoes JSONL, git log, CHANGELOG, planos, skills). Detalhe em [`references/pattern-source-extraction.md`](./references/pattern-source-extraction.md). Material real evita rascunho generico que e sempre reescrito depois.
3. Verifique se `.journey/` ja existe na raiz do projeto e mapeie quais arquivos estao presentes.
4. Identifique o tipo de insumo (`conversa`, `decisao`, `plano`, `erro`, `reflexao`, `mudanca-de-direcao`, `duvida`, `conteudo-bruto`).
5. Classifique o material pelas lentes narrativas (`chamado`, `atrito`, `descoberta`, `metodo`, `transformacao`, `oferta`) antes de decidir destino.
6. Para acoes de escrita substancial, apresente sintese (linha do tempo + temas) ao usuario via `AskUserQuestion` estruturada antes de escrever.
7. Escreva ou atualize apenas o arquivo certo dentro de `.journey/`, sem misturar com `docs/` ou changelog. Frontmatter padronizado e obrigatorio em todo episodio (spec em [`assets/template-episode.md`](./assets/template-episode.md)).
8. Apos escrever, atualize `metadata.sources.last_review` no(s) ep(s) tocado(s) e rode validacao de refs orfas.
9. Quando faltar contexto editorial, faca perguntas objetivas guiadas por [`references/pattern-journey-authoring.md`](./references/pattern-journey-authoring.md).

## O que esta skill faz

- inicializar a estrutura `.journey/` quando ela ainda nao existe;
- analisar insumos brutos e decidir onde virar registro narrativo;
- registrar marcos em `timeline.md`, episodios em `episodes/`, sementes em `seeds/content-seeds.md` e fragmentos em `notes/raw-insights.md`;
- refinar o arco principal em `hero.md`, episodios e perguntas abertas em `open-questions.md`;
- enriquecer episodios existentes com mais detalhes extraidos de fontes ja vistas ou novas;
- colher seeds de conteudo publico a partir de registros ja existentes;
- reorganizar a numeracao cronologica dos episodios mantendo refs cruzadas validas;
- validar consistencia de refs, frontmatter e sources;
- preservar separacao estrita entre narrativa (`.journey/`) e documentacao tecnica (`docs/`).

## Quando usar

- houve conversa, decisao, virada ou aprendizado relevante sobre SDD, agentes, contexto ou reconstrucao do projeto;
- o projeto comecou e ainda nao tem camada narrativa registrada;
- existe insumo bruto que pode virar post, video, aula, newsletter ou lead magnet;
- uma mudanca de direcao precisa ser capturada antes de virar retrospectiva;
- ha duvida ou frustracao com agentes que ensina algo reutilizavel;
- episodio existente esta raso e precisa ganhar numeros, citacoes ou exemplos concretos;
- a cronologia da serie precisa ser reorganizada com seguranca.

## Quando nao usar

- o pedido e documentacao tecnica, README, PRD, SPEC, AGENTS.md, ADR ou changelog;
- o conteudo e detalhe sensivel interno do projeto;
- nao existe elemento narrativo (transformacao, tensao, decisao, aprendizado) no insumo;
- o objetivo e marketing artificial ou narrativa inventada que nao aparece nos insumos.

## Acoes que esta skill interpreta

| Acao | Quando usar | Entradas esperadas | Saidas esperadas |
|------|------|------|------|
| `inicializar` | `.journey/` ainda nao existe ou esta incompleto | confirmacao do usuario, contexto inicial do projeto, nome do protagonista; **se houver historico (sessoes JSONL, git log, CHANGELOG), buscar antes de escrever** | estrutura base em `.journey/` com `README.md`, `hero.md` rascunho, `timeline.md`, `open-questions.md`, `episodes/` (vazia, primeiro ep e `001-`), `seeds/content-seeds.md`, `notes/raw-insights.md`. Template copiavel vive em `assets/template-episode.md` da skill, nao em `episodes/`. |
| `analisar-insumo` | usuario traz material bruto e quer saber onde registrar | trecho da conversa, link/cita do plano ou decisao, contexto temporal | classificacao por tipo, lente e estagio da jornada; recomendacao de destino antes de escrever |
| `registrar` | ja existe clareza editorial sobre o destino | tipo de registro alvo (`marco`, `episodio`, `semente`, `fragmento`) e material destilado | arquivo certo criado ou atualizado em `.journey/`, com tom autoral preservado e frontmatter completo (eps) |
| `refinar` | `hero.md`, episodio ou `open-questions.md` precisa amadurecer | arquivo alvo, nova evidencia, lacuna a fechar | mesmo arquivo evoluido sem duplicacao, com hipoteses marcadas como hipoteses; `metadata.sources.last_review` atualizado |
| `enriquecer` | episodio ja existe mas esta raso, precisa ganhar numeros/citacoes/exemplos | episodio alvo + indicacao de fontes ja vistas ou novas a consultar | mesmo ep com tabelas, citacoes verbatim, dados concretos; sources atualizado |
| `colher-conteudo` | registros existentes ja tem material para virar oferta publica | recorte de episodios ou marcos relevantes | entradas novas em `seeds/content-seeds.md` com formato, tese, publico e relacao com SDD |
| `reorganizar` | numeracao cronologica precisa mudar (novo ep no meio, fusao, divisao) | mapa antigo->novo de IDs de eps | renomeacao segura via padrao topologico ([`references/pattern-renumeration-safe.md`](./references/pattern-renumeration-safe.md)); refs cruzadas atualizadas; timeline mapa atualizado; zero refs orfas |
| `validar` | suspeita de refs quebradas, frontmatter inconsistente, sources defasados | nenhuma; varre `.journey/` inteira | relatorio de refs orfas, eps sem frontmatter completo, eps com `last_review` muito antigo ou ausente |
| `gerar-prompt-externo` | usuario quer levar um assunto pra LLM externo (ChatGPT, Claude.ai, Gemini) e trazer resposta de volta | linha curta com assunto (ex: "gerar prompt sobre reset v3.2"); opcionalmente `ep alvo` e `nivel de exposicao` | bloco markdown copiavel com prompt estruturado preenchido com contexto do projeto, lacunas conhecidas e formato de resposta esperado. Template em [`assets/template-external-rescue-prompt.md`](./assets/template-external-rescue-prompt.md) |
| `absorver-resgate-externo` | usuario cola resposta de LLM externo (formato estruturado vindo do `gerar-prompt-externo`) | resposta markdown estruturada do LLM externo + ep alvo (auto-detectado se vier do prompt) | ep alvo enriquecido com fatos/citacoes/decisoes/hipoteses do resgate; `metadata.sources.external_rescues` recebe nova entrada |

Se a primeira frase do usuario vier ambigua, prefira `analisar-insumo` e devolva a recomendacao de destino antes de escrever. Pergunte antes de escrever quando a duvida afetar `hero.md` ou criar episodio novo.

Nomes equivalentes que podem aparecer na frase inicial do usuario:

- `iniciar-jornada`, `bootstrap-journey`
- `classificar-insumo`, `triagem-narrativa`
- `adicionar-marco`, `novo-episodio`, `nova-semente`
- `atualizar-hero`, `evoluir-arco`
- `aprofundar-episodio`, `acrescentar-detalhes`, `endurecer-ep` (todos equivalem a `enriquecer`)
- `renumerar`, `reorganizar-cronologia` (todos equivalem a `reorganizar`)
- `auditar`, `checar-refs` (todos equivalem a `validar`)
- `gerar prompt sobre <X>`, `prompt-resgate <X>`, `resgate-externo <X>` (todos equivalem a `gerar-prompt-externo`)
- `colar resgate`, `absorver resposta do gpt`, `enriquecer com resgate` (todos equivalem a `absorver-resgate-externo`)

## Entradas tipicas

- frase inicial descrevendo a acao;
- insumo bruto: trecho de conversa, decisao, plano, erro, reflexao ou conteudo;
- data ou marco temporal do acontecimento;
- nivel de exposicao desejado (privado, semi-publico, publico);
- referencias relacionadas em `docs/`, `.claude/plans/` ou commits.

**Fontes objetivas a consultar antes de escrever** (detalhe em [`references/pattern-source-extraction.md`](./references/pattern-source-extraction.md)):

- **sessoes Claude Code:** `~/.claude/projects/<encoded-cwd>/<id>.jsonl`. Filtrar por `gitBranch` antes de ler;
- **git log + tags:** `git log --oneline --reverse`, `git tag` revelam datas de versoes e resets;
- **CHANGELOG.md:** se existir, e o melhor mapa de versoes consolidadas. Se nao existir, considerar criar via `ast-release-manager` antes de refinar episodios;
- **planos:** `.claude/plans/PLAN-*` revelam intencao operacional;
- **skills:** `.claude/skills/*` revelam capacidades reusaveis.

Se a data nao for explicita, registre a data atual em formato ISO `AAAA-MM-DD` e marque como hipotese quando o acontecimento for retroativo.

## Como ler um insumo

Para cada novo insumo, siga o workflow:

1. classificar tipo (`conversa`, `decisao`, `plano`, `erro`, `reflexao`, `mudanca-de-direcao`, `duvida`, `conteudo-bruto`);
2. extrair elementos narrativos (`conflito`, `decisao`, `aprendizado`, `virada`, `consequencia`, `pergunta-aberta`, `conteudo-potencial`);
3. classificar estagio da jornada (`mundo-comum`, `chamado`, `resistencia`, `metodo`, `provacao`, `recompensa`, `integracao`, `ensino`);
4. escolher destino (`hero.md`, `timeline.md`, `episodes/`, `open-questions.md`, `seeds/content-seeds.md`, `notes/raw-insights.md`);
5. separar fato, interpretacao e hipotese editorial (marcar com `> Hipotese editorial:`);
6. so escrever quando o destino estiver decidido.

Detalhe completo das lentes, principios editoriais e tom em [`references/pattern-journey-authoring.md`](./references/pattern-journey-authoring.md).

## Workflow recomendado

### Bootstrap (ramificacao por presenca de historico)

1. Ler frase inicial e classificar acao.
2. Verificar estado atual de `.journey/`.
3. **Buscar historico antes de qualquer escrita substancial:**
   - `git log --oneline --reverse | head -50` + `git tag`;
   - listar sessoes via `bash scripts/extract-sessions.sh` (modo interativo, 5+ perguntas de escopo). Para ler uma sessao especifica, `bash scripts/extract-conversation.sh <id>` (intercala USER+ASSISTANT);
   - ler `CHANGELOG.md` se existir (criar via `ast-release-manager` se nao existir e refinacao for substancial).
4. **Caminho A — sem historico (projeto novo):** copiar templates de `assets/` (excluindo `template-episode.md`) para `.journey/`, preencher rascunho generico marcando lacunas, criar `001-introducao.md` baseado em entrevista com usuario.
5. **Caminho B — com historico (projeto vivo):** mapear sessoes/commits/CHANGELOG a episodios candidatos, apresentar mapa ao usuario via `AskUserQuestion`, esperar validacao, depois escrever eps com material real (citacoes verbatim, numeros, datas exatas).

### Refinacao incremental

1. Ler arquivo alvo e seu `metadata.sources` (ja consultadas).
2. Identificar fontes novas a consultar (sessoes nao listadas, commits novos).
3. Apresentar plano de refinacao ao usuario antes de escrever.
4. Escrever sem duplicar blocos consolidados.
5. Atualizar `metadata.sources` (adicionar entradas novas + bumpar `last_review`).
6. Rodar validacao de refs orfas.

### Reorganizacao cronologica

Detalhe em [`references/pattern-renumeration-safe.md`](./references/pattern-renumeration-safe.md). Resumo:

1. Mapear renomeacoes antigo->novo.
2. Aplicar mv em ordem topologica (vacate-then-fill).
3. Read antes de Edit (mv quebra harness tracking).
4. Atualizar refs em hero.md, timeline.md, content-seeds.md, open-questions.md, README.md, eps que se referenciam.
5. Validar via grep (refs orfas).

### Apos qualquer escrita

1. Validar checklist de qualidade ([`references/pattern-journey-authoring.md`](./references/pattern-journey-authoring.md)).
2. Atualizar `metadata.sources.last_review` no(s) ep(s) tocado(s) — preferir `python3 scripts/source-add.py` em fluxos repetitivos.
3. Rodar `bash scripts/validate.sh` (substitui `grep -rE "episodes/..."` + checagens manuais).
4. Atualizar `references/version-history.md` quando estrutura ou contrato da skill mudar.

### Resgate externo (LLM de fora)

Para puxar memoria que so o usuario tem (ou que precisa de outro modelo pra destravar), o ciclo e:

1. usuario invoca `gerar-prompt-externo <assunto>`;
2. skill carrega contexto do projeto (de `CLAUDE.md`, `docs/README.md`, `.journey/hero.md`, ep alvo se houver) e preenche [`assets/template-external-rescue-prompt.md`](./assets/template-external-rescue-prompt.md) com `{ASSUNTO}`, `{ERA}`, `{LACUNAS_CONHECIDAS}` etc;
3. skill devolve bloco markdown copiavel;
4. usuario cola em ChatGPT/Claude.ai/Gemini, conduz a conversa, recebe resposta no formato estruturado pedido;
5. usuario volta e invoca `absorver-resgate-externo` colando a resposta;
6. skill mapeia secoes da resposta (`Fatos objetivos`, `Citacoes verbatim`, `Hipoteses suas`, etc) para secoes do ep alvo;
7. skill registra entrada nova em `metadata.sources.external_rescues` (`llm`, `date`, `assunto`, `summary`) + bumpa `last_review`;
8. usuario revisa diff antes de salvar.

Exposicao: respostas externas chegam com `nivel_exposicao` declarado no prompt (`privado`, `semi-publico`, `publico`). Skill respeita esse marcador na hora de absorver — material `privado` nao deve sair do `.journey/` sem revisao explicita.

## Frontmatter como contrato

Todo episodio em `.journey/episodes/` carrega frontmatter padronizado. Spec completo em [`assets/template-episode.md`](./assets/template-episode.md). Campos chave:

- `title`: `EP-NNN - Titulo`;
- `status`: `draft` -> `refinando` -> `refinado` -> `publicado`;
- `type`: `introducao`, `cronologico`, `meta`, `retrospectiva`;
- `metadata.era`: `atemporal`, `v1`, `v2`, `v1-v2`, `v3`, `v3.1`, `v3.2` (etc);
- `metadata.lentes`: combinacao de `chamado`, `atrito`, `descoberta`, `metodo`, `transformacao`, `oferta`;
- `metadata.sources`: contrato anti-retrabalho (ver abaixo).

Eps `meta` (atravessam multiplos momentos) usam tambem `metadata.sources.derived_from` listando slugs de eps cronologicos que servem de fonte.

## Mecanismo `sources` (anti-retrabalho)

`metadata.sources` em cada ep registra o que ja foi consultado:

```yaml
sources:
  sessions:
    - id: <uuid-jsonl>
      date: AAAA-MM-DD
      relevance: primary | secondary
      summary: descricao curta
  commits: [<hash-curto>, ...]
  files: [<path>, ...]
  branches: [<branch>, ...]      # opcional
  derived_from: [<ep-slug>, ...] # so meta/intro
  external_rescues:              # opcional, populado por absorver-resgate-externo
    - llm: gpt-4 | claude.ai | gemini | other
      date: AAAA-MM-DD
      assunto: <input que gerou o prompt>
      exposicao: privado | semi-publico | publico
      summary: resumo curto do que foi extraido
  note: <contexto opcional>
  last_review: AAAA-MM-DD HH:MM
```

Antes de reler conversas, agente consulta `sources.sessions` do ep alvo e foca em material novo. Atualizar `last_review` toda vez que sources for tocado.

Detalhe em [`references/pattern-source-extraction.md`](./references/pattern-source-extraction.md).

## Marcacoes editoriais especiais

| Marcacao | Onde usar | Proposito |
|---|---|---|
| `> Hipotese editorial: ...` | em qualquer ep, quando interpretacao supera fato | distinguir leitura editorial de fato registrado |
| `> Em aberto: ...` | em hero.md ou ep, quando ha lacuna por preencher | sinalizar que o autor sabe que ali falta material |
| `[promovido para: <destino>]` | em `notes/raw-insights.md` apos insight virar ep ou seed | preservar historico sem duplicar |
| `[ainda raw]` | em `notes/raw-insights.md` | sinalizar insight nao promovido |
| `[origem: ep-NNN]` | em `open-questions.md` por pergunta | rastreabilidade reversa pergunta -> ep que gerou |
| `[origem: hero]` / `[origem: timeline]` | em `open-questions.md` | quando pergunta nasceu fora de ep especifico |

## Estrutura minima esperada da pasta `.journey/`

```text
.journey/
├── README.md
├── hero.md
├── timeline.md
├── open-questions.md
├── episodes/
│   ├── 001-introducao.md   (primeiro ep cronologico, capa)
│   └── ...                  (demais eps em ordem cronologica zero-pad)
├── seeds/
│   └── content-seeds.md
└── notes/
    └── raw-insights.md
```

`.journey/` fica na raiz do projeto, fora de `docs/` e fora de `.claude/`. Nao misture registros narrativos com documentacao tecnica.

Episodios comecam em `001`. **Nao criar `000-template.md` em `episodes/`** — o template copiavel vive em [`assets/template-episode.md`](./assets/template-episode.md) desta skill.

## Versionamento leve

- a skill nasce em `1.0.0`;
- bump `patch` para refino de copy, idioma ou pequenos ajustes que nao mudam destino;
- bump `minor` quando uma nova acao, lente, tipo de registro ou pattern for incorporado;
- bump `major` quando a estrutura padrao de `.journey/` ou o contrato com o usuario mudar de forma incompativel;
- `-local` fica reservado para customizacoes futuras quando a base do framework for distribuida.

## Antipadroes

- transformar `.journey/` em `docs/`;
- escrever changelog tecnico no lugar de narrativa;
- inventar conflito, virada ou aprendizado que nao aparece no insumo;
- comecar registro por stack, ferramenta ou arquitetura;
- empilhar registros rasos em vez de poucos registros bons;
- duplicar conteudo entre `timeline.md`, `episodes/` e `seeds/`;
- forcar tom motivacional, corporativo ou marketing artificial;
- expor detalhe sensivel do projeto sem checar nivel de exposicao desejado;
- **escrever rascunho generico antes de buscar historico real** (sempre reescrito depois — desperdicio);
- pular validacao de refs orfas apos renomeacoes;
- esquecer de atualizar `metadata.sources.last_review` apos refinacao;
- reler sessoes JSONL ja listadas em `sources.sessions` quando nao ha material novo a extrair.

## Scripts disponiveis

Esta skill carrega scripts deterministas em [`scripts/`](./scripts/) para operacoes mecanicas que nao exigem juizo narrativo. **Use script sempre que a operacao for repetitiva ou suscetivel a erro manual.** Detalhe completo em [`references/pattern-scripts.md`](./references/pattern-scripts.md).

| Script | Substitui | Obrigatoriedade |
|---|---|---|
| [`scripts/validate.sh`](./scripts/validate.sh) | acao `validar` por completo (refs orfas, frontmatter, last_review, title vs filename) | **obrigatorio** ao final de qualquer fluxo de escrita |
| [`scripts/extract-sessions.sh`](./scripts/extract-sessions.sh) | sequencia jq+for+grep para listar sessoes; **modo interativo com 5+ perguntas** (periodo, branches, tamanho, vazias, ordenacao, formato) | **recomendado** em bootstrap Caminho B e em `enriquecer` |
| [`scripts/extract-conversation.sh`](./scripts/extract-conversation.sh) | jq manual para extrair conversa; **intercala USER + ASSISTANT como pair-programming** (texto do agente conta tanto quanto do usuario) | **recomendado** sempre que for ler conteudo de sessao |
| [`scripts/reorganize.py`](./scripts/reorganize.py) | sequencia mv + Read + Edit + grep da acao `reorganizar` | **obrigatorio** quando > 3 eps mudam de numero |
| [`scripts/gen-rescue-prompt.py`](./scripts/gen-rescue-prompt.py) | montagem manual do prompt em `gerar-prompt-externo` (le CLAUDE.md/hero/open-questions e renderiza template) | **recomendado** |
| [`scripts/episode-status-map.py`](./scripts/episode-status-map.py) | regenera "Mapa rapido de status" em `timeline.md` | opcional, util pos `reorganizar` |
| [`scripts/source-add.py`](./scripts/source-add.py) | Read+Edit so para registrar fonte em `metadata.sources` + bump `last_review` | opcional, recomendado em fluxos repetitivos |

Regra geral: **escrita narrativa fica com o agente; operacao mecanica vai pro script.** Scripts rodam em ms e nao gastam token, mas a decisao sobre o que registrar (qual fonte e relevante, qual ep alvo, qual lente) continua sendo juizo editorial do agente.

Pre-requisitos: `jq` (P1) e `PyYAML` (P2/P3). Sem `ruamel.yaml` por enquanto — frontmatter pode ser reformatado por `source-add.py` e `reorganize.py`; aceitavel hoje.

## Referencias sob demanda

Carregue primeiro as referencias ativas desta skill:

- [`references/pattern-journey-authoring.md`](./references/pattern-journey-authoring.md) — principios editoriais, tom, lentes, marcacoes especiais, estrategia de perguntas e checklist de qualidade.
- [`references/pattern-journey-structure.md`](./references/pattern-journey-structure.md) — papel de cada arquivo em `.journey/`, tipos de episodio, frontmatter como contrato, separacao com `docs/`.
- [`references/pattern-source-extraction.md`](./references/pattern-source-extraction.md) — como extrair sessoes JSONL, git log, CHANGELOG; mapear sessao->ep; instrumentar sources.
- [`references/pattern-renumeration-safe.md`](./references/pattern-renumeration-safe.md) — como reorganizar numeracao de eps sem quebrar refs.
- [`references/pattern-scripts.md`](./references/pattern-scripts.md) — mapa acao->script, quando usar/nao usar, trade-offs e antipadroes.
- [`references/sequence-workflows.md`](./references/sequence-workflows.md) — fluxos Mermaid por acao.
- [`references/version-history.md`](./references/version-history.md) — historico de versao da skill.

Carregue assets quando precisar copiar templates para `.journey/`:

- [`assets/template-journey-readme.md`](./assets/template-journey-readme.md)
- [`assets/template-hero-arc.md`](./assets/template-hero-arc.md)
- [`assets/template-timeline-entry.md`](./assets/template-timeline-entry.md)
- [`assets/template-episode.md`](./assets/template-episode.md) — frontmatter spec + corpo modelo
- [`assets/template-content-seed.md`](./assets/template-content-seed.md)
- [`assets/template-external-rescue-prompt.md`](./assets/template-external-rescue-prompt.md) — template parametrizado de prompt para LLM externo (ChatGPT, Claude.ai, Gemini), usado por `gerar-prompt-externo`

## Limites e seguranca

- nao escrever em `docs/`, `.claude/` ou `src/` a partir desta skill;
- nao deletar arquivos existentes em `.journey/` sem confirmacao explicita do usuario;
- preservar tom autoral do usuario; nao reescrever frase ja consolidada sem pedido;
- marcar hipotese como hipotese, separada de fato;
- escrever em portugues brasileiro;
- respeitar nivel de exposicao desejado antes de registrar detalhe sensivel;
- nao listar sessoes JSONL em `sources` sem ter de fato consultado o conteudo;
- nao bumpar `last_review` sem ter mexido em sources ou conteudo do ep;
- nao incluir secrets, tokens, dados de terceiros ou detalhe sensivel no `{PROJECT_SUMMARY}` enviado em `gerar-prompt-externo` — resumo enviado para LLM externo e proxy publico, mesmo quando a resposta vier marcada `privado`;
- nao absorver `external_rescues` sem revisar diff com usuario quando o nivel de exposicao for `privado` ou houver detalhe sensivel.
