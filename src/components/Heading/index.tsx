import "./style.scss"

export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
export type HeadingColor = "white" | "gray"

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  color?: HeadingColor
  size?: HeadingSize
  textNormal?: boolean
}

export function Heading({
  children,
  as,
  size,
  color,
  textNormal,
  className,
  ...rest
}: HeadingProps) {
  const Title = as || "h1"

  const fontSizeClass = `heading-font-size--${size || "3xl"}`
  const fontWeightClass = textNormal ? "normal" : "bold"
  const colorClass = `heading-color--${color || "white"}`

  return (
    <Title
      className={`heading ${className} ${fontSizeClass} ${fontWeightClass} ${colorClass}`}
      {...rest}
    >
      {children}
    </Title>
  )
}
