# @/lib/notion

Wrapper interno sobre o [`@notionhq/client`](https://github.com/makenotion/notion-sdk-js) usado como camada de integração com o Notion em todo o projeto. Entrega queries tipadas de database, leitura recursiva de blocks, renderer de blocks/rich text em JSX e helpers de slug/ID.

Esta não é uma biblioteca publicada no npm — é interna ao projeto, importada via alias `@/lib/notion`. A documentação abaixo segue formato de README de lib para facilitar leitura e onboarding.

## Conteúdo

- [Setup](#setup)
- [Uso rápido](#uso-rápido)
- [Módulos](#módulos)
- [Tipagem de database](#tipagem-de-database)
- [DSL de filtros](#dsl-de-filtros)
- [Erros e limites](#erros-e-limites)
- [Versionamento da API](#versionamento-da-api)
- [Fora do escopo](#fora-do-escopo)
- [Referências](#referências)

## Setup

Requer as variáveis de ambiente:

```env
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=<id-do-database-principal>
NOTION_DB_POSTS=<id-do-database-de-posts>
```

`NOTION_TOKEN` é o token da integração interna ([docs](../../../docs/resources/notion-docs/guides/get-started/internal-integrations.md)). O database precisa estar conectado à integração na UI do Notion, senão as chamadas retornam 404.

`.env.example` na raiz do projeto lista os valores esperados.

## Uso rápido

Listar itens de um database com filtro e sort:

```ts
import {
  getDatabaseItems,
  EnsureNotionPropertiesSchema,
  NotionTitleProperty,
  NotionSelectProperty,
} from "@/lib/notion"

type PostProperties = EnsureNotionPropertiesSchema<{
  Title: NotionTitleProperty
  Status: NotionSelectProperty<"Draft" | "Published">
}>

const { results, hasMore, nextCursor } = await getDatabaseItems<PostProperties>({
  where: { property: "Status", type: "select", op: "equals", value: "Published" },
  sorts: [{ property: "Title", direction: "ascending" }],
})
```

Ler metadados de uma página e renderizar seu conteúdo:

```ts
import { getPageById, getAllBlockChildren, PageRenderer } from "@/lib/notion"

const page = await getPageById<PostProperties>(pageId)
const blocks = await getAllBlockChildren(pageId, { deep: true })

return <PageRenderer blocks={blocks} />
```

## Módulos

### Client — [`client.ts`](./client.ts)

Instância singleton do `Client` do SDK oficial. Lê `NOTION_TOKEN` do ambiente.

```ts
import { notion } from "@/lib/notion"
```

### Blocks — [`features/blocks/`](./features/blocks)

Leitura paginada e recursiva de blocks de uma página.

| Export | Descrição |
|---|---|
| `getBlockChildren(blockId, opts?)` | Lê uma página de children (cursor-based). `pageSize` default 100 (max 100). |
| `getAllBlockChildren(blockId, { deep? })` | Varre toda a paginação. Com `deep: true`, também busca filhos de blocks com `has_children: true` e anexa em `__children`. |
| `richTextToPlain(nodes)` | Converte `NotionRichTextNode[]` em string plana (concatena `plain_text`). |
| `AnyNotionBlock` | Union dos tipos de block mapeados (paragraph, headings, listas, quote, callout, code, image, divider + fallback). |

### Databases — [`features/databases/`](./features/databases)

Query tipada de database.

| Export | Descrição |
|---|---|
| `getDatabaseItems<P>(opts?)` | Query com paginação, filtros (DSL) e sorts. Usa `NOTION_DATABASE_ID`. |
| `getDatabaseProps<P>()` | Metadata do database (retrieve). |
| `GetDatabaseItemsOptions<P>` | `{ startCursor?, pageSize?, where?, sorts? }` |
| `DatabaseItemsResponse<T>` | `{ results, nextCursor, hasMore }` |
| `WhereFor<P>` | Filtro tipado amarrado ao schema `P`. |
| `NotionSortFor<P>` | Sort tipado amarrado a `P`. |

Veja [`specs.md`](./features/databases/specs.md) para o comportamento completo da DSL.

### Pages — [`features/pages/`](./features/pages)

Leitura de metadados de página (sem conteúdo — para conteúdo, ver Blocks).

| Export | Descrição |
|---|---|
| `getPageById<P>(pageId)` | Retorna `NotionPage<P>` com propriedades tipadas. |
| `NotionPage<P>` | Objeto page: cover, icon, parent, properties, timestamps. |
| `NotionPropertiesSchema` | `Record<string, NotionAnyProperty>` — base para schemas tipados. |
| `EnsureNotionPropertiesSchema<P>` | Helper de compile-time que força o schema a respeitar `NotionPropertiesSchema`. |
| `NotionTitleProperty`, `NotionSelectProperty`, `NotionMultiSelectProperty`, `NotionDateProperty`, `NotionFilesProperty`, `NotionRichTextProperty` | Tipos por família de propriedade. |
| `NotionRichTextNode` | Item de rich text (text + annotations + link). |

### Components — [`components/`](./components)

Renderização de conteúdo do Notion em JSX.

| Export | Descrição |
|---|---|
| `PageRenderer` | Componente que recebe `blocks: BaseBlock[]` e devolve um `<article>` com JSX. Suporta `overrides` por tipo de block. |
| `richTextRender(nodes)` | Função que converte rich text em JSX respeitando anotações (bold/italic/code/link/cor). |

Ver [`PageRenderer/specs.md`](./components/PageRenderer/specs.md) para os tipos de block suportados e o comportamento de overrides.

### Helpers — [`helpers/utils.ts`](./helpers/utils.ts)

| Export | Descrição |
|---|---|
| `generateNotionPageID(slug)` | Extrai o ID do Notion a partir do final do slug. **Limitação conhecida**: depende de hífen no slug — ver [PLAN-002-T002](../../../docs/plans/PLAN-002-refactor-notion/tasks/P002-T002.md). |
| `generateNotionPageSlug(url)` | Remove `https://www.notion.so/` da URL. |
| `parseDateDisplay(iso, timeZone?)` | Formata `YYYY-MM-DD` em `"21 de abril de 2026"` (pt-BR). |

## Tipagem de database

A lib não sabe qual database você está consultando — você informa o schema via parâmetro genérico `P`.

```ts
type PostProperties = EnsureNotionPropertiesSchema<{
  Title: NotionTitleProperty
  Status: NotionSelectProperty<"Draft" | "Published">
  Tags: NotionMultiSelectProperty<"dev" | "design" | "life">
  "Published At": NotionDateProperty
}>
```

O wrapper `EnsureNotionPropertiesSchema<P>` força compile-time check: a entrada tem que satisfazer `Record<string, NotionAnyProperty>`, e `P` permanece literal (preserva as chaves pra amarrar ao `where`/`sorts`).

Consumo em query fica:

```ts
await getDatabaseItems<PostProperties>({
  where: {
    and: [
      { property: "Status", type: "select", op: "equals", value: "Published" },
      { property: "Tags", type: "multi_select", op: "any_of", value: ["dev", "design"] },
    ],
  },
  sorts: [{ property: "Published At", direction: "descending" }],
})
```

O nome das propriedades é validado contra `P` no TS.

## DSL de filtros

`where` aceita um filtro único, um array (implícito AND) ou uma árvore com `and`/`or` aninhados.

**Filtro único:**
```ts
{ property: "Status", type: "select", op: "equals", value: "Published" }
```

**Array (= AND):**
```ts
[
  { property: "Status", type: "select", op: "equals", value: "Published" },
  { property: "Tags", type: "multi_select", op: "contains", value: "dev" },
]
```

**Árvore:**
```ts
{
  and: [
    { property: "Status", type: "select", op: "equals", value: "Published" },
    { or: [
      { property: "Tags", type: "multi_select", op: "contains", value: "dev" },
      { property: "Tags", type: "multi_select", op: "contains", value: "design" },
    ] },
  ],
}
```

**Açúcar pra multi-select:**
```ts
// Qualquer um dos valores bate
{ property: "Tags", type: "multi_select", op: "any_of", value: ["dev", "design"] }

// Todos têm que bater
{ property: "Tags", type: "multi_select", op: "all_of", value: ["featured", "tutorial"] }

// Nenhum pode bater
{ property: "Tags", type: "multi_select", op: "none_of", value: ["draft"] }
```

**Escape hatch** — caso o operador desejado não esteja coberto pela DSL:
```ts
{ raw: { property: "...", some_notion_native_filter: { ... } } }
```

### Regras de limpeza

O `toNotionFilter` aplica três passadas de normalização no input antes de enviar ao SDK:

1. **Drop de valores vazios**: `value` `undefined`, `null` ou string vazia → filtro inteiro descartado. Não envia filtro no-op pra API.
2. **Flatten** de grupos com o mesmo operador: `and(and(a, b), c)` vira `and(a, b, c)`.
3. **Collapse** de grupos degenerados: `and([x])` → `x`, `and([])` → `undefined`.

O resultado é um filtro mínimo equivalente ao input original.

Tipos e operadores completos em [`features/databases/types.ts`](./features/databases/types.ts). Semântica detalhada em [`features/databases/specs.md`](./features/databases/specs.md).

## Erros e limites

### Rate limit

A API do Notion permite **3 requests/segundo em média** com bursts tolerados. Em caso de 429, a resposta traz header `Retry-After` (segundos).

Esta lib **não implementa retry automático** (delegado ao SDK oficial, que faz retry de rede padrão). Em leituras pesadas (`getAllBlockChildren` com `deep: true` em uma página com muitos toggles aninhados) é possível estourar — há plano de endereçar em [PLAN-002-T001](../../../docs/plans/PLAN-002-refactor-notion/tasks/P002-T001.md).

### Paginação

Endpoints de lista usam cursor-based pagination: `start_cursor` de entrada, `has_more` + `next_cursor` de saída. Default 10 itens, máximo 100 (a lib já pede 100 por padrão). Ver [reference/intro.md](../../../docs/resources/notion-docs/reference/intro.md).

`getAllBlockChildren` varre toda a paginação automaticamente; `getBlockChildren` devolve uma página e deixa o cursor com o chamador.

### Expiração de URL de arquivo

Imagens do tipo `file` (upload do Notion) retornam URL com `expiry_time`. Se a página for cacheada, a URL expira — revalidar quando o consumo for server-side rendering com cache longo.

## Versionamento da API

O cliente atual **não fixa** `Notion-Version` — herda o default do SDK. Versão atual da API: `2026-03-11` ([versioning](../../../docs/resources/notion-docs/reference/versioning.md)). Versão do SDK instalada: `@notionhq/client@^4.0.2`.

Fixar a versão explicitamente é a direção do [PLAN-002-T006](../../../docs/plans/PLAN-002-refactor-notion/tasks/P002-T006.md).

A mudança 2025-09-03 introduziu `data_sources` como camada entre `database` e entries — a migração do wrapper para `data_sources.query` está planejada em [PLAN-002-T007](../../../docs/plans/PLAN-002-refactor-notion/tasks/P002-T007.md).

## Fora do escopo

Esta lib cobre **leitura** de database/page/blocks e **renderização** desses blocks em JSX. Não cobre:

- Criar, atualizar ou deletar pages/databases/blocks (endpoints de escrita).
- Comentários, webhooks, search, users, views, uploads de arquivo.
- OAuth de integrações públicas (só internas).
- MCP, link previews.

Se algum desses entrar em uso, adicionar sob `features/`.

Alguns **tipos de block** não têm renderização explícita no `PageRenderer` e caem em fallback silencioso: `audio`, `bookmark`, `breadcrumb`, `child_database`, `child_page`, `column_list`/`column`, `embed`, `equation`, `file`, `link_preview`, `mention`, `pdf`, `synced_block`, `table`, `table_of_contents`, `tab`, `template`, `transcription`, `video`. Ver [specs do PageRenderer](./components/PageRenderer/specs.md#tipos-suportados).

## Referências

- [docs/patterns/services.md](../../../docs/patterns/services.md) — padrão oficial da integração neste repositório (moderno × legacy).
- [docs/resources/notion-docs/](../../../docs/resources/notion-docs/) — clone local da doc oficial (snapshot 2026-04-21), recortado para o que esta lib exercita.
- [docs/plans/PLAN-002-refactor-notion/](../../../docs/plans/PLAN-002-refactor-notion/) — plano de refactor em andamento.
- SDK oficial: [`@notionhq/client`](https://github.com/makenotion/notion-sdk-js).
