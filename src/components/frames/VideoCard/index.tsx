import Image from "next/image"
import { Heading, Icon, LinkWithIcon, Paragraph, Span, Tags } from "@/components"
import "./style.scss"

export interface VideoCardProps {
  thumbnail?: string
  title: string
  description: string
  date: string
  tags?: string[]
  linkYoutube?: string
  linkPost?: string
}

export function VideoCard({
  thumbnail,
  title,
  description,
  date,
  tags,
  linkYoutube,
  linkPost,
}: VideoCardProps) {
  return (
    <div className="video-card">
      {thumbnail && (
        <div className="video-card__img-box">
          {/* <Image */}
          <img
            src={thumbnail}
            alt="thumbnail"
          // style={{ objectFit: "cover" }}
          // fill
          />
        </div>
      )}

      <div className="video-card__content">
        <Heading>
          {title}
        </Heading>

        <div className="video-card__content__date">
          <Icon name="calendar" size={14} />

          <Span>{date}</Span>
        </div>

        <Tags className="video-card__content__tags" items={tags} />

        <Paragraph>
          {description}
        </Paragraph>

        <div className="video-card__content__links">
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
