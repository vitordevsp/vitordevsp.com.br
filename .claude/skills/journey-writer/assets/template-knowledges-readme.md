---
title: Template do README de .journey/knowledges/
description: Explica a camada de posts de blog com co-autoria agente + humano.
metadata:
  author: agents-studio
  last_updated: 2026-05-16 12:00
  version: "1.0.0"
---

# Template do README de knowledges/

Copie para `.journey/knowledges/README.md`.

````md
# knowledges

Posts editoriais de blog compilados a partir da journey — **escritos em primeira pessoa pelo agente redator**, com **co-autoria explícita** do humano do projeto.

## Por que esta pasta existe

`episodes/` é bastidor: registro fiel da travessia com fontes.

`knowledges/` é palco: texto para o jardim digital, com voz honesta de quem redigiu (o agente) e de quem viveu e decidiu (o co-autor humano).

Não fingimos que o humano digitou tudo sozinho quando a maior parte do texto corrido saiu do modelo.

## Como ler

1. Confira o bloco **Creditos e como este texto foi feito** no final de cada post.
2. Siga as refs para `episodes/` quando quiser a versão com fontes e números.
3. Use `seeds/content-seeds.md` para ideias ainda não compiladas.

## Como criar

Invoque a skill `journey-writer` com `compilar-conhecimento` (ou "escrever knowledge sobre …").

Spec de voz e workflow: [`.claude/skills/journey-writer/references/pattern-knowledge-authoring.md`](../../.claude/skills/journey-writer/references/pattern-knowledge-authoring.md)

Template: [`.claude/skills/journey-writer/assets/template-knowledge.md`](../../.claude/skills/journey-writer/assets/template-knowledge.md)

## Convenções

- Arquivos: `NNN-titulo-em-kebab.md` (numeração própria, começa em `001`)
- `status`: `draft` → `revisao-humana` → `pronto-publicar` → `publicado`
- Todo knowledge lista `compiled_from` no frontmatter
````
