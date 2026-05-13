---
title: TASK-005 - Criar mapper de TextPost
status: draft
priority: P0
type: implementacao
metadata:
  owner: notion-integration
  created_at: 2026-05-13 00:05
  updated_at: 2026-05-13 00:05
  tags:
    - tasks
    - notion
    - mapper
    - garden
---

# TASK-005 - Criar mapper de TextPost

## Objetivo

Implementar `src/integrations/notion/mappers/text-post.mapper.ts`, convertendo uma pagina da database `Textos | Cultivando` em `TextPost`.

## Contexto local

Database `Textos | Cultivando` documentada em [`docs/notion.md`](../../../../../docs/notion.md). Propriedades: `Nome` (title), `Status` (select), `Wiki` (select), `Tags` (multi_select), `Ano` (select), `Descricao` (text), `Publicado Em` (date), `Atualizado Em` (date), `Criado Em` (created_time). Mapeamento `Status` -> `MaturityStage` ja documentado. Slug e definicao de `kind` permanecem pendentes; resolver na execucao da task com base em decisao de produto.

## Escopo

- criar `src/integrations/notion/mappers/text-post.mapper.ts`;
- funcao `toTextPost(page)` retornando `TextPost | null` (null quando item nao publico ou sem slug);
- normalizar:
  - `title` <- `Nome.title`;
  - `description` <- `Descricao.rich_text`;
  - `tags` <- `Tags.multi_select` (array de strings);
  - `maturityStage` <- mapping `Status` -> `MaturityStage`;
  - `publicationStatus` <- regra acordada (ver perguntas em aberto);
  - `kind` <- regra a definir (`Wiki` ou campo dedicado);
  - `createdAt`, `updatedAt`, `publishedAt`;
  - `slug` <- propriedade explicita; se ausente, retornar `null`;
  - `notionPageId` <- `page.id`;
- fallback documentado quando campo opcional faltar;
- nao retornar item sem slug.

## Nao inclui

- queries de feature (`get-text-posts` fica em PLAN-006);
- renderizacao de blocos (TASK-007);
- relacionamentos (`relatedContentIds`) - postergar.

## Entradas e contratos

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Textos | Cultivando";
- [`docs/content-model.md`](../../../../../docs/content-model.md) secao "TextPost";
- `TextPost` definido em TASK-004.

## Resultado esperado

- mapper exportado e tipado;
- aceita objeto page do `@notionhq/client` (ou tipo equivalente).

## Criterios de aceite

- [ ] funcao `toTextPost(page)` exportada;
- [ ] retorna `null` quando item nao publico ou sem slug;
- [ ] normaliza todos os campos mapeaveis;
- [ ] `Status` -> `MaturityStage` segue tabela documentada;
- [ ] `npx tsc --noEmit` passa;
- [ ] sem vazamento de tipos brutos do Notion para fora do modulo.

## Validacao minima

- testar com pagina real em ambiente com env definida;
- verificar lista no `/jardim` quando PLAN-006 conectar.

## Dependencias

- TASK-001 (client);
- TASK-002 (databases);
- TASK-003 (queries);
- TASK-004 (tipos).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)
- [`docs/content-model.md`](../../../../../docs/content-model.md)

## Perguntas em aberto

- politica de publicacao: campo explicito (e.g. `Publicar` checkbox) ou criterio derivado (e.g. tem `Publicado Em` + status maduro)?
- `kind` deriva de `Wiki` ou exige novo campo no Notion?
- regra para slug ausente: excluir ou cair em fallback derivado normalizado?
