import {
  Heading,
  PageContainer,
  Paragraph,
  ProjectCard,
} from "@/components"
import "./style.scss"

export default function ProjectsPage() {
  return (
    <PageContainer className="projects-page">
      <section className="projects-page__header">
        <div>
          <Heading as="h1">
            Projetos autorais
          </Heading>

          <Paragraph>
            2 Projetos
          </Paragraph>
        </div>

        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.
        </Paragraph>
      </section>

      <section className="projects-page__content">
        <ProjectCard
          title="My Finances"
          initialDate="2021"
          tags={["ReactJS", "NextJS", "NodeJS", "MongoDB"]}
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          linkSite="https://www.my-finances.app"
          linkGithub="https://www.my-finances.app"
          linkFigma="https://www.my-finances.app"
          linkYoutube="https://www.my-finances.app"
        />

        <ProjectCard
          title="My Finances"
          initialDate="2021"
          tags={["ReactJS", "NextJS", "NodeJS", "MongoDB"]}
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          linkSite="https://www.my-finances.app"
          linkGithub="https://www.my-finances.app"
          linkFigma="https://www.my-finances.app"
          linkYoutube="https://www.my-finances.app"
        />
      </section>
    </PageContainer>
  )
}
