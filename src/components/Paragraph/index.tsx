import { CSSProperties } from "react"
import "./style.css"

export type ParagraphSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
export type ParagraphColor = "white" | "gray"

export interface ParagraphProps {
  children?: React.ReactNode
  size?: ParagraphSize
  color?: ParagraphColor
  textBold?: boolean
}

const sizeObj: Record<ParagraphSize, string> = {
  "xs": "12px",
  "sm": "14px",
  "md": "16px",
  "lg": "18px",
  "xl": "20px",
  "2xl": "24px",
  "3xl": "36px",
  "4xl": "42px",
}

const colorObj: Record<ParagraphColor, string> = {
  "white": "#fff",
  "gray": "#989898",
}

export function Paragraph({ children, size, color, textBold }: ParagraphProps) {
  const style: CSSProperties = {
    fontSize: sizeObj[size || "md"],
    fontWeight: textBold ? "bold" : "normal",
    color: colorObj[color || "gray"],
  }

  return (
    <p className="paragraph" style={style}>
      {children}
    </p>
  )
}
