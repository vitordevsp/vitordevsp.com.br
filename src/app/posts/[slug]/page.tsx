import {
  Heading,
  PageContainer,
  Paragraph,
  Span,
  Tags,
} from "@/components"
import "./style.scss"

export default function Post() {
  return (
    <PageContainer className="post-page">
      <section className="post-page__header">
        <Span>
          07 de julho de 2021
        </Span>

        <div className="post-page__header__title">
          <Heading as="h1">
            Iniciando um Projeto com Next.js e Typescript
          </Heading>

          <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.
          </Paragraph>
        </div>

        <Tags items={["ReactJS", "NextJS", "NodeJS", "MongoDB"]} />
      </section>

      <section className="post-page__content">
        {/* corpo da postagem */}
      </section>
    </PageContainer>
  )
}
