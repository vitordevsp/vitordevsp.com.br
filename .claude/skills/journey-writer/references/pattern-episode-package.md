---
title: Pattern de pacote de episodio (pasta + sources)
description: Contrato v2 para episodios e knowledges como diretorios com arquivo raiz, sources/INDEX e digests por conversa com frontmatter rico.
metadata:
  author: agents-studio
  last_updated: 2026-05-16 14:00
  version: "1.0.0"
---

# Pattern de pacote de episodio

## Objetivo

Substituir listas rasas em `metadata.sources.sessions[]` por **artefatos consultaveis**: cada conversa vira um digest condensado com frontmatter completo (caminho, id, ferramenta, agente). O episodio aponta para um indice; o agente le o digest em vez de reabrir JSONL inteiro.

## Estrutura canonica (v2)

```text
.journey/episodes/
  NNN-slug/
    episode.md              # narrativa (antigo NNN-slug.md na raiz)
    sources/
      INDEX.md              # catalogo + rollup; porta de entrada
      conversations/
        {8hex}-{tool-id}.md # um arquivo por conversa consultada
      artifacts/
        commits.md          # opcional: hashes + datas + mensagens
        files.md            # opcional: paths lidos + por que
        external/
          YYYY-MM-DD-{llm}-{slug}.md   # resgates LLM externo
```

**Slug da pasta** = `NNN-titulo-em-kebab` (mesmo nome que o ep flat antigo, sem `.md`).

**Link canonico** em refs cruzadas: `episodes/NNN-slug/episode.md`  
**Slug logico** (derived_from, compiled_from): `NNN-slug` (sem path).

## Frontmatter do `episode.md` (rollup)

Listas inline de sessoes **nao sao mais a fonte de verdade**. O ep carrega apenas ponteiro + auditoria:

```yaml
metadata:
  sources:
    index: sources/INDEX.md
    package: episode-package/1.0
    last_review: AAAA-MM-DD HH:MM
    # rollup opcional — regeneravel a partir do INDEX
    counts:
      conversations: 0
      commits: 0
      files: 0
      external: 0
  derived_from: []   # so meta/intro — slugs de outros pacotes
```

Campos legados (`sessions`, `commits`, `files` no frontmatter do ep) ficam **deprecated**. Migracao: mover entradas para digests + INDEX; remover do ep apos migrar.

## `sources/INDEX.md`

Porta de entrada. Frontmatter + tabela humana + lista machine-readable.

Spec e template: [`../assets/template-sources-index.md`](../assets/template-sources-index.md).

Regras:

- toda conversa registrada no INDEX aponta para um arquivo em `conversations/`;
- `last_review` do INDEX deve bumpar junto com o do `episode.md`;
- se digest existir mas nao estiver no INDEX, e inconsistencia (validate acusa).

## Digest de conversa (`conversations/{8hex}-{tool-id}.md`)

Um arquivo por conversa consultada. Corpo = conhecimento **condensado** (nao dump bruto do JSONL).

Spec e template: [`../assets/template-conversation-digest.md`](../assets/template-conversation-digest.md).

### Ferramentas (`tool.id`)

Valor fechado (extensivel com `other` + `tool.label`):

| `tool.id` | Quando usar |
|-----------|-------------|
| `claude-code` | Sessao JSONL em `~/.claude/projects/...` |
| `cursor` | Composer / Agent no Cursor (export ou transcript do projeto) |
| `codex` | OpenAI Codex CLI ou sessao Codex |
| `antigravity` | Google Antigravity |
| `claude-web` | claude.ai / projetos web sem JSONL local |
| `chatgpt` | ChatGPT web ou app |
| `gemini` | Gemini |
| `other` | qualquer outra — preencher `tool.label` |

### Agente (`agent`)

Quem conduziu a conversa do lado do modelo (quando conhecido):

```yaml
agent:
  name: journey-writer    # skill, produto ou papel
  kind: skill | product | unknown
```

Episodios podem ser **escritos por ferramentas diferentes**; o digest preserva isso por conversa, nao no ep inteiro.

### Armazenamento (`storage`)

```yaml
storage:
  path: /caminho/absoluto/para/arquivo-ou-export
  path_kind: jsonl | markdown-export | sqlite | paste | unknown
  project_encoded: -home-user-code-repo   # so quando aplicavel (claude-code)
```

**Obrigatorio:** `path` absoluto ou `path: unknown` com `note` explicando (ex.: conversa so no Cursor Cloud sem export).

## Workflow ao enriquecer ou registrar

1. Consultar conversa (script ou export).
2. Criar/atualizar `conversations/{8hex}-{tool-id}.md` com frontmatter completo + corpo condensado.
3. Atualizar `sources/INDEX.md` (linha na tabela + entrada na lista).
4. Bumpar `last_review` no INDEX e no `episode.md`; atualizar `counts` se usar rollup.
5. Escrever narrativa no `episode.md` citando digest: `(via [digest 7636668b](sources/conversations/7636668b-claude-code.md))`.

**Ordem:** digest antes de narrativa nova baseada na conversa — evita ep sem arquivo de fonte.

## Pacote de knowledge (mesmo principio)

```text
.journey/knowledges/
  NNN-slug/
    knowledge.md
    sources/
      INDEX.md
      conversations/       # conversas desta compilacao
      episodes/            # symlinks ou refs — slugs + link ao digest do ep fonte
        009-criacao-do-fluxo-journey.md   # stub com link para ep package
```

Knowledge reutiliza os mesmos templates de INDEX e conversation digest. Em `compiled_from`, listar **slugs de pacote** de episodio; no INDEX, linkar `../episodes/NNN-slug/sources/conversations/...` quando a fonte for digest ja existente (nao duplicar conversa).

## Compatibilidade (flat legado)

Ate migracao completa, `episodes/NNN-slug.md` (arquivo unico) ainda e aceito. `validate.sh` emite **aviso** `legacy_flat_episode`, nao erro.

Migracao: [`pattern-migration-episode-packages.md`](./pattern-migration-episode-packages.md).

## Renumeracao

Renomear **pasta** `NNN-slug/`, nao arquivo solto. Atualizar:

- `sources/INDEX.md` de eps que referenciem digests movidos;
- refs em `hero.md`, `timeline.md`, `knowledges/`, etc. para `episodes/NNN-slug/episode.md`;
- `derived_from` / `compiled_from` (slugs).

Detalhe operacional herdado de [`pattern-renumeration-safe.md`](./pattern-renumeration-safe.md) — aplicar ao nome da pasta.

## Antipadroes

- listar sessao so no frontmatter do ep sem digest;
- digest sem `storage.path` e sem `note` quando path desconhecido;
- copiar JSONL inteiro no digest (usar condensado; anexar path para re-leitura);
- assumir `claude-code` para toda conversa sem checar origem real;
- duplicar o mesmo `conversation.id` em dois arquivos no mesmo pacote.
