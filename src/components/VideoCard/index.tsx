import { Heading, Icon, LinkWithIcon, Paragraph, Span, Tags } from ".."
import "./style.scss"

export interface VideoCardProps {
  title: string
  description: string
  date: string
  tags?: string[]
  linkYoutube?: string
  linkPost?: string
}

export function VideoCard({
  title,
  description,
  date,
  tags,
  linkYoutube,
  linkPost,
}: VideoCardProps) {
  return (
    <div className="video-card">
      <div className="video-card__fake-img"></div>

      <div>
        <Heading>
          {title}
        </Heading>

        <div className="video-card__date">
          <Icon name="calendar" size={14} />

          <Span>{date}</Span>
        </div>

        <Tags className="video-card__tags" items={tags} />

        <Paragraph className="mt-2">
          {description}
        </Paragraph>

        <div className="video-card__links">
          {linkYoutube && (
            <LinkWithIcon icon="youtube" href={linkYoutube} text="Link do Vídeo" />
          )}

          {linkPost && (
            <LinkWithIcon icon="link" href={linkPost} text="Link do Post" />
          )}
        </div>
      </div>
    </div>
  )
}
