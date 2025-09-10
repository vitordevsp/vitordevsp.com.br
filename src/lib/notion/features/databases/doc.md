# wrapper de filtros ( `where` ) para consultas Notion — SUMÁRIO

## Contexto:

* A Notion API usa um único campo `filter` em `POST /v1/databases/{id}/query`
  (ou `POST /v1/data_sources/{id}/query` em versões recentes) para limitar os resultados.
  Nosso parâmetro `where` é apenas um *wrapper* DX que gerará esse `filter` .
  Doc: Query a database / Filter database entries.
  + https://developers.notion.com/reference/post-database-query
  + https://developers.notion.com/reference/post-database-query-filter
  + (novo) https://developers.notion.com/reference/filter-data-source-entries

### Forma geral (oficial Notion):

* Filtros por propriedade: { property: "Name", rich_text|title|select|multi_select|status|date|number|checkbox: { <op> } }
* Filtros compostos: { and: [ ... ] } ou { or: [ ... ] }, com possibilidade de aninhar grupos.

### AND/OR:

* `and`: todas as condições do array devem ser verdadeiras.
* `or`: pelo menos uma condição do array deve ser verdadeira.
* É possível aninhar: { and: [ condA, { or: [ condB, condC ] } ] }.

### Operadores comuns por tipo (subset):

* rich_text/title: contains | does_not_contain | equals | does_not_equal | starts_with | ends_with | is_empty | is_not_empty
* select/status:   equals | does_not_equal | is_empty | is_not_empty
* multi_select:    contains | does_not_contain  (Notion aceita um valor por condição)
* number:          equals | does_not_equal | greater_than | less_than | greater_than_or_equal_to | less_than_or_equal_to | is_empty | is_not_empty
* date:            before | after | on_or_before | on_or_after | equals | past_week | past_month | past_year | next_week | next_month | next_year | is_empty | is_not_empty
* checkbox:        equals | does_not_equal

### Açúcar sintático do wrapper (helpers não-oficiais, expandidos pelo builder):

* multi_select.any_of:  Array<string>  → vira OR de várias condições `multi_select.contains`
  ex.: { property:"Tags", type:"multi_select", op:"any_of", value:["JS", "CSS"] }
  → { or: [
  { property:"Tags", multi_select:{ contains:"JS" } }, 
  { property:"Tags", multi_select:{ contains:"CSS" } }, 
  ]}
* multi_select.all_of:  Array<string>  → vira AND de várias condições `multi_select.contains`
  ex.: ["JS", "CSS"] → { and: [ contains:"JS", contains:"CSS" ] }
* multi_select.none_of: Array<string>  → vira AND de várias `multi_select.does_not_contain`
  ex.: ["JS", "CSS"] → { and: [ does_not_contain:"JS", does_not_contain:"CSS" ] }

## Exemplos:

* Título contém "notion" E Status = "Publicado":
  where = { and: [

    { property:"Name",   type:"title",  op:"contains", value:"notion" },
    { property:"Status", type:"status", op:"equals",   value:"Publicado" },

  ]}
* Tags contém QUALQUER de ["JS", "CSS"] (ANY):
  where = { property:"Tags", type:"multi_select", op:"any_of", value:["JS", "CSS"] }
* Criado depois de "2025-01-01" (timestamp de página) — usar filtro de timestamp:
  where = { raw: { timestamp:"created_time", created_time:{ after:"2025-01-01T00:00:00Z" } } }
  (pode ser combinado com and/or)

## Observações:

* `any_of`/`all_of`/`none_of` são do wrapper e não existem na API; o builder converte para AND/OR + (does_)contains.
* Versão 2025-09-03 introduziu Data Sources (`/v1/data_sources`). O modelo de `filter` permanece igual; 
  apenas a rota/ID podem mudar conforme você migrar. Consulte o upgrade guide.
  + https://developers.notion.com/docs/upgrade-guide-2025-09-03

## Boas práticas:

* Prefira nomes exatos das propriedades; a validação de tipo/operador fica com a Notion.
* Para filtros de `multi_select` com várias tags, use os atalhos do wrapper para legibilidade.
* Aninhe `and`/`or` quando precisar de lógica mista (ex.: (A AND B) OR (C AND D)).
