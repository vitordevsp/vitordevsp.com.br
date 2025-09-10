import {
  Heading,
  PageContainer,
  Paragraph,
  Span,
  Tags,
} from "@/components"
import {
  PageRenderer,
  generateNotionPageID,
  getAllBlockChildren,
  getPageById,
  parseDateDisplay,
  richTextRender,
} from "@/lib/notion"
import "./style.scss"
import type { PostProps } from "@/types/notion.type"

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  if (typeof slug !== "string") {
    return (
      <PageContainer className="post-page">
        <section className="post-page__header">
          <div className="post-page__header__title">
            <Heading as="h1">
              Ops!
            </Heading>

            <Paragraph>
              Não foi possível carregar a página
            </Paragraph>
          </div>
        </section>
      </PageContainer>
    )
  }

  const pageId = generateNotionPageID(slug)

  const page = await getPageById<PostProps>(pageId)

  if (!page) {
    return (
      <PageContainer className="post-page">
        <section className="post-page__header">
          <div className="post-page__header__title">
            <Heading as="h1">
              Ops!
            </Heading>

            <Paragraph>
              Não foi possível carregar a página
            </Paragraph>
          </div>
        </section>
      </PageContainer>
    )
  }

  const title = richTextRender(page.properties.Nome.title)
  const description = richTextRender(page.properties.Descricao.rich_text)
  const tags = page.properties.Tags.multi_select
  const publishedIn = page.properties["Publicado Em"].date?.start
  const dateDisplay = parseDateDisplay(publishedIn)

  const blocks = await getAllBlockChildren(pageId, { deep: true })

  return (
    <PageContainer className="post-page">
      <section className="post-page__header">
        <Span>
          {dateDisplay}
        </Span>

        <div className="post-page__header__title">
          <Heading as="h1">
            {title}
          </Heading>

          <Paragraph>
            {description}
          </Paragraph>
        </div>

        <Tags items={tags.map(t => t.name)} />
      </section>

      <section className="post-page__content">
        <PageRenderer blocks={blocks} />
      </section>
    </PageContainer>
  )
}
