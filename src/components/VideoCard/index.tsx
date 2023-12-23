import { Heading, Icon, LinkWithIcon, Paragraph, Span, Tags } from ".."
import "./style.css"

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
    <div className="video-card flex gap-14">
      <div className="fake-img-video"></div>

      <div>
        <Heading>
          {title}
        </Heading>

        <div className="flex items-center gap-3">
          <Icon name="calendar" size={14} />

          <Span>{date}</Span>
        </div>

        <Tags items={tags} />

        <Paragraph className="mt-2">
          {description}
        </Paragraph>

        <div className="flex gap-6 mt-4">
          {linkYoutube && <LinkWithIcon icon="youtube" href={linkYoutube} text="Link do Vídeo" />}

          {linkPost && <LinkWithIcon icon="link" href={linkPost} text="Link do Post" />}
        </div>
      </div>
    </div>
  )
}
