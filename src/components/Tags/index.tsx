import { Tag } from ".."

interface TagsProps {
  items?: string[]
}

export function Tags({ items }: TagsProps) {
  if (!items) return

  return (
    <div className="flex gap-1.5 mt-4">
      {items.map(text => (
        <Tag text={text} key={text} />
      ))}
    </div>
  )
}
