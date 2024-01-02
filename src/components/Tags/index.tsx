import { Tag } from ".."
import "./styles.scss"

interface TagsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: string[]
}

export function Tags({ items, className, ...rest }: TagsProps) {
  if (!items) return

  return (
    <div
      className={`tags ${className}`}
      {...rest}
    >
      {items.map(text => (
        <Tag text={text} key={text} />
      ))}
    </div>
  )
}
