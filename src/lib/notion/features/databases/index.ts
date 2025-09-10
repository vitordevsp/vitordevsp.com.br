import { notion, NotionPage, NotionPropertiesSchema } from "@/lib/notion"
import { toNotionFilter } from "./filters"
import type { DatabaseItemsResponse, GetDatabaseItemsOptions } from "./types"

const databaseId = process.env.NOTION_DATABASE_ID!

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

export async function getDatabaseProps<T extends NotionPropertiesSchema>(
): Promise<NotionPage<T>> {
  const db = await notion.databases.retrieve({ database_id: databaseId }) as any
  return db as NotionPage<T>
}
