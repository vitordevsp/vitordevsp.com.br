import { Heading, Icon, Paragraph, Span, Tags } from ".."
import "./style.css"

export interface BlogPostCardProps {
  title: string
  description: string
  date: string
  tags?: string[]
}

export function BlogPostCard({ title, description, date, tags }: BlogPostCardProps) {
  return (
    <div className="blog-post-card">
      <div className="blog-post-date-col">
        <div className="blog-post-date">
          <Icon name="calendar" size={14} />

          <Span>
            {date}
          </Span>
        </div>

        <Tags items={tags} />
      </div>

      <div>
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
