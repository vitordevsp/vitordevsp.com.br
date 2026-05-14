---
title: Template de episodio
description: Base copiavel para `.journey/episodes/NNN-titulo.md`, com frontmatter padronizado, gancho, contexto, conflito, virada, aprendizado, conteudo publico e perguntas.
metadata:
  author: agents-studio
  last_updated: 2026-05-13 21:00
  version: "1.1.0"
---

# Template de episodio

Episodios de `.journey/` nao moram em arquivo dedicado dentro da pasta. Este template e a unica referencia copiavel; vive aqui na skill.

Ao criar um episodio novo, copie o bloco abaixo para `.journey/episodes/NNN-titulo-em-kebab.md` (numeracao incremental zero-pad, comecando em `001`).

## Frontmatter

```yaml
---
title: EP-NNN - Titulo do episodio
status: draft
type: cronologico
metadata:
  owner: journey-writer
  created_at: AAAA-MM-DD HH:MM
  updated_at: AAAA-MM-DD HH:MM
  tags:
    - episode
  era: atemporal
  lentes: []
  sources:
    sessions: []
    commits: []
    files: []
    last_review: AAAA-MM-DD HH:MM
---
```

### Campos do frontmatter

| Campo | Valores possiveis |
|---|---|
| `title` | `EP-NNN - Titulo` |
| `status` | `draft`, `refinando`, `refinado`, `publicado` |
| `type` | `introducao`, `cronologico`, `meta`, `retrospectiva` |
| `metadata.owner` | `journey-writer` (default), ou skill responsavel |
| `metadata.tags` | `episode` + tags tematicas (`docs`, `skills`, `notion`, `reset`, etc) |
| `metadata.era` | `atemporal`, `v1`, `v2`, `v1-v2`, `v3`, `v3.1`, `v3.2` |
| `metadata.lentes` | combinacao de `chamado`, `atrito`, `descoberta`, `metodo`, `transformacao`, `oferta` |
| `metadata.sources.sessions` | lista de IDs de sessoes JSONL ja consultadas (evita rever) |
| `metadata.sources.commits` | hashes curtos de commits-chave |
| `metadata.sources.files` | paths consultados (planos, skills, docs, CHANGELOG) |
| `metadata.sources.branches` | branches git relevantes (quando o ep cobre mais de uma) |
| `metadata.sources.derived_from` | slugs de outros eps que servem de fonte (so para meta/intro) |
| `metadata.sources.external_rescues` | resgates feitos via LLM externo (`gpt-4`, `claude.ai`, etc) com `llm`, `date`, `assunto`, `exposicao`, `summary` |
| `metadata.sources.note` | observacao curta sobre origem do material |
| `metadata.sources.last_review` | `AAAA-MM-DD HH:MM` da ultima vez que sources foi atualizado |

### Por que `sources` existe

`sources` e mecanismo de controle pra `journey-writer` saber quais sessoes ja foram lidas em rodadas anteriores. Sem isso, cada refinamento releria as mesmas conversas. Com isso, o proximo agente lendo o ep sabe o que ja foi consultado e pode focar em material novo.

Convencao:
- **sessoes:** IDs vivem em `~/.claude/projects/<encoded-cwd>/<id>.jsonl`. Formato UUID completo. Cada entrada pode ter `id`, `date`, `relevance` (`primary` ou `secondary`) e `summary` curto;
- **commits:** hashes curtos (7 chars), os mais relevantes (nao todos);
- **files:** paths relativos a raiz do repo;
- **branches:** so quando o ep cruza branches;
- **derived_from:** so para eps `meta`/`introducao` que consolidam outros;
- **note:** opcional; explica peculiaridade de fonte (ex: "anterior a sessoes Claude Code");
- **last_review:** atualizar toda vez que sources for tocado.

### Forma esperada do bloco sources expandido

```yaml
sources:
  sessions:
    - id: 748c1940-398e-419a-8ab2-38107bb479f3
      date: 2026-05-12
      relevance: primary
      summary: descricao curta do que foi extraido
  commits:
    - 1ae4ffc
    - 16af8bd
  files:
    - docs/
    - .claude/plans/
  branches:
    - claude_experiment
  derived_from:
    - 002-v1-e-v2-anos-de-aprendizado-base
  external_rescues:
    - llm: gpt-4
      date: 2026-05-15
      assunto: motivacao real para apagar a v3.1.x
      exposicao: privado
      summary: usuario lembrou tres frustracoes especificas; duas viraram quotes verbatim no ep
  note: opcional, contexto de origem
  last_review: 2026-05-13 20:30
```

Nem todo ep precisa de todos os campos. `sessions` vazio com `note` explicativa e valido para eps anteriores ao registro de conversas. `external_rescues` so existe quando `gerar-prompt-externo` + `absorver-resgate-externo` foram usados.

## Corpo do episodio

```md
# EP-NNN — Titulo do episodio

## Gancho

Abertura curta que captura a tensao principal do episodio.

## Contexto

O que estava acontecendo na jornada neste momento.

## Conflito

Qual problema, duvida, friccao ou limite apareceu.

## Virada

Qual percepcao, decisao ou mudanca de direcao surgiu.

## Aprendizado

O que esse episodio ensina sobre SDD, agentes, contexto ou criacao de produto.

## Possivel conteudo publico

- Formato sugerido: post | video | aula | newsletter | thread | lead magnet
- Titulo possivel:
- Promessa:
- Publico:

## Perguntas abertas

- [ ] Pergunta 1
- [ ] Pergunta 2

## Fragmentos aproveitaveis

> Trechos, frases ou ideias que podem ser reaproveitados depois.

## Commits relacionados

- `hash` (AAAA-MM-DD): descricao curta.
```

## Regras de uso

- numerar episodios em sequencia (`001`, `002`, ...) zero-pad de tres digitos;
- atualizar `status` no frontmatter conforme o ep amadurece (`draft` -> `refinando` -> `refinado` -> `publicado`);
- marcar hipoteses no corpo com `> Hipotese editorial:`;
- atualizar `metadata.sources.last_review` toda vez que mexer em fontes ou enriquecer o ep;
- nao criar `000-template.md` em `.journey/episodes/` — este template ja vive na skill, copia direto daqui.
