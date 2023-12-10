import { CSSProperties } from "react"
import "./style.css"

export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
export type HeadingColor = "white" | "gray"

export interface HeadingProps {
  children?: React.ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  color?: HeadingColor
  size?: HeadingSize
  textNormal?: boolean
}

const sizeObj: Record<HeadingSize, string> = {
  "xs": "12px",
  "sm": "14px",
  "md": "16px",
  "lg": "18px",
  "xl": "20px",
  "2xl": "24px",
  "3xl": "36px",
  "4xl": "42px",
}

const colorObj: Record<HeadingColor, string> = {
  "white": "#fff",
  "gray": "#989898",
}

export function Heading({ children, as, size, color, textNormal }: HeadingProps) {
  const Title = as || "h1"

  const style: CSSProperties = {
    fontSize: sizeObj[size || "3xl"],
    fontWeight: textNormal ? "normal" : "bold",
    color: colorObj[color || "white"],
  }

  return (
    <Title className="heading" style={style}>
      {children}
    </Title>
  )
}
