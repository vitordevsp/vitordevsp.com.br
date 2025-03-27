import Link from "next/link"
import {
  BlogPostCard,
  Heading,
  PageContainer,
  Paragraph,
} from "@/components"
import { postService } from "@/app/api/notion/_resources/modules/posts/services/postService"
import "./style.scss"

export default async function PostsPage() {
  const posts = await postService.list()
  const totalCount = posts?.totalCount || 0

  return (
    <PageContainer className="posts-page">
      <section className="posts-page__header">
        <div>
          <Heading as="h1">
            Todas as Postagens
          </Heading>

          <Paragraph>
            {totalCount} {totalCount > 1 ? ' Postagens' : ' Postagem'}
          </Paragraph>
        </div>

        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.
        </Paragraph>
      </section>

      <section className="posts-page__content">
        {posts.data.map((post) => (
          <BlogPostCard
            key={post.id}
            title={post.title}
            description={post.description}
            date={post.dateDisplay}
            tags={post.tags}
          />
        ))}
      </section>
    </PageContainer>
  )
}

{/* <Link href="posts/padronizacao-de-codigo-com-eslint-e-editorconfig">
<BlogPostCard
  title="Padronização de código com (ESLint e EditorConfig)"
  description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  date="07 de julho de 2021"
  tags={["React JS", "React Native", "Next JS"]}
/>
</Link> */}
