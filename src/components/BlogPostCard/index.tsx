import { Heading, Icon, Paragraph, Span, Tags } from ".."
import "./style.scss"

export interface BlogPostCardProps {
  title: string
  description: string
  date: string
  tags?: string[]
}

export function BlogPostCard({ title, description, date, tags }: BlogPostCardProps) {
  return (
    <div className="blog-post-card">
      <div className="blog-post-card__info">
        <div className="blog-post-card__date">
          <Icon name="calendar" size={14} />

          <Span>
            {date}
          </Span>
        </div>

        <Tags items={tags} />
      </div>

      <div className="blog-post-card__content">
        <Heading as="h3" size="2xl">
          {title}
        </Heading>

        <Paragraph className="mt-2">
          {description}
        </Paragraph>
      </div>
    </div>
  )
}
