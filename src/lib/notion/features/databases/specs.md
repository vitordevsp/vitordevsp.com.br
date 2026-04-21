# Specs — DSL de filtros de database

## Objetivo

Permitir escrever filtros de query de database do Notion de forma tipada e concisa, amarrando o nome das propriedades ao schema do database. O resultado é traduzido para o formato nativo esperado pela API do Notion.

A DSL mora em `types.ts` e `filters.ts`. O ponto de entrada público é `toNotionFilter`, chamado internamente por `getDatabaseItems`.

## Responsabilidades

- Aceitar três formas de entrada: filtro único, array (AND implícito), árvore com `and`/`or` aninhados.
- Traduzir cada filtro de propriedade para o shape nativo da API do Notion.
- Normalizar a árvore: remover valores vazios, achatar grupos redundantes, colapsar grupos degenerados.
- Expor açúcar sintático para multi-select (`any_of`, `all_of`, `none_of`) que não existe como operador nativo.
- Oferecer escape hatch (`raw`) para casos fora da DSL.

## Formas de entrada

### Filtro único

```ts
{ property: "Status", type: "select", op: "equals", value: "Published" }
```

### Array de filtros (AND implícito)

```ts
[
  { property: "Status", type: "select", op: "equals", value: "Published" },
  { property: "Tags", type: "multi_select", op: "contains", value: "dev" },
]
```

Equivalente a envolver num `{ and: [...] }`.

### Árvore com `and`/`or`

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

Quando um nó tem tanto `and` quanto `or`, o `or` é aninhado como cláusula do `and`:
`{ and: [...and, { or: [...or] }] }`.

### Escape hatch

```ts
{ raw: { property: "Extra", rollup: { any: { /* ... */ } } } }
```

Passa direto pro payload da API sem transformação. Usar quando a DSL ainda não cobrir o operador desejado.

## Operadores por tipo

### title / rich_text

| Operador | Valor |
|---|---|
| `contains`, `does_not_contain`, `equals`, `does_not_equal`, `starts_with`, `ends_with` | `string` |
| `is_empty`, `is_not_empty` | — |

String vazia ou `undefined` → filtro descartado.

### select / status

| Operador | Valor |
|---|---|
| `equals`, `does_not_equal` | `string` |
| `is_empty`, `is_not_empty` | — |

### multi_select

Operadores nativos da API:

| Operador | Valor aceito |
|---|---|
| `contains`, `does_not_contain` | `string` **ou** `string[]` (açúcar) |

Se `string[]` é passado para `contains`, a DSL expande para `or`. Se para `does_not_contain`, expande para `and` (nenhum dos itens pode aparecer).

Açúcar de alto nível:

| Operador | Semântica | Tradução |
|---|---|---|
| `any_of: [a, b, c]` | Bate se **qualquer um** estiver presente | `or` de `contains: a/b/c` |
| `all_of: [a, b, c]` | Bate se **todos** estão presentes | `and` de `contains: a/b/c` |
| `none_of: [a, b, c]` | Bate se **nenhum** está presente | `and` de `does_not_contain: a/b/c` |

### date

| Operador | Valor |
|---|---|
| `equals`, `before`, `after`, `on_or_before`, `on_or_after` | `string` ISO 8601 |
| `past_week`, `past_month`, `past_year`, `next_week`, `next_month`, `next_year` | — |
| `is_empty`, `is_not_empty` | — |

### number

| Operador | Valor |
|---|---|
| `equals`, `does_not_equal`, `greater_than`, `less_than`, `greater_than_or_equal_to`, `less_than_or_equal_to` | `number` |
| `is_empty`, `is_not_empty` | — |

`null`, `undefined` ou `NaN` → filtro descartado.

### checkbox

| Operador | Valor |
|---|---|
| `equals`, `does_not_equal` | `boolean` |

`null`/`undefined` → descartado.

## Normalização

`toNotionFilter` aplica três passadas no input, nesta ordem:

### 1. `build` — tradução e drop de vazios

Para cada filtro de propriedade, mapeia para o shape nativo e devolve `undefined` quando o valor é ineficaz (string vazia, `null`, etc.). Um `undefined` que sobe pela árvore é tratado como cláusula a ser ignorada.

### 2. `flattenSameOps` — achata grupos com mesmo operador

```
and(a, and(b, c))    →  and(a, b, c)
or(a, or(b, or(c)))  →  or(a, b, c)
```

Operadores diferentes não são achatados: `and(a, or(b, c))` permanece.

### 3. `collapseShallow` — colapsa grupos degenerados

```
and([x])   →  x
or([x])    →  x
and([])    →  undefined
or([])     →  undefined
```

O resultado final é o filtro mínimo equivalente ao input. Se tudo zerou, o filtro some da requisição.

## Regras importantes

- A DSL **não valida** se o nome da propriedade existe de fato no database — isso fica a cargo do tipo genérico `WhereFor<P>` em compile-time.
- **Operador desconhecido** em `build` faz `console.error` e retorna `undefined` (filtro silenciosamente descartado). Isso é diferente de operador errado dentro de um mapeador específico, que lança `Error` — conduta inconsistente e candidata a revisão.
- A DSL **não suporta** todos os tipos nativos da API (ex.: formula, rollup, people, relation, files, url, email, phone_number). Para esses, usar `raw`.
- O `types.ts` define `WhereFor<P>` e `NotionSortFor<P>` — quando o consumidor passa um tipo `P` de schema, os nomes de `property` e `timestamp` ficam amarrados a `keyof P`.

## Dependências

- `./types` — definições de `PropFilter`, `LogicNode`, `QueryFilter`, `WhereFor`, `NotionSortFor`.
- Consumido por `./index.ts` (`getDatabaseItems`).

## Não pertence à DSL

- Executar a query — é responsabilidade de `getDatabaseItems`.
- Validar o schema do database — compile-time via `NotionPropertiesSchema`.
- Aplicar sort — `sorts` é array separado, não passa pelo `toNotionFilter`.
- Suportar a migração para `data_sources.query` — o shape de filtro é o mesmo entre os dois endpoints, então a DSL não precisa mudar em PLAN-002-T007.

## Referências

- [reference/filter-data-source-entries.md](../../../../../docs/resources/notion-docs/reference/filter-data-source-entries.md) — spec oficial do filtro (versão moderna).
- [reference/post-database-query-filter.md](../../../../../docs/resources/notion-docs/reference/post-database-query-filter.md) — spec oficial (versão legada, mesmo shape).
- [README da lib](../../README.md#dsl-de-filtros)
