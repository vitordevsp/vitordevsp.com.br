import { Span } from "@/components"
import "./style.scss"
import { socialMedia } from "@/resources/static"

export function PageFooter() {
  return (
    <footer className="page-footer">
      <a href={`${socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer">
        <Span color="gray-dark" size="sm">
          linkedin
        </Span>
      </a>

      <a href={`${socialMedia.github}`} target="_blank" rel="noopener noreferrer">
        <Span color="gray-dark" size="sm">
          github
        </Span>
      </a>

      <a href={`${socialMedia.youtube}`} target="_blank" rel="noopener noreferrer">
        <Span color="gray-dark" size="sm">
          youtube
        </Span>
      </a>

      <a href={`${socialMedia.instagram}`} target="_blank" rel="noopener noreferrer">
        <Span color="gray-dark" size="sm">
          instagram
        </Span>
      </a>
    </footer>
  )
}
