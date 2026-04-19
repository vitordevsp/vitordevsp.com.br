# Integracao Notion

## Objetivo

Definir como a integracao com o Notion deve ser usada, qual sistema usar para cada situacao e como os dados fluem do Notion para as pages.

## Quando consultar este arquivo

Consulte este arquivo quando for:

- buscar dados do Notion em uma page;
- criar ou expandir um tipo de database Notion;
- decidir entre o sistema moderno e o legacy;
- entender quais funcoes e tipos estao disponiveis.

## Fonte da verdade e limites do documento

Este arquivo cobre:

- papel e estrutura de `src/lib/notion/` (sistema moderno);
- papel e estrutura de `src/app/api/notion/_resources/` (sistema legacy);
- funcoes publicas de cada sistema;
- variaveis de ambiente relacionadas.

Este arquivo nao cobre:

- renderizacao de blocos Notion (ver `PageRenderer`);
- organizacao de componentes;
- detalhes de tipagem.

Para esses temas, consultar:

- [`tipagem.md`](./tipagem.md)
- [`componentes.md`](./componentes.md)
- [`pages.md`](./pages.md)

## Sistema moderno — `src/lib/notion/`

O sistema moderno e a forma preferida de integrar com o Notion. Use-o para todas as funcionalidades novas.

### Estrutura

```text
src/lib/notion/
  client.ts                      ← cliente Notion singleton
  index.ts                       ← exports centralizados
  components/
    PageRenderer/                ← renderiza array de blocos em JSX
    RichTextRender/              ← renderiza rich text com anotacoes inline
  features/
    databases/
      index.ts                   ← getDatabaseItems, getDatabaseProps
      types.ts                   ← WhereFor, NotionSort, DatabaseItemsResponse
      filters.ts                 ← construtor de filtros tipados
    pages/
      index.ts                   ← getPageById
      types.ts                   ← NotionPage, NotionPropertiesSchema, PostProps
    blocks/
      index.ts                   ← getBlockChildren, getAllBlockChildren, richTextToPlain
      types.ts                   ← AnyNotionBlock e todos os tipos de bloco
  helpers/
    utils.ts                     ← generateNotionPageSlug, generateNotionPageID, parseDateDisplay
```

### Funcoes principais

**`getDatabaseItems<T>(databaseId, options?)`**

Query tipada de banco de dados.

```ts
const { results, nextCursor, hasMore } = await getDatabaseItems<PostProps>(
  process.env.NOTION_DB_POSTS!,
  {
    where: { Status: { equals: "Published" } },
    sort: [{ property: "Publicado Em", direction: "descending" }],
    pageSize: 10,
    startCursor: cursor,
  }
)
```

Opcoes de `where` suportam logica `and`/`or`, operacoes em `multi_select` (`any_of`, `all_of`, `none_of`) e operadores por tipo de propriedade.

**`getPageById<T>(pageId)`**

Busca metadados e propriedades de uma pagina pelo ID (sem blocos de conteudo).

```ts
const page = await getPageById<PostProps>(pageId)
```

**`getAllBlockChildren(blockId, options?)`**

Busca recursivamente todos os blocos de uma pagina com paginacao.

```ts
const blocks = await getAllBlockChildren(pageId, { deep: true })
```

Com `deep: true`, busca os filhos de cada bloco que tenha `has_children = true`.

**`richTextRender(richText)`**

Converte array de `NotionRichTextNode[]` em React elements com anotacoes (bold, italic, code, links, cores).

### Variaveis de ambiente

| Variavel | Uso |
|----------|-----|
| `NOTION_TOKEN` | Token de autenticacao (sistema moderno) |
| `NOTION_DB_POSTS` | ID do banco de posts |
| `NOTION_DB_VIDEOS` | ID do banco de videos (a migrar para moderno) |
| `NOTION_DB_PROJECTS` | ID do banco de projetos (a migrar para moderno) |

## Sistema legacy — `src/app/api/notion/_resources/`

O sistema legacy ainda esta ativo para videos e projetos. Esta em processo de migracao para o sistema moderno (ver `docs/plans/PLAN-001-migracao-notion-legacy/`).

### Estrutura

```text
src/app/api/notion/_resources/
  notionRepository/
    notionRepository.ts          ← getDatabase, getPage, getBlocksFromPage
  modules/
    videos/
      services/videoService.ts   ← videoService.list()
    projects/
      services/projectService.ts ← projectService.list()
```

### Variaveis de ambiente

| Variavel | Uso |
|----------|-----|
| `NOTION_KEY` | Token de autenticacao (sistema legacy) |
| `NOTION_DATABASE_ID` | ID do banco principal legacy |
| `NOTION_DB_POSTS` | ID do banco de posts (compartilhado com moderno) |

## Regra de uso

- **Novas funcionalidades**: usar sempre o sistema moderno (`src/lib/notion/`).
- **Videos e projetos**: ainda usam o legacy; migrar para o moderno conforme o plano PLAN-001.
- **Nao duplicar**: nunca reimplementar na page logica que ja existe nas funcoes publicas de `src/lib/notion/`.

## Checklist de criacao ou revisao

- esta usando o sistema moderno para a funcionalidade nova?
- o `databaseId` esta sendo passado como parametro (nao hardcoded)?
- os tipos de propriedades estao definidos com `EnsureNotionPropertiesSchema`?
- `getAllBlockChildren` com `deep: true` so e chamado quando realmente necessario?
- [`tipagem.md`](./tipagem.md) foi consultado para os tipos Notion?
- [`documentacao.md`](./documentacao.md) foi revisado no fechamento?

## Relacao com outros patterns

- [`tipagem.md`](./tipagem.md) define os tipos Notion e como criar schemas de banco.
- [`pages.md`](./pages.md) define como as pages consomem as funcoes deste sistema.
- [`componentes.md`](./componentes.md) define como os componentes recebem os dados ja processados.
