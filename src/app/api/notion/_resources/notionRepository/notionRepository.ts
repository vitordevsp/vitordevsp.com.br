/* eslint-disable camelcase */
import { Client } from "@notionhq/client"
import { NotionBlockType } from "./types/notion.types"

export const client = new Client({
  auth: process.env.NOTION_KEY,
})

export async function getDatabase<T>(databaseId: string, options?: any): Promise<{
  totalCount: number
  data: T
}> {
  try {
    const { pageSize, ...rest } = options

    const { results }: any = await client.databases.query({
      database_id: databaseId,
      ...rest,
    })

    const response = {
      totalCount: results.length,
      data: results,
    }

    if (pageSize) {
      response.data = results.slice(0, pageSize)
    }

    return response
  } catch (error) {
    return {
      totalCount: 0,
      data: [] as any,
    }
  }
}

export async function getPage<T>(pageId: string): Promise<T> {
  try {
    const response: any = await client.pages.retrieve({ page_id: pageId })
    return response
  } catch (error) {
    return {} as any
  }
}

const notionGetBlocksResult = async (pageId: string, nextCursorId?: string): Promise<{
  results: any[]
  nextCursorId: string
  hasMore: boolean
}> => {
  const args: any = {
    block_id: pageId,
    page_size: 50,
  }

  if (nextCursorId) {
    args.start_cursor = nextCursorId
  }

  const { results, next_cursor, has_more } = await client.blocks.children.list(args)

  return {
    results,
    nextCursorId: next_cursor || "",
    hasMore: has_more,
  }
}

export async function getBlocksFromPage(pageId: string): Promise<NotionBlockType[]> {
  try {
    const notionResult = await notionGetBlocksResult(pageId)

    let hasMore = notionResult.hasMore
    let nextCursorId = notionResult.nextCursorId
    const pageBody = notionResult.results || []

    while (hasMore) {
      const notionResultNext = await notionGetBlocksResult(pageId, nextCursorId)

      hasMore = notionResultNext.hasMore
      nextCursorId = notionResultNext.nextCursorId
      pageBody.push(...notionResultNext.results)
    }

    const fullBodyPromise = pageBody.map(async block => {
      if (!block.has_children) return block

      const childrenResult = await notionGetBlocksResult(block.id)

      const newBlock = {
        ...block,
        children: childrenResult.results,
      }

      return newBlock
    })

    const fullBody = await Promise.all(fullBodyPromise)

    return fullBody
  } catch (error) {
    return []
  }
}

export const notionRepository = {
  getDatabase,
  getPage,
  getBlocksFromPage,
}
