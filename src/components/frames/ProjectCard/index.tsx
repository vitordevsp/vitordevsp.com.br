import { Heading, Icon, LinkWithIcon, Paragraph, Span, Tags } from "@/components"
import "./style.scss"

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
  // return (
  //   <div className="project-card">
  //     <div className="project-card__fake-img"></div>

  //     <div>
  //       <Heading>
  //         {title}
  //       </Heading>

  //       <div className="project-card__date">
  //         <Icon name="calendar" size={14} />

  //         <Span>{initialDate} - {finalDate || "Ativo"}</Span>
  //       </div>

  //       <Tags className="project-card__tags" items={tags} />

  //       <Paragraph>
  //         {description}
  //       </Paragraph>

  //       <div className="project-card__links">
  //         {linkSite && <LinkWithIcon icon="link" href={linkSite} text="Acessar" />}

  //         {linkGithub && <LinkWithIcon icon="github" href={linkGithub} text="GitHub" />}

  //         {linkFigma && <LinkWithIcon icon="figma" href={linkFigma} text="Figma" />}

  //         {linkYoutube && <LinkWithIcon icon="youtube" href={linkYoutube} text="Youtube" />}
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div className="project-card">
      <div className="project-card__date">
        <Icon name="calendar" size={14} />

        <Span>{initialDate} - {finalDate || "Ativo"}</Span>
      </div>

      <Tags items={tags} className="project-card__tags" />

      <Heading as="h3" size="2xl" className="project-card__title">
        {title}
      </Heading>

      <div className="project_card__container-description">
        <Paragraph className="project-card__description">
          {description}
        </Paragraph>

        <div className="project-card__links">
          {linkSite && <LinkWithIcon icon="link" href={linkSite} text="Acessar" />}
          {linkGithub && <LinkWithIcon icon="github" href={linkGithub} text="GitHub" />}
          {linkFigma && <LinkWithIcon icon="figma" href={linkFigma} text="Figma" />}
          {linkYoutube && <LinkWithIcon icon="youtube" href={linkYoutube} text="Youtube" />}
        </div>
      </div>
    </div>
  )
}
