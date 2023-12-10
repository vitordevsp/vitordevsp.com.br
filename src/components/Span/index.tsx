import { CSSProperties } from "react"
import "./style.css"

type SpanSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
type SpanColor = "white" | "gray"

interface SpanProps {
  children?: React.ReactNode
  size?: SpanSize
  color?: SpanColor
  textBold?: boolean
}

const sizeObj: Record<SpanSize, string> = {
  "xs": "12px",
  "sm": "14px",
  "md": "16px",
  "lg": "18px",
  "xl": "20px",
  "2xl": "24px",
  "3xl": "36px",
  "4xl": "42px",
}

const colorObj: Record<SpanColor, string> = {
  "white": "#fff",
  "gray": "#989898",
}

export function Span({ children, size, color, textBold }: SpanProps) {
  const style: CSSProperties = {
    fontSize: sizeObj[size || "md"],
    fontWeight: textBold ? "bold" : "normal",
    color: colorObj[color || "gray"],
  }

  return (
    <span className="span" style={style}>
      {children}
    </span>
  )
}
