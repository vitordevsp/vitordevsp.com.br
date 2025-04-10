import { cloneElement } from "react"
import {
  Heading,
  PageContainer,
  Paragraph,
  Span,
  Tags,
} from "@/components"
import { postService } from "@/app/api/notion/_resources/modules/posts/services/postService"
import { parseBlocksToComponents } from "@/utils/NotionUtil"
import "./style.scss"

interface PostProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Post({ params }: PostProps) {
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

  const start = slug.lastIndexOf("-") + 1
  const end = slug.length
  const pageId = slug.slice(start, end)

  const post = await postService.getFull(pageId)

  const components = parseBlocksToComponents(post.body)

  return (
    <PageContainer className="post-page">
      <section className="post-page__header">
        <Span>
          {post.dateDisplay}
        </Span>

        <div className="post-page__header__title">
          <Heading as="h1">
            {post.title}
          </Heading>

          <Paragraph>
            {post.description}
          </Paragraph>
        </div>

        <Tags items={post.tags} />
      </section>

      <section className="post-page__content">
        {components?.map((Comp, idx) => {
          return cloneElement(Comp, { key: idx })
        })}
      </section>
    </PageContainer>
  )
}
