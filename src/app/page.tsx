import {
  BlogPostCard,
  Heading,
  LinkWithIcon,
  PageContainer,
  Paragraph,
  ProjectCard,
  ServiceCard,
  SkillCard,
  Span,
  Tags,
} from "@/components"
import { socialMedia } from "@/resources/static"
import "./style.scss"

export default function HomePage() {
  return (
    <PageContainer className="homepage-container">
      <section id="hero-section">
        <div className="hero-section-presentation">
          <div>
            <Heading as="h1" size="lg" color="gray" textNormal>
              👋 Olá! meu nome é <b>Vitor Sampaio</b> e sou um
            </Heading>

            <Heading as="h2" size="3xl">
              Desenvolvedor Web Fullstack
            </Heading>

            <Paragraph>
              Criando experiências digitais excepcionais. Transformando Problemas Complexos em Soluções Simples
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

          <div className="contact-section">
            <Span>
              São Paulo, SP, Brasil
            </Span>

            <Span>
              <a href={`mailto:${socialMedia.email}`}>contatodevsp@gmail.com</a>
            </Span>
          </div>

          <div className="social-media-section">
            <LinkWithIcon icon="linkedin" href={socialMedia.linkedin} />

            <LinkWithIcon icon="github" href={socialMedia.github} />

            <LinkWithIcon icon="youtube" href={socialMedia.youtube} />
          </div>
        </div>

        <div className="hero-section-about">
          <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Paragraph>

          <Paragraph>
            Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </Paragraph>

          <Paragraph>
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.
          </Paragraph>

          <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Paragraph>
        </div>
      </section>

      <section id="characteristics-section">
        <div className="characteristics-section-header">
          <Heading>
            Minhas principais habilidades
          </Heading>

          <Paragraph>
            Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
          </Paragraph>
        </div>

        <div className="characteristics-section-body">
          <SkillCard
            title="Habilidade X"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          />

          <SkillCard
            title="Habilidade X"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          />

          <SkillCard
            title="Habilidade X"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          />

          <SkillCard
            title="Habilidade X"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          />
        </div>
      </section>

      <section id="projects-section">
        <Heading>
          Projetos autorais
        </Heading>

        <div className="projects-section-body">
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
        </div>
      </section>

      <section id="posts-section">
        <Heading>
          Postagens em destaque
        </Heading>

        <div className="posts-section">
          <BlogPostCard
            title="Padronização de código com (ESLint e EditorConfig)"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            date="07 de julho de 2021"
            tags={["React JS", "React Native", "Next JS"]}
          />

          <BlogPostCard
            title="Padronização de código com (ESLint e EditorConfig)"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            date="07 de julho de 2021"
            tags={["React JS", "React Nativexxx", "Next JSxxx", "Vue JS"]}
          />

          <BlogPostCard
            title="Padronização de código com (ESLint e EditorConfig)"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            date="07 de julho de 2021"
            tags={["React JS", "Next JS"]}
          />
        </div>
      </section>

      <section id="services-section">
        <div className="services-section-header">
          <Heading>
            Serviços disponiveis
          </Heading>

          <Paragraph>
            Criando experiências digitais excepcionais. Transformando Problemas Complexos em Soluções Simples
          </Paragraph>
        </div>

        <div className="services-section-body">
          <ServiceCard
            title="Habilidade X"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          />

          <ServiceCard
            title="Habilidade X"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          />

          <ServiceCard
            title="Habilidade X"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          />
        </div>
      </section>

      <section id="call-to-action-section">
        <Heading>
          Como eu posso te ajudar?
        </Heading>

        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.
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
