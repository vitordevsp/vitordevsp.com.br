import { Client } from '@notionhq/client'

export const client = new Client({
  auth: process.env.NOTION_KEY,
})

export async function getDatabase<T>(databaseId: string, options?: any): Promise<T> {
  const response: any = await client.databases.query({
    database_id: databaseId,
    ...options,
  })

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
