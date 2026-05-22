---
title: Pattern de extracao de fontes para journey-writer
description: Como localizar, filtrar e extrair material objetivo (sessoes JSONL Claude Code, git log, CHANGELOG, planos, skills) antes de escrever narrativa, evitando rascunho generico.
metadata:
  author: agents-studio
  last_updated: 2026-05-13 21:30
  version: "1.0.0"
---

# Pattern de extracao de fontes para journey-writer

## Objetivo

Tornar narrativa ancorada em material real (citacoes verbatim, datas exatas, numeros concretos) e nao em interpretacao do agente. Lacuna confirmada na pratica: rascunho generico criado antes de consultar historico **e sempre reescrito depois**. Custo do erro: alto. Antidoto: buscar fontes objetivas como passo zero.

## Quando aplicar

- antes de qualquer acao de escrita substancial (`inicializar`, `registrar`, `refinar`, `enriquecer`);
- quando ja existe historico (commits, sessoes, planos) — quase sempre em projeto vivo;
- quando o ep alvo esta raso e precisa ganhar concreção (numeros, tabelas, citacoes).

## Quando nao aplicar

- projeto verdadeiramente novo, sem commits nem sessoes;
- `analisar-insumo` sobre material que o usuario acabou de colar (material ja esta na conversa);
- micro-ajustes de copy em ep ja consolidado.

## Fontes objetivas em ordem de prioridade

### 1. Sessoes Claude Code (JSONL)

Localizacao: `~/.claude/projects/<encoded-cwd>/<session-id>.jsonl`.

O `<encoded-cwd>` substitui `/` por `-` no caminho absoluto do projeto. Exemplo:

```text
projeto:  /home/user/code/site/
encoded:  -home-user-code-site
caminho:  ~/.claude/projects/-home-user-code-site/
```

#### Listar sessoes

```bash
ls -la ~/.claude/projects/<encoded-cwd>/
```

Cada `.jsonl` e uma sessao. Tamanho do arquivo indica densidade de conteudo.

#### Filtrar por branch (gitBranch)

Cada sessao tem campo `gitBranch` em todos os eventos. Filtrar para o ep que cobre uma branch especifica:

```bash
cd ~/.claude/projects/<encoded-cwd>/
for f in *.jsonl; do
  branch=$(grep -oE '"gitBranch":"[^"]*"' "$f" | sort -u | head -1)
  echo "$f | $branch"
done
```

#### Identificar timestamps de cada sessao

```bash
jq -r 'select(.type=="user") | .timestamp' <session>.jsonl 2>/dev/null | head -1
```

Ordenar sessoes por data para alinhar com a cronologia dos eps.

#### Extrair mensagens do usuario (sem tool_result)

```bash
jq -r 'select(.type=="user") |
  (if (.message.content|type=="string")
   then .message.content
   else (.message.content[]? | select(.type=="text") | .text)
   end)' <session>.jsonl
```

Filtra apenas conteudo textual real do usuario, descartando tool_result.

#### Buscar quotes por keyword

```bash
grep -oE '.{60}(palavra-chave|outra).{60}' <session>.jsonl | sort -u | head -20
```

Util para localizar contexto sem ler sessao inteira.

### 2. Git log e tags

```bash
git log --oneline --reverse                          # historia completa
git log --oneline | head -30                         # mais recentes
git tag                                              # versoes consolidadas
git log <tag1>..<tag2> --format='%h|%ad|%s' --date=short --reverse  # commits entre versoes
git log <branch>..HEAD --format='%h|%ad|%s' --date=short            # commits de uma branch
```

Para eps cronologicos antigos (anteriores a sessoes Claude Code disponiveis), git log + tags sao a unica fonte objetiva.

### 3. CHANGELOG.md

Se existir, e o mapa mais limpo de versoes e marcos.

Se nao existir e a refinacao for substancial: criar via skill `ast-release-manager` antes de continuar. Investimento de uma sessao curta paga muitas rodadas de refinacao narrativa. Aprendizado vivido: criar CHANGELOG revelou dois resets totais (quando se acreditava em apenas um), corrigindo inconsistencia em multiplos eps.

### 4. Planos em `.claude/plans/`

```bash
ls .claude/plans/
for p in .claude/plans/PLAN-*/README.md; do
  head -20 "$p"
done
```

Cada `PLAN-*` revela escopo de uma frente. Util para eps que descrevem planejamento (ex: ep "10 plans em draft").

### 5. Skills em `.claude/skills/` + `.claude/tools.yaml`

```bash
ls .claude/skills/
cat .claude/tools.yaml
```

Util para ep que cobre criacao ou reuso de skills.

### 6. Docs em `docs/` + ADRs

```bash
ls docs/ docs/decisions/
```

Decisoes formalizadas em ADRs sao fonte primaria para episodios meta sobre identidade tecnica e fios condutores.

### 7. Resgates externos (LLM de fora)

Quando memoria do usuario nao foi capturada em sessoes Claude Code (conversas com ChatGPT, Claude.ai, Gemini, ou simplesmente lembranca pessoal nao registrada), use o ciclo `gerar-prompt-externo` -> usuario cola em LLM externo -> `absorver-resgate-externo`.

Detalhe completo do template e regras em [`../assets/template-external-rescue-prompt.md`](../assets/template-external-rescue-prompt.md).

Ciclo resumido:

1. usuario diz `gerar prompt sobre <assunto>`;
2. skill carrega contexto do projeto + lacunas conhecidas e gera prompt copiavel preenchido;
3. usuario cola no LLM externo, recebe resposta estruturada;
4. usuario cola resposta de volta com `absorver-resgate-externo`;
5. skill mapeia secoes da resposta para secoes do ep alvo + registra entrada em `metadata.sources.external_rescues`.

Cuidado de exposicao: o `{PROJECT_SUMMARY}` enviado para LLM externo vira proxy publico — nao incluir secrets, tokens nem detalhe sensivel de terceiros, mesmo quando a resposta venha marcada `privado`.

## Procedimento recomendado

1. **listar fontes disponiveis** (sessoes + commits + tags + CHANGELOG + planos);
2. **mapear sessoes a eps candidatos:** uma planilha mental (ou explicita) sessao_id -> ep_alvo;
3. **extrair material:** quotes verbatim, datas, numeros, listas;
4. **separar `primary` de `secondary`:** sessao com material extraido diretamente e `primary`; sessao consultada como apoio e `secondary`;
5. **registrar em `metadata.sources` do ep alvo** logo apos terminar a leitura;
6. **escrever o ep com material concreto:** citacoes em quote block, tabelas com numeros, lista de itens reais (nao "varios" ou "alguns");
7. **bumpar `last_review`** apos terminar.

## Como instrumentar fontes (pacote v2)

1. Apos ler uma conversa, criar `sources/conversations/{8hex}-{tool-id}.md` ([`../assets/template-conversation-digest.md`](../assets/template-conversation-digest.md)).
2. Preencher `tool.id` conforme origem real (nao assumir claude-code se foi Cursor/Codex/Antigravity).
3. Preencher `storage.path` absoluto do JSONL ou export.
4. Preencher `agent.name` (skill ou produto que conduziu a sessao).
5. Corpo do digest: resumo, decisoes, quotes USER+ASSISTANT, numeros.
6. Atualizar `sources/INDEX.md` ([`../assets/template-sources-index.md`](../assets/template-sources-index.md)).
7. Bumpar `last_review` no INDEX e em `metadata.sources` do `episode.md`.

Rollup no ep:

```yaml
metadata:
  sources:
    index: sources/INDEX.md
    package: episode-package/1.0
    last_review: 2026-05-16 14:00
    counts:
      conversations: 2
      commits: 3
      files: 4
      external: 0
```

### Formato legado (flat, deprecated)

Listas `sessions`/`commits`/`files` no frontmatter do `.md` unico ainda aparecem em eps 001–008. Migrar com [`pattern-migration-episode-packages.md`](./pattern-migration-episode-packages.md). Nao criar eps novos nesse formato.

## Antipadroes

- listar sessao em `sources` sem ter de fato extraido material dela;
- bumpar `last_review` sem ter mexido em sources ou conteudo do ep;
- escrever ep cronologico sem citar nenhum commit nem sessao;
- usar parafrase quando a sessao tem citacao direta utilizavel (citar verbatim e mais forte);
- escrever "varios", "alguns", "diversos" quando dava pra listar numero exato;
- reler todas as sessoes a cada refinamento — sources existe pra evitar isso.

## Indicador de qualidade

Ep cronologico saudavel cita pelo menos:
- 1 commit hash com data;
- 1 citacao verbatim do usuario (quando ha sessao primary ou external_rescue);
- 1 numero objetivo (datas, contagens, percentuais).

Ep meta saudavel cita pelo menos:
- 2 ou mais eps em `derived_from`;
- evidencia cruzada entre as fontes derivadas;
- ao menos uma hipotese editorial marcada como tal.

Ep enriquecido por resgate externo carrega:
- entrada em `metadata.sources.external_rescues` com `llm`, `date`, `assunto`, `exposicao`, `summary`;
- citacoes verbatim do usuario marcadas em quote block (mais valiosas que parafrase do agente externo);
- secao "Hipoteses externas" separada das hipoteses editoriais do agente local.
