import { ReactNode } from "react"
import { classMerge } from "@/utils/helpers"
import styles from "./style.module.css"

export interface FlexboxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  direction?: "initial" | "row" | "column"
  justify?: "initial" | "start" | "center" | "end" | "between" | "around" | "evenly"
  align?: "initial" | "start" | "center" | "end" | "stretch"
  gap?: string
  className?: string
  grow?: number
}

export const Flexbox = ({
  children,
  direction = "initial",
  justify = "initial",
  align = "initial",
  gap,
  className,
  grow = 0,
  style,
  ...rest
}: FlexboxProps) => {
  if (!children) return null

  const classes = classMerge([
    styles.flexbox,
    styles[`direction-${direction}`],
    styles[`justify-${justify}`],
    styles[`align-${align}`],
    className,
  ])

  const mappedStyle = {
    "--flexbox-grow": grow,
    "--flexbox-gap": gap,
    ...style,
  }

  return (
    <div className={classes} style={mappedStyle} {...rest}>
      {children}
    </div>
  )
}
