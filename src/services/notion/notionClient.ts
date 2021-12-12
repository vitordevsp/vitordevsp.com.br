import { Client } from '@notionhq/client'

export const client = new Client({
  auth: process.env.NOTION_KEY,
})

export async function getDatabase<T>(databaseId: string, options?: any): Promise<{
  totalCount: number
  data: T
}> {
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
}

export async function getPage<T>(pageId: string): Promise<T> {
  const response: any = await client.pages.retrieve({ page_id: pageId })
  return response
}

export async function getBlocks<T>(blockId: string): Promise<T> {
  const response: any = await client.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })

  return response
}

export const notionClient = {
  getDatabase,
  getPage,
  getBlocks,
}
