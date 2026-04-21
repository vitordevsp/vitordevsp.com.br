import { notion } from "@/lib/notion"
import type { NotionRichTextNode } from "../pages/types"
import type { AnyNotionBlock, BlockChildrenResponse, GetBlockChildrenOptions } from "./types"

// MARK: Leitura paginada

/**
 * Lê uma página de children (cursor-based pagination) de um block ou page.
 *
 * Use `blockId = pageId` para ler o conteúdo de uma página.
 *
 * @param blockId id do block (ou page) pai
 * @param opts `pageSize` default 100 (max 100), `startCursor` para próximas páginas
 * @returns `{ results, nextCursor, hasMore }` — tipado com `T` (default `AnyNotionBlock`)
 *
 * @see https://developers.notion.com/reference/get-block-children
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

// MARK: Leitura recursiva

/**
 * Busca todos os children de um block varrendo a paginação.
 *
 * Com `deep: true`, também busca filhos de blocks que têm `has_children: true`
 * e anexa em `__children` — necessário para renderizar toggles, listas com
 * sub-itens, callouts com conteúdo, etc.
 *
 * **Custo**: sem `deep`, 1 request por página de resultados. Com `deep`, N
 * requests adicionais (um por subtree). Leitura sequencial hoje — a
 * paralelização com limite de concorrência está planejada no PLAN-002-T001.
 *
 * Fluxo típico em blog:
 * 1. Chama com o `pageId` e `{ deep: true }`.
 * 2. Entrega os blocks em ordem ao `PageRenderer`.
 * 3. O renderer consome `__children` nos blocks que têm `has_children: true`
 *    (listas aninhadas, toggles, callouts com conteúdo).
 *
 * @param blockId id do block (ou page) pai
 * @param opts `deep` (default false) — buscar filhos recursivamente
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

  const withChildren = acc.filter(b => (b as AnyNotionBlock).has_children)
  for (const parent of withChildren) {
    const children = await getAllBlockChildren<T>(parent.id, { deep: true })
      // anexa em runtime; shape consumido pelo PageRenderer via `__children`
      ; (parent as any).__children = children
  }

  return acc
}

// MARK: Utilidades de render

/**
 * Concatena `plain_text` de nodes de rich text em uma string única.
 * Ignora links, annotations, equações e menções — útil para `alt`, `title`
 * ou busca plain-text sobre conteúdo do Notion.
 */
export function richTextToPlain(nodes: NotionRichTextNode[]): string {
  return nodes.map(n => n.plain_text).join("")
}
