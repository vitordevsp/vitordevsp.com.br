---
title: Template de knowledge (post de blog em .journey/knowledges/)
description: Frontmatter e corpo modelo para compilacoes editoriais com voz de agente redator e co-autoria explicita.
metadata:
  author: agents-studio
  last_updated: 2026-05-16 12:00
  version: "1.0.0"
---

# Template de knowledge

Copie para `.journey/knowledges/NNN-titulo-em-kebab.md`. Numeracao zero-pad independente de `episodes/` (ex.: `001-`, `002-`).

## Frontmatter (contrato)

```yaml
---
title: "Titulo editorial do post (nao precisa EP-NNN)"
status: draft | revisao-humana | pronto-publicar | publicado
format: blog-post
metadata:
  owner: journey-writer
  voice: knowledge-redactor
  created_at: AAAA-MM-DD HH:MM
  updated_at: AAAA-MM-DD HH:MM
  exposure: privado | semi-publico | publico
  authors:
    redactor: agente redator da journey (LLM via journey-writer)
    co_author: Vitor Sampaio
  compiled_from:
    episodes:
      - 007-skills-trazidas-do-agents-studio
      - 009-criacao-do-fluxo-journey
    notes: []
    sessions: []
  tags:
    - knowledge
    - sdd
  tese: "Uma frase: sobre o que e este post"
  sources:
    last_review: AAAA-MM-DD HH:MM
---
```

| Campo | Obrigatorio | Notas |
|-------|-------------|--------|
| `title` | sim | titulo publico |
| `status` | sim | `draft` ate co-autor humano revisar |
| `format` | sim | `blog-post` (reservar outros formatos no futuro) |
| `metadata.voice` | sim | sempre `knowledge-redactor` nesta skill |
| `metadata.authors` | sim | redator + co_author explicitos |
| `metadata.compiled_from` | sim | slugs sem `.md` |
| `metadata.exposure` | sim | respeitar antes de publicar fora do repo |
| `metadata.tese` | sim | ancora editorial |
| `metadata.sources.last_review` | sim | bump ao refinar |

## Corpo modelo

Substitua placeholders. Mantenha voz em **primeira pessoa do agente**.

```md
# {Titulo editorial}

Eu começo este texto admitindo o obvio: sou um agente de linguagem, não o Vitor no teclado. O que segue é minha compilação do que está registrado na journey — com o olhar de quem leu os episódios e quis transformar bastidor em post.

## Por que isso importa agora

{gancho em 2–4 parágrafos: tensão, pergunta ou paradoxo que o leitor reconhece}

## O que os episódios mostram

{destilar fatos dos eps — citar ep e, quando houver, quote do Vitor}

> O Vitor disse (via ep-007): «citação verbatim se existir»

> Leitura minha: {inferência do agente, separada}

## O que eu acrescento da conversa de hoje

{observações novas que o usuário trouxe nesta sessão e que ainda não viraram ep}

## Fechamento

{1–2 parágrafos: o que ficou em aberto, convite honesto}

## Creditos e como este texto foi feito

Escrito por mim, agente redator da journey (via skill `journey-writer`), em primeira pessoa.
**Co-autor:** Vitor Sampaio — {papel específico neste post: decisões, observações, correções}.
**Fontes:** {lista de episodes/notes/sessions}
**O que eu fiz:** compilar, costurar narrativa, propor leituras.
**O que não fiz:** fingir autoria exclusiva humana; inventar fatos fora das fontes.

## Referências da journey

- [EP-007 — …](../episodes/007-skills-trazidas-do-agents-studio.md)
- [EP-009 — …](../episodes/009-criacao-do-fluxo-journey.md)
```

## README da pasta

Ao inicializar `.journey/`, copie também [`template-knowledges-readme.md`](./template-knowledges-readme.md) para `.journey/knowledges/README.md`.
