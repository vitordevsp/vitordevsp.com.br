import { Span } from "../.."
import "./style.css"

export interface TagProps {
  text: string
}

export function Tag({ text }: TagProps) {
  return (
    <div className="tag">
      <Span size="sm">
        {text}
      </Span>
    </div>
  )
}
