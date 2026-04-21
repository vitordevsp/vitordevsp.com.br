import * as React from "react"

export type RichTextNode = {
  type: "text" | string
  plain_text: string
  href: string | null
  text?: { content: string; link: null | { url: string } }
  annotations?: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string // "default" | "gray" | "gray_background" | ...
  }
}

/**
 * Converte um array de rich_text do Notion em JSX.
 *
 * - Links (via `text.link.url` ou `href`) viram `<a target="_blank" rel="noopener noreferrer">`
 * - Annotations viram wrappers: `strong`, `em`, `s`, `u`, `code`
 * - Cores viram classes CSS: `notion-color-<name>` e `notion-bg-<name>`
 * - `\n` dentro do conteúdo vira `<br>` (mantém quebras de linha do Notion)
 * - Tipos não-`text` (mention, equation, etc.) caem em fallback que só renderiza `plain_text`
 *
 * Consumido pelo `PageRenderer` para renderizar todo trecho inline dos blocks.
 */
export function richTextRender(nodes: RichTextNode[]): React.ReactNode {
  if (!nodes || !nodes?.length) return null
  return (
    <>
      {nodes.map((n, i) => {
        if (n.type !== "text") {
          // Fallback para tipos não mapeados (mention/equation/etc.)
          return <span key={i}>{n.plain_text}</span>
        }
        const content = splitWithBr(n.text?.content ?? n.plain_text)
        const ann = n.annotations || {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        }

        // classes de cor/background
        const cls = colorToClass(ann.color)

        // monta árvore de wrappers respeitando combinações
        let el: React.ReactNode = <span className={cls}>{content}</span>
        if (ann.code) el = <code>{el}</code>
        if (ann.underline) el = <u>{el}</u>
        if (ann.strikethrough) el = <s>{el}</s>
        if (ann.italic) el = <em>{el}</em>
        if (ann.bold) el = <strong>{el}</strong>

        const url = n.text?.link?.url || n.href
        return url ? (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer">
            {el}
          </a>
        ) : (
          <React.Fragment key={i}>{el}</React.Fragment>
        )
      })}
    </>
  )
}

function colorToClass(color: string | undefined) {
  if (!color || color === "default") return undefined
  if (color.endsWith("_background")) {
    const name = color.replace("_background", "")
    return `notion-bg-${name}`
  }
  return `notion-color-${color}`
}

function splitWithBr(text: string) {
  // Mantém quebras de linha do Notion
  const parts = text.split("\n")
  return parts.flatMap((p, idx) => (idx === 0 ? [p] : [<br key={idx} />, p]))
}
