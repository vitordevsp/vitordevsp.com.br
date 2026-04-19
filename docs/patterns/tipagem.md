# Tipagem

## Objetivo

Definir a organizacao oficial de tipos e interfaces do projeto, com foco nos tipos Notion e nos schemas de banco de dados.

## Quando consultar este arquivo

Consulte este arquivo quando for:

- criar novos tipos Notion;
- definir o schema de um banco de dados Notion;
- decidir entre `type` e `interface`;
- revisar a ordem de declaracao de entidades relacionadas.

## Fonte da verdade e limites do documento

Este arquivo cobre:

- tipos de propriedades Notion;
- como criar schemas de banco com `EnsureNotionPropertiesSchema`;
- tipos de blocos de conteudo;
- convencoes de nomenclatura e organizacao.

Este arquivo nao cobre:

- estrutura das funcoes de integracao Notion;
- organizacao de componentes;
- padrao de documentacao.

Para esses temas, consultar:

- [`services.md`](./services.md)
- [`componentes.md`](./componentes.md)
- [`documentacao.md`](./documentacao.md)

## Localizacao dos tipos

```text
src/lib/notion/features/pages/types.ts    ← tipos de pagina, propriedades e schema helper
src/lib/notion/features/blocks/types.ts   ← tipos de blocos (Paragraph, Heading, Code, etc)
src/lib/notion/features/databases/types.ts ← WhereFor, NotionSort, DatabaseItemsResponse
src/types/notion.type.ts                  ← schemas de bancos usados pelas pages (PostProps, etc)
```

## Como criar um schema de banco

Usar `EnsureNotionPropertiesSchema` para garantir tipagem correta das propriedades:

```ts
import { EnsureNotionPropertiesSchema } from "@/lib/notion"
import type {
  NotionTitleProperty,
  NotionSelectProperty,
  NotionRichTextProperty,
  NotionMultiSelectProperty,
  NotionDateProperty,
} from "@/lib/notion"

export type PostProps = EnsureNotionPropertiesSchema<{
  Nome: NotionTitleProperty
  Status: NotionSelectProperty
  Descricao: NotionRichTextProperty
  Tags: NotionMultiSelectProperty<string>
  "Publicado Em": NotionDateProperty
  "Criado Em": NotionDateProperty
  Ano: NotionSelectProperty
}>
```

O schema fica em `src/types/notion.type.ts` e e importado nas pages que fazem query desse banco.

## Tipos de propriedades disponiveis

| Tipo | Uso |
|------|-----|
| `NotionTitleProperty` | Propriedade titulo (array de rich_text) |
| `NotionRichTextProperty` | Texto rico (array de rich_text) |
| `NotionSelectProperty` | Select simples (`{ id, name, color }`) |
| `NotionMultiSelectProperty<T>` | Multi-select (array de `{ id, name, color }`) |
| `NotionDateProperty` | Data (`{ start, end, time_zone }`) |
| `NotionFilesProperty` | Arquivos (array de external/file) |
| `NotionCheckboxProperty` | Booleano |
| `NotionNumberProperty` | Numero |

## Tipos de blocos

Todos os blocos ficam em `src/lib/notion/features/blocks/types.ts`:

- `ParagraphBlock`, `Heading1Block`, `Heading2Block`, `Heading3Block`
- `BulletedListItemBlock`, `NumberedListItemBlock`
- `QuoteBlock`, `CalloutBlock`
- `CodeBlock`, `ImageBlock`, `DividerBlock`
- `AnyNotionBlock` — union de todos os tipos suportados

Usar `AnyNotionBlock` quando a funcao aceitar qualquer tipo de bloco.

## Tipos de resultado de query

```ts
// retorno de getDatabaseItems
type DatabaseItemsResponse<T> = {
  results: NotionPage<T>[]
  nextCursor: string | null
  hasMore: boolean
}

// pagina individual com propriedades tipadas
type NotionPage<T extends NotionPropertiesSchema> = {
  id: string
  properties: T
  // ... metadados da pagina
}
```

## Convencoes de nomenclatura

- nomes claros e estaveis;
- manter o recurso principal explicito no nome (ex: `PostProps`, nao `Props`);
- evitar siglas obscuras;
- declarar primeiro o tipo raiz, depois tipos derivados ou relacionados.

## Uso recomendado de `interface` vs `type`

Uso recomendado de `interface`:

- objetos nomeados e extensoes futuras;
- contratos principais de dominio.

Uso recomendado de `type`:

- unions;
- aliases utilitarios;
- composicoes com operadores de tipo (`EnsureNotionPropertiesSchema<{...}>`);
- mapeamentos ou tipos derivados.

## Checklist de criacao ou revisao

- o schema usa `EnsureNotionPropertiesSchema` com os tipos corretos de propriedades?
- os tipos de bloco usam `AnyNotionBlock` ou tipos especificos quando necessario?
- a declaracao esta do tipo raiz para os derivados?
- `interface` e `type` foram usados com criterio?
- a nomenclatura deixa claro a que banco ou contexto o tipo pertence?
- [`documentacao.md`](./documentacao.md) foi revisado se a tipagem mudou de forma relevante?

## Relacao com outros patterns

- [`services.md`](./services.md) usa estes tipos para queries e schemas de banco.
- [`pages.md`](./pages.md) usa estes tipos ao chamar `getDatabaseItems<T>()` e `getPageById<T>()`.
- [`documentacao.md`](./documentacao.md) define as instrucoes de navegacao no codigo.
