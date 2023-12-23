import {
  BlogPostCard,
  Heading,
  PageContainer,
  Paragraph,
} from "@/components"

export default function PostsPage() {
  return (
    <PageContainer className="flex flex-col items-center py-20 gap-20">
      <section className="flex flex-col gap-8 text-center max-w-3xl">
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

      <section className="flex flex-col gap-20">
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
      </section>
    </PageContainer>
  )
}
