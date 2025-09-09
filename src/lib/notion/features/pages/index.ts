import { notion, NotionPage, NotionPropertiesSchema } from "@/lib/notion"

/**
 * Retorna os detalhes (metadados + propriedades) de uma página pelo ID.
 * Observação: isso NÃO traz o conteúdo (blocos). Para conteúdo,
 * use retrieve block children com o pageId.
 */
export async function getPageById<T extends NotionPropertiesSchema>(
  pageId: string,
): Promise<NotionPage<T>> {
  const page = await notion.pages.retrieve({ page_id: pageId }) as any
  return page as NotionPage<T>
}
