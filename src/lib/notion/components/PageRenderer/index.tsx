import * as React from "react"
import style from "./style.module.css"
import { richTextRender } from "../RichTextRender"

// TIPOS (reaproveita sua base + fallback)
type BaseBlock = {
  object: "block"
  id: string
  type: string
  has_children: boolean
  archived: boolean
  in_trash: boolean
  [k: string]: any
  __children?: BaseBlock[]
}

type RichTextNode = {
  type: "text"
  plain_text: string
  href: string | null
  text: { content: string; link: null | { url: string } }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
}

type PageRendererProps = {
  blocks: BaseBlock[]
  /**
   * Permite sobrepor renderização de um bloco específico.
   * Útil para customizações pontuais (ex.: CodeBlock com prism).
   */
  overrides?: Partial<Record<string, (block: BaseBlock, ctx: Ctx) => React.ReactNode>>
}

type Ctx = {
  renderBlocks: (blocks: BaseBlock[]) => React.ReactNode
  richTextRender: (nodes: RichTextNode[]) => React.ReactNode
}

export function PageRenderer({ blocks, overrides }: PageRendererProps) {
  const ctx: Ctx = React.useMemo(
    () => ({ renderBlocks: (bs) => <BlockList blocks={bs} ctx={{ renderBlocks: (cs) => <BlockList blocks={cs} ctx={ctx} />, richTextRender }} />, richTextRender }),
    [richTextRender],
  )
  return (
    <article className={style.rendered}>
      <BlockList blocks={blocks} ctx={ctx} overrides={overrides} />
    </article>
  )
}

// ------------------------------
// Lista de blocks com agrupamento de listas
// ------------------------------

function BlockList({
  blocks,
  ctx,
  overrides,
}: {
  blocks: BaseBlock[]
  ctx: Ctx
  overrides?: PageRendererProps["overrides"]
}) {
  const sequences = groupListSequences(blocks)

  return (
    <>
      {sequences.map((item, idx) => {
        if (item.kind === "single") {
          return <Block key={(item.block as BaseBlock).id} block={item.block} ctx={ctx} overrides={overrides} />
        }
        // item.kind === "list"
        const { listType, items } = item
        if (listType === "bulleted_list_item") {
          return (
            <ul key={`ul-${idx}`}>
              {items.map((b) => (
                <ListItem key={b.id} block={b} ctx={ctx} overrides={overrides} />
              ))}
            </ul>
          )
        }
        // numbered
        return (
          <ol key={`ol-${idx}`}>
            {items.map((b) => (
              <ListItem key={b.id} block={b} ctx={ctx} overrides={overrides} />
            ))}
          </ol>
        )
      })}
    </>
  )
}

// ------------------------------
// Agrupa sequências contíguas do mesmo tipo de item de lista em um único UL/OL
// ------------------------------

function groupListSequences(blocks: BaseBlock[]) {
  type Single = { kind: "single"; block: BaseBlock }
  type List = { kind: "list"; listType: "bulleted_list_item" | "numbered_list_item"; items: BaseBlock[] }
  const out: Array<Single | List> = []
  let i = 0
  while (i < blocks.length) {
    const b = blocks[i]
    const t = b.type
    if (t === "bulleted_list_item" || t === "numbered_list_item") {
      const listType = t
      const group: BaseBlock[] = [b]
      i++
      while (i < blocks.length && blocks[i].type === listType) {
        group.push(blocks[i])
        i++
      }
      out.push({ kind: "list", listType, items: group })
      continue
    }
    out.push({ kind: "single", block: b })
    i++
  }
  return out
}

// ------------------------------
// Render de itens de lista (li) + filhos recursivos
// ------------------------------

function ListItem({ block, ctx, overrides }: { block: BaseBlock; ctx: Ctx; overrides?: PageRendererProps["overrides"] }) {
  const childKey = block.type as keyof NonNullable<typeof overrides>
  if (overrides?.[childKey]) return <li>{overrides[childKey]!(block, ctx)}</li>

  if (block.type === "bulleted_list_item") {
    const rt: RichTextNode[] = block.bulleted_list_item?.rich_text ?? []
    return (
      <li>
        {ctx.richTextRender(rt)}
        {block.__children?.length ? <BlockList blocks={block.__children} ctx={ctx} overrides={overrides} /> : null}
      </li>
    )
  }

  if (block.type === "numbered_list_item") {
    const rt: RichTextNode[] = block.numbered_list_item?.rich_text ?? []
    return (
      <li>
        {ctx.richTextRender(rt)}
        {block.__children?.length ? <BlockList blocks={block.__children} ctx={ctx} overrides={overrides} /> : null}
      </li>
    )
  }

  // fallback
  return (
    <li>
      <Block block={block} ctx={ctx} overrides={overrides} />
    </li>
  )
}

// ------------------------------
// Render genérico de block (switch por tipo)
// ------------------------------

function Block({ block, ctx, overrides }: { block: BaseBlock; ctx: Ctx; overrides?: PageRendererProps["overrides"] }) {
  const key = block.type as keyof NonNullable<typeof overrides>
  if (overrides?.[key]) return <>{overrides[key]!(block, ctx)}</>

  switch (block.type) {
    case "paragraph": {
      const rt: RichTextNode[] = block.paragraph?.rich_text ?? []
      if (!rt.length) return <p style={{ height: 8 }} /> // parágrafo vazio = espaçamento
      return <p>{ctx.richTextRender(rt)}</p>
    }

    case "heading_1": {
      const rt: RichTextNode[] = block.heading_1?.rich_text ?? []
      const isToggle = !!block.heading_1?.is_toggleable
      if (isToggle) {
        return (
          <details>
            <summary>
              <h1>{ctx.richTextRender(rt)}</h1>
            </summary>
            {block.__children?.length ? <BlockList blocks={block.__children} ctx={ctx} overrides={overrides} /> : null}
          </details>
        )
      }
      return <h1>{ctx.richTextRender(rt)}</h1>
    }

    case "heading_2": {
      const rt: RichTextNode[] = block.heading_2?.rich_text ?? []
      const isToggle = !!block.heading_2?.is_toggleable
      if (isToggle) {
        return (
          <details>
            <summary>
              <h2>{ctx.richTextRender(rt)}</h2>
            </summary>
            {block.__children?.length ? <BlockList blocks={block.__children} ctx={ctx} overrides={overrides} /> : null}
          </details>
        )
      }
      return <h2>{ctx.richTextRender(rt)}</h2>
    }

    case "heading_3": {
      const rt: RichTextNode[] = block.heading_3?.rich_text ?? []
      const isToggle = !!block.heading_3?.is_toggleable
      if (isToggle) {
        return (
          <details>
            <summary>
              <h3>{ctx.richTextRender(rt)}</h3>
            </summary>
            {block.__children?.length ? <BlockList blocks={block.__children} ctx={ctx} overrides={overrides} /> : null}
          </details>
        )
      }
      return <h3>{ctx.richTextRender(rt)}</h3>
    }

    case "quote": {
      const rt: RichTextNode[] = block.quote?.rich_text ?? []
      return <blockquote>{ctx.richTextRender(rt)}</blockquote>
    }

    case "callout": {
      const rt: RichTextNode[] = block.callout?.rich_text ?? []
      // ícone pode ser emoji/file/external
      const icon = block.callout?.icon
      return (
        <div role="note" style={{ borderLeft: "4px solid currentColor", padding: "8px 12px" }}>
          {icon?.type === "emoji" ? <span style={{ marginRight: 8 }}>{icon.emoji}</span> : null}
          <span>{ctx.richTextRender(rt)}</span>
          {block.__children?.length ? <BlockList blocks={block.__children} ctx={ctx} overrides={overrides} /> : null}
        </div>
      )
    }

    case "code": {
      const rt: RichTextNode[] = block.code?.rich_text ?? []
      const lang: string = block.code?.language ?? "plain text"
      const caption: RichTextNode[] = block.code?.caption ?? []
      return (
        <figure>
          <pre>
            <code data-lang={lang}>{plainText(rt)}</code>
          </pre>
          {caption?.length ? <figcaption>{ctx.richTextRender(caption)}</figcaption> : null}
        </figure>
      )
    }

    case "image": {
      const img = block.image
      const caption: RichTextNode[] = img?.caption ?? []
      const src =
        img?.type === "external"
          ? img.external?.url
          : img?.type === "file"
            ? img.file?.url // URL expira — renovar ao revalidar
            : ""
      const alt = caption?.length ? plainText(caption) : ""
      return (
        <figure style={{ marginInline: "auto", borderRadius: "12px", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
          {caption?.length ? <figcaption>{ctx.richTextRender(caption)}</figcaption> : null}
        </figure>
      )
    }

    case "divider":
      return <hr />

    case "to_do": {
      const rt: RichTextNode[] = block.to_do?.rich_text ?? []
      const checked: boolean = !!block.to_do?.checked
      return (
        <div>
          <label style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" checked={checked} readOnly /> {ctx.richTextRender(rt)}
          </label>
          {block.__children?.length ? <BlockList blocks={block.__children} ctx={ctx} overrides={overrides} /> : null}
        </div>
      )
    }

    case "toggle": {
      const rt: RichTextNode[] = block.toggle?.rich_text ?? []
      return (
        <details>
          <summary>{ctx.richTextRender(rt)}</summary>
          {block.__children?.length ? <BlockList blocks={block.__children} ctx={ctx} overrides={overrides} /> : null}
        </details>
      )
    }

    // Itens de lista fora do agrupamento viram <li> isolado
    case "bulleted_list_item":
    case "numbered_list_item":
      return <ListItem block={block} ctx={ctx} overrides={overrides} />

    // Fallback genérico (útil p/ tipos não mapeados ainda)
    default:
      return (
        <div data-notion-unknown={block.type}>
          {/* opcional: debug */}
          {/* <pre>{JSON.stringify(block, null, 2)}</pre> */}
        </div>
      )
  }
}

// ------------------------------
// Helpers
// ------------------------------

function plainText(nodes: RichTextNode[]) {
  return nodes.map((n) => n.plain_text).join("")
}
