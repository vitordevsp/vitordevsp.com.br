import { notion, NotionPage, NotionPropertiesSchema } from "@/lib/notion"

/**
 * Retorna metadados e propriedades de uma página pelo ID.
 *
 * **Não traz o conteúdo** (blocks) da página. Para conteúdo use
 * `getAllBlockChildren(pageId)` do módulo de blocks.
 *
 * @see https://developers.notion.com/reference/retrieve-a-page
 */
export async function getPageById<T extends NotionPropertiesSchema>(
  pageId: string,
): Promise<NotionPage<T>> {
  const page = await notion.pages.retrieve({ page_id: pageId }) as any
  return page as NotionPage<T>
}
