---
title: Pattern de scripts da journey-writer
description: Quando chamar cada script vs operar diretamente. Scripts deterministas eliminam classes de erro (refs orfas, mv em ordem errada, frontmatter inconsistente) e economizam tokens de Read/Edit repetidos. Interpretacao narrativa permanece com o agente.
metadata:
  author: agents-studio
  last_updated: 2026-05-14 03:30
  version: "1.0.0"
---

# Pattern de scripts da journey-writer

## Princípio

**Parte mecanica determinista vira script. Interpretacao narrativa fica com o agente.** Scripts rodam em milissegundos, sem custo de token e sem erro de leitura. Agente decide o que registrar; script faz a operacao em si.

## Mapa: acao -> script

| Acao | Script | Obrigatoriedade |
|---|---|---|
| `inicializar` | nenhum diretamente. Usa `extract-sessions.sh` + `extract-conversation.sh` no Caminho B | opcional |
| `analisar-insumo` | nenhum | — |
| `registrar` | `source-add.py` apos escrever (registra fonte sem Edit manual) | opcional |
| `refinar` | `source-add.py` + `extract-conversation.sh` se for ler sessao nova | opcional |
| `enriquecer` | `extract-conversation.sh` + `source-add.py` | **recomendado** |
| `colher-conteudo` | nenhum | — |
| `reorganizar` | `reorganize.py` substitui sequencia de mv+Edit+grep | **obrigatorio** quando > 3 eps mudam |
| `validar` | `validate.sh` substitui a acao inteira | **obrigatorio** |
| `gerar-prompt-externo` | `gen-rescue-prompt.py` substitui montagem manual | **recomendado** |
| `absorver-resgate-externo` | `source-add.py --type external` para registrar fonte; escrita do conteudo continua com agente | opcional |
| (toda escrita) | `episode-status-map.py` apos mudar status de qualquer ep | opcional |

## Scripts disponiveis

Todos em `.claude/skills/journey-writer/scripts/`.

### `validate.sh` (P1, bash)

Audita `.journey/` inteira. Output categorizado: refs orfas, frontmatter incompleto, last_review defasado (> 30d), titulo vs filename mismatch, eps sem `metadata.sources`.

```bash
bash scripts/validate.sh                  # output humano
bash scripts/validate.sh --json           # output estruturado
bash scripts/validate.sh --max-age-days 60
```

Exit 0 = limpo. Exit 1 = pendencias. Substitui a acao `validar` por completo.

### `extract-sessions.sh` (P1, bash + jq)

Lista sessoes `.jsonl` do projeto atual com filtros. **Modo interativo (default) faz 5+ perguntas antes de executar** (periodo, branches, tamanho minimo, sessoes vazias, ordenacao, formato). Garante que agente decida o escopo conscientemente e nao retorne dataset enviesado.

```bash
bash scripts/extract-sessions.sh                          # interativo
bash scripts/extract-sessions.sh --non-interactive \
     --periodo 2026-04-01..2026-05-14 --branches all \
     --min-size-kb 10 --include-empty no \
     --order date-asc --format table
```

Output: tabela `FIRST | LAST | BRANCH | SESSION_ID | SIZE_KB | USR_MSG`. Use o `SESSION_ID` resultante como input de `extract-conversation.sh`.

### `extract-conversation.sh` (P1, bash + jq)

Extrai conversa completa de uma sessao, intercalando USER e ASSISTANT. **Texto do assistant e tao importante quanto o do usuario** — e nele que aparecem diagnosticos, decisoes, propostas, raciocinio. Tratar como leitura de pair-programming, nao monologo.

```bash
bash scripts/extract-conversation.sh <session-id>
bash scripts/extract-conversation.sh <session-id> --include-tools
bash scripts/extract-conversation.sh <session-id> --grep "reset" --range 1:200
bash scripts/extract-conversation.sh <session-id> --format plain
```

Por padrao filtra `tool_use`/`tool_result` (ruido alto). `--include-tools` adiciona sumario por chamada quando precisar entender o contexto operacional.

### `reorganize.py` (P2, python + PyYAML)

Renumeracao topologica segura. Recebe map YAML, executa mv em duas fases (`.tmp__N__` -> destino final) para evitar colisao, atualiza self-refs no ep (frontmatter `title:` + cabecalho `# EP-NNN`), atualiza refs cruzadas em hero/timeline/seeds/open-questions/README/eps, cria placeholders e roda `validate.sh` ao final.

```yaml
# map.yaml
renames:
  "003-segundo-reset": "005-v32-nasce-com-sdd"
  "004-docs-flat": "006-docs-flat"
deletes:
  - "008-notion-fio"
creates:
  - "003-v3-e-v3.1"
  - "009-criacao-journey"
```

```bash
python3 scripts/reorganize.py --map map.yaml --dry-run
python3 scripts/reorganize.py --map map.yaml
```

Substitui ~12 chamadas de ferramenta (mv + Read + Edit + grep). Decisao do mapa antigo->novo continua com agente; execucao e mecanica.

### `gen-rescue-prompt.py` (P2, python)

Gera prompt copiavel para resgate em LLM externo. Le `CLAUDE.md`, `.journey/hero.md`, `docs/README.md` para `{PROJECT_SUMMARY}`. Filtra `open-questions.md` por keyword do assunto. Renderiza `assets/template-external-rescue-prompt.md`.

```bash
python3 scripts/gen-rescue-prompt.py --assunto "reset v3.2" \
    --ep "005-v32-nasce-com-sdd-desde-primeira-linha" \
    --era v3.2 --exposicao privado
```

Agente so escolhe assunto + filtros. Script monta o prompt.

### `episode-status-map.py` (P3, python + PyYAML)

Regenera tabela "Mapa rapido de status dos episodios" em `timeline.md` lendo frontmatter de todos os eps. Procura marcadores `<!-- BEGIN: status-map -->` ... `<!-- END: status-map -->`. Util como passo final apos `reorganizar` ou apos mudar status de eps.

```bash
python3 scripts/episode-status-map.py --dry-run
python3 scripts/episode-status-map.py
```

### `source-add.py` (P3, python + PyYAML)

Adiciona entrada em `metadata.sources` de um ep e bumpa `last_review`. Evita Read+Edit so para registrar fonte.

```bash
python3 scripts/source-add.py --ep 003-v3-e-v3.1-... \
    --type session --id <uuid> --date 2026-05-14 \
    --relevance primary --summary "diagnostico cruzado"

python3 scripts/source-add.py --ep 005-... --type commit --hash 1ae4ffc

python3 scripts/source-add.py --ep 003-... --type external \
    --llm gpt-4 --date 2026-05-15 \
    --assunto "motivacao do reset" --exposicao privado \
    --summary "usuario lembrou tres frustracoes"
```

**Atencao:** PyYAML reformata o frontmatter (sem comentarios, ordem por dump). Para preservacao perfeita, instalar `ruamel.yaml` e portar.

## Quando NAO usar script

- escrita narrativa (corpo de ep, hero, seed, open-question);
- juizo editorial sobre lente, estagio da jornada, destino;
- classificacao de insumo;
- decisao de absorcao em `absorver-resgate-externo`;
- micro-edits manuais em ep ja escrito.

## Trade-offs

- **bash vs python:** scripts bash funcionam onde a operacao e textual simples (grep, jq, mv). Python e necessario quando ha parsing/dump de YAML ou logica topologica.
- **PyYAML vs ruamel.yaml:** PyYAML reformata (sem comentarios, ordem por dump). Aceitavel hoje porque frontmatter dos eps e simples. Upgrade para `ruamel.yaml` quando preservacao virar problema.
- **interatividade:** `extract-sessions.sh` e o unico interativo por design — escopo de extracao tem impacto grande no resultado e merece pergunta explicita. Demais scripts sao headless.

## Antipadroes

- chamar `validate.sh` so depois de erros aparecerem em produção — rodar como passo final em todo workflow de escrita;
- pular `--dry-run` em `reorganize.py` quando o mapa tem mais de 5 entradas;
- usar `extract-sessions.sh --non-interactive` sem revisar filtros (perde o ponto de garantia pre-execucao);
- ler so texto do usuario em `extract-conversation.sh` esquecendo que o agente tambem registra decisoes valiosas;
- registrar `--type session` em `source-add.py` sem ter de fato lido material da sessao (fere o contrato anti-retrabalho);
- editar frontmatter manualmente com Edit quando `source-add.py` cobre o caso.

## Migracao futura

Quando este conjunto for promovido a outras instancias da skill:

1. portar de PyYAML para `ruamel.yaml` (preserva comentarios e ordem);
2. empacotar scripts em modulo Python instalavel (`pip install journey-writer-scripts`);
3. expor entrypoints CLI unificados (`journey validate`, `journey extract`, `journey reorganize`);
4. testes minimos por script (happy path + 1 caso de erro).
