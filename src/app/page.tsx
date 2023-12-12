import {
  Heading,
  LinkWithIcon,
  PageContainer,
  Paragraph,
  SkillCard,
  Span,
  Tag,
} from "@/components"
import { socialMedia } from "@/resources/static"

export default function HomePage() {
  return (
    <PageContainer className="flex flex-col items-center py-56 gap-56">
      <section id="hero-section" className="flex gap-20">
        <div className="flex flex-col gap-8">
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

            <div className="flex gap-2 mt-3">
              <Tag text="ReactJS" />
              <Tag text="VueJS" />
              <Tag text="NextJS" />
              <Tag text="NodeJS" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Span>
              São Paulo, SP, Brasil
            </Span>

            <Span>
              <a href={`mailto:${socialMedia.email}`}>contatodevsp@gmail.com</a>
            </Span>
          </div>

          <div className="flex gap-5">
            <LinkWithIcon icon="linkedin" href={socialMedia.linkedin} />

            <LinkWithIcon icon="github" href={socialMedia.github} />

            <LinkWithIcon icon="youtube" href={socialMedia.youtube} />
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-md">
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

      <section id="characteristics-section" className="flex flex-col items-center gap-20">
        <div className="flex flex-col gap-4 text-center max-w-2xl">
          <Heading>
            Minhas principais habilidades
          </Heading>

          <Paragraph>
            Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
          </Paragraph>
        </div>

        <div className="grid grid-rows-2 grid-flow-col gap-4">
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

      <section id="projects-section" className="flex flex-col items-center gap-20">
        <Heading>
          Projetos autorais
        </Heading>

        {/* @TODO: Card list projects */}
      </section>

      <section id="posts-section" className="flex flex-col items-center gap-20">
        <Heading>
          Postagens em destaque
        </Heading>

        {/* @TODO: Card list projects */}
      </section>

      <section id="services-section" className="flex flex-col items-center gap-20">
        <div className="flex flex-col gap-4 text-center max-w-2xl">
          <Heading>
            Serviços disponiveis
          </Heading>

          <Paragraph>
            Criando experiências digitais excepcionais. Transformando Problemas Complexos em Soluções Simples
          </Paragraph>
        </div>

        {/* @TODO: services */}
      </section>

      <section id="call-to-action-section" className="flex flex-col items-center gap-6 text-center max-w-2xl">
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
