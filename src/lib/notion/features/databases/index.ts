import { notion, NotionPage, NotionPropertiesSchema } from "@/lib/notion"
import { toNotionFilter } from "./filters"
import type { DatabaseItemsResponse, GetDatabaseItemsOptions } from "./types"

const databaseId = process.env.NOTION_DATABASE_ID!

/**
 * Query tipada de database com paginação, filtros e sorts.
 *
 * Usa o database ID fixo em `NOTION_DATABASE_ID`. O parâmetro genérico `T`
 * descreve o schema de propriedades — ver [README](../../README.md#tipagem-de-database).
 *
 * A partir da API version 2025-09-03, o endpoint canônico é `data_sources.query`.
 * Esta função ainda chama `databases.query` (legacy path) — migração em PLAN-002-T007.
 *
 * @see https://developers.notion.com/reference/post-database-query
 */
export async function getDatabaseItems<T extends NotionPropertiesSchema>(
  {
    startCursor,
    pageSize = 100,
    where,
    sorts,
  }: GetDatabaseItemsOptions<T> = {},
): Promise<DatabaseItemsResponse<NotionPage<T>>> {
  const filter = toNotionFilter(where)

  const res = await notion.databases.query({
    database_id: databaseId,
    start_cursor: startCursor,
    page_size: pageSize,
    filter,
    sorts,
  }) as any

  return {
    results: res.results as NotionPage<T>[],
    nextCursor: res.next_cursor ?? null,
    hasMore: res.has_more,
  }
}

/**
 * Retorna a metadata do database (`retrieve`). Não traz os itens.
 *
 * @see https://developers.notion.com/reference/retrieve-a-database
 */
export async function getDatabaseProps<T extends NotionPropertiesSchema>(
): Promise<NotionPage<T>> {
  const db = await notion.databases.retrieve({ database_id: databaseId }) as any
  return db as NotionPage<T>
}
