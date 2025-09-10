import Link from "next/link"
import {
  BlogPostCard,
  Heading,
  LinkWithIcon,
  PageContainer,
  Paragraph,
  ProjectCard,
  Span,
  Tags,
} from "@/components"
import { generateNotionPageSlug, getDatabaseItems, parseDateDisplay, richTextRender } from "@/lib/notion"
import { projectService } from "@/app/api/notion/_resources/modules/projects/services/projectService"
import { socialMedia } from "@/resources/static"
import "./style.scss"
import type { PostProps } from "@/types/notion.type"

export default async function HomePage() {
  const projects = await projectService.list(3)

  const { results } = await getDatabaseItems<PostProps>({
    pageSize: 3,
    sorts: [
      { property: "Publicado Em", direction: "descending" },
      { property: "Criado Em", direction: "descending" },
    ],
    where: {
      and: [
        { property: "Publicado Em", type: "date", op: "is_not_empty" },
      ],
    },
  })

  return (
    <PageContainer className="homepage homepage--vars">
      <section id="hero-section" className="homepage__hero-section">
        <div className="hero-section__presentation">
          <div className="hero-section__hello-container">
            <Heading as="h1" size="lg" color="gray" textNormal>
              👋 Olá! meu nome é <b>Vitor Sampaio</b> e sou um
            </Heading>

            <Heading as="h2" size="3xl">
              Desenvolvedor Web Fullstack
            </Heading>

            <Paragraph>
              Transformando desafios da educação digital em soluções inovadoras, com foco no desenvolvimento frontend e no impacto da inteligência artificial.
            </Paragraph>

            <Tags
              items={[
                "ReactJS",
                "VueJS",
                "NextJS",
                "NodeJS",
              ]}
            />
          </div>

          <div className="hero-section__contact-container">
            <Span>
              Analista Sênior | <a href="https://www.einstein.br/" target="_blank" rel="noopener noreferrer">Einstein Hospital Israelita</a>
            </Span>

            <Span>
              São Paulo, SP, Brasil
            </Span>

            <Span>
              <a href={`mailto:${socialMedia.email}`}>contatodevsp@gmail.com</a>
            </Span>
          </div>

          <div className="hero-section__social-media-container">
            <LinkWithIcon icon="linkedin" href={socialMedia.linkedin} />

            <LinkWithIcon icon="github" href={socialMedia.github} />

            <LinkWithIcon icon="youtube" href={socialMedia.youtube} />

            <LinkWithIcon icon="instagram" href={socialMedia.instagram} />
          </div>
        </div>

        <div className="hero-section__about-container">
          <Paragraph>
            Atualmente, atuo como analista sênior no Hospital Israelita Albert Einstein, integrando a equipe de Inovação Tecnológica do Ensino Digital como desenvolvedor frontend. Criamos soluções digitais inovadoras com o uso de inteligência artificial voltadas para a área da educação.
          </Paragraph>

          <Paragraph>
            Tenho muito interesse no processo de concepção de soluções digitais e sempre tive uma forte conexão com o produto, muito por ter começado minha carreira tentando construir alguns. Minha curiosidade me ajudou a aprender mais sobre outras áreas e a desenvolver um olhar mais clínico para o produto, resultando em ideias promissoras para o time e para os projetos.
          </Paragraph>

          <Paragraph>
            Hoje, o que mais gosto de fazer longe do computador — e que me ajuda a manter a sanidade — é correr e treinar musculação. Essas atividades me desafiam a superar limites e manter a saúde física e mental em equilíbrio.
          </Paragraph>
        </div>
      </section>

      <section id="projects-section" className="homepage__projects-section">
        <Heading>
          Projetos em destaque
        </Heading>

        <div className="projects-section__content">
          {projects.data.map((project) => (
            <ProjectCard
              key={project.id}
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
        </div>
      </section>

      <section id="posts-section" className="homepage__posts-section">
        <Heading>
          Postagens em destaque
        </Heading>

        <div className="posts-section__content">
          {results.map((item) => {
            const title = richTextRender(item.properties.Nome.title)
            const description = richTextRender(item.properties.Descricao.rich_text)
            const tags = item.properties.Tags.multi_select
            const publishedIn = item.properties["Publicado Em"].date?.start as string

            const slug = generateNotionPageSlug(item.url)
            const dateDisplay = parseDateDisplay(publishedIn)

            return (
              <Link key={item.id} href={`posts/${slug}`}>
                <BlogPostCard
                  title={title}
                  description={description}
                  date={dateDisplay}
                  tags={tags}
                />
              </Link>
            )
          })}
        </div>
      </section>

      <section id="call-to-action-section" className="homepage__call-to-action-section">
        <Heading>
          Como eu posso te ajudar?
        </Heading>

        <Paragraph>
          Se você vê uma maneira de eu contribuir com seu projeto ou quer bater um papo sobre tecnologia, fique à vontade para entrar em contato!
        </Paragraph>

        <Paragraph>
          Me mande uma mensagem no
          &nbsp;<a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer"><b>LinkedIn</b></a>&nbsp;
          ou me escreva um
          &nbsp;<a href={`mailto:${socialMedia.email}`}><b>e-mail</b></a>.
        </Paragraph>
      </section>
    </PageContainer>
  )
}
