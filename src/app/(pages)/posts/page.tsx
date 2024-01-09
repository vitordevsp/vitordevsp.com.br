import Link from "next/link"
import {
  BlogPostCard,
  Heading,
  PageContainer,
  Paragraph,
} from "@/components"
import "./style.scss"

export default function PostsPage() {
  return (
    <PageContainer className="posts-page">
      <section className="posts-page__header">
        <div>
          <Heading as="h1">
            Todas as Postagens
          </Heading>

          <Paragraph>
            3 Postagens
          </Paragraph>
        </div>

        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.
        </Paragraph>
      </section>

      <section className="posts-page__content">
        <Link href="posts/padronizacao-de-codigo-com-eslint-e-editorconfig">
          <BlogPostCard
            title="Padronização de código com (ESLint e EditorConfig)"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            date="07 de julho de 2021"
            tags={["React JS", "React Native", "Next JS"]}
          />
        </Link>

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
      </section>
    </PageContainer>
  )
}
