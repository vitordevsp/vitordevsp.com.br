import { Client } from '@notionhq/client'
import { NotionBlockType } from './types/notion.types'

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

export async function getBlocksFromPage(pageId: string): Promise<NotionBlockType[]> {
  try {
    const notionResult: any = await client.blocks.children.list({
      block_id: pageId,
      page_size: 50,
    })

    // TODO: Buscar todos os blocos de uma pagina, as requisições tem paginação em 50 blocos.

    const pageBody = notionResult.results || []

    return pageBody
  } catch (error) {
    return []
  }
}

export const notionClient = {
  getDatabase,
  getPage,
  getBlocksFromPage,
}
