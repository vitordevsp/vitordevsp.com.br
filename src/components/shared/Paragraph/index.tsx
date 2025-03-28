import { CSSProperties } from "react"
import { classMerge } from "@/utils/helpers"
import "./style.css"

export type ParagraphSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
export type ParagraphColor = "white" | "gray"

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
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
  "white": "var(--text-color-white)",
  "gray": "var(--text-color-gray)",
}

export function Paragraph({
  children,
  size,
  color,
  textBold,
  className,
  style,
  ...rest
}: ParagraphProps) {
  const customStyle: CSSProperties = {
    fontSize: sizeObj[size || "md"],
    fontWeight: textBold ? "bold" : "normal",
    color: colorObj[color || "gray"],
    ...style,
  }

  const classMerged = classMerge([
    "paragraph",
    className,
  ])

  return (
    <p
      className={classMerged}
      style={customStyle}
      {...rest}
    >
      {children}
    </p>
  )
}
