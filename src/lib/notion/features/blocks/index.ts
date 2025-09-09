import { notion } from "@/lib/notion"
import type { NotionRichTextNode } from "../pages/types"
import type { AnyNotionBlock, BlockChildrenResponse, GetBlockChildrenOptions } from "./types"

// ------------------------------
// Leitura paginada de filhos de um block (ex.: pageId)
// ------------------------------

/**
 * Lê UM "page" de blocks (children) com paginação, tipado.
 * Use o pageId como block_id para ler o conteúdo da página.
 *
 * Doc: Retrieve block children (cursor-based pagination).
 */
export async function getBlockChildren<T extends AnyNotionBlock = AnyNotionBlock>(
  blockId: string,
  { pageSize = 100, startCursor }: GetBlockChildrenOptions = {},
): Promise<BlockChildrenResponse<T>> {
  const res = await notion.blocks.children.list({
    block_id: blockId,
    page_size: Math.min(pageSize, 100),
    start_cursor: startCursor,
  })

  return {
    results: res.results as unknown as T[],
    nextCursor: res.next_cursor ?? null,
    hasMore: res.has_more,
  }
}

// ------------------------------
// Helper para buscar TODOS os blocks (varrendo paginação)
// ------------------------------

/**
 * Busca TODOS os children de um block (varre a paginação).
 * Importante: se um item tiver `has_children = true`, você pode
 * (opcionalmente) buscar também os netos recursivamente (vide `deep=true`).
 *
 * Para blog, normalmente você:
 * 1) chama com pageId (page é um block pai),
 * 2) renderiza os children em ordem,
 * 3) quando `has_children` for true (listas/toggles), busca os filhos.
 *
 * Doc: A doc ressalta que para ter a representação completa de um block,
 * pode ser necessário buscar recursivamente seus filhos.
 */
export async function getAllBlockChildren<T extends AnyNotionBlock = AnyNotionBlock>(
  blockId: string,
  { deep = false }: { deep?: boolean } = {},
): Promise<T[]> {
  const acc: T[] = []
  let cursor: string | undefined = undefined

  do {
    const page: BlockChildrenResponse<T> = await getBlockChildren<T>(blockId, { startCursor: cursor, pageSize: 100 })
    acc.push(...page.results)
    cursor = page.nextCursor ?? undefined
  } while (cursor)

  if (!deep) return acc

  // Busca filhos de quem tem has_children = true
  const withChildren = acc.filter(b => (b as AnyNotionBlock).has_children)
  for (const parent of withChildren) {
    const children = await getAllBlockChildren<T>(parent.id, { deep: true })
      // você pode anexar em runtime (não muda o shape da API)
      ; (parent as any).__children = children
  }

  return acc
}

// ------------------------------
// Utilidades para render (ex.: transformar rich_text em string)
// ------------------------------

export function richTextToPlain(nodes: NotionRichTextNode[]): string {
  return nodes.map(n => n.plain_text).join("")
}
