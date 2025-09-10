import Link from "next/link"
import {
  BlogPostCard,
  Heading,
  PageContainer,
} from "@/components"
import {
  generateNotionPageSlug,
  getDatabaseItems,
  parseDateDisplay,
  richTextRender,
} from "@/lib/notion"
import "./style.scss"
import type { PostProps } from "@/types/notion.type"

export default async function PostsPage() {
  const { results } = await getDatabaseItems<PostProps>({
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
    <PageContainer className="posts-page">
      <section className="posts-page__header">
        <div>
          <Heading as="h1">
            Todas as Postagens
          </Heading>

          {/* <Paragraph>
            0 Postagens
          </Paragraph> */}
        </div>

        {/* <Paragraph>
          Aqui vai ser um paragrafo com um sobre, uma introdução
        </Paragraph> */}
      </section>

      <section className="posts-page__content">
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
      </section>
    </PageContainer>
  )
}
