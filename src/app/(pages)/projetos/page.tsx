import {
  Heading,
  PageContainer,
  Paragraph,
  ProjectCard,
} from "@/components"
import { projectService } from "@/app/api/notion/_resources/modules/projects/services/projectService"
import "./style.scss"

export default async function ProjectsPage() {
  const projects = await projectService.list()
  const totalCount = projects?.totalCount || 0

  return (
    <PageContainer className="projects-page">
      <section className="projects-page__header">
        <div>
          <Heading as="h1">
            Projetos autorais
          </Heading>

          <Paragraph>
            {totalCount} {totalCount > 1 ? ' Projetos' : ' Projeto'}
          </Paragraph>
        </div>

        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.
        </Paragraph>
      </section>

      <section className="projects-page__content">
        {projects.data.map((project) => (
          <ProjectCard
            title={project.name}
            initialDate={project.dateDisplay}
            tags={project.tags}
            description={project.description}
            linkSite={project.urlSite}
            linkGithub={project.urlRepo}
          // linkFigma={project.url}
          // linkYoutube={project.linkYoutube}
          />
        ))}
      </section>
    </PageContainer>
  )
}
