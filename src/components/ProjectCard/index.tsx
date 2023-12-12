import { Heading, Icon, LinkWithIcon, Paragraph, Span, Tag } from ".."
import "./style.css"

export interface ProjectCardProps {
  title: string
  description: string
  initialDate: string
  finalDate?: string
  tags?: string[]
  linkSite?: string
  linkGithub?: string
  linkFigma?: string
  linkYoutube?: string
}

export function ProjectCard({
  title,
  description,
  initialDate,
  finalDate,
  tags,
  linkSite,
  linkGithub,
  linkFigma,
  linkYoutube,
}: ProjectCardProps) {
  return (
    <div className="project-card flex gap-14">
      <div className="fake-img-project"></div>

      <div>
        <Heading>
          {title}
        </Heading>

        <div className="flex items-center gap-3">
          <Icon name="calendar" size={14} />

          <Span>{initialDate} - {finalDate || "Ativo"}</Span>
        </div>

        <div className="flex gap-1.5 mt-4">
          {tags?.map(text => (
            <Tag text={text} key={text} />
          ))}
        </div>

        <Paragraph className="mt-2">
          {description}
        </Paragraph>

        <div className="flex gap-6 mt-4">
          {linkSite && <LinkWithIcon icon="link" href={linkSite} text="Acessar" />}

          {linkGithub && <LinkWithIcon icon="github" href={linkGithub} text="GitHub" />}

          {linkFigma && <LinkWithIcon icon="figma" href={linkFigma} text="Figma" />}

          {linkYoutube && <LinkWithIcon icon="youtube" href={linkYoutube} text="Youtube" />}
        </div>
      </div>
    </div>
  )
}
