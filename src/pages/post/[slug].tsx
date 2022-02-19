import { GetStaticProps, GetStaticPropsContext } from 'next'
import { notion } from '../../services/notion'
import { config } from '../../components/config'

export default function Page({ post }: { post: any }) {
  console.log('post: ', post)

  return (
    <>
      <h1>{post?.title}</h1>
      <code>{JSON.stringify(post, null, 4)}</code>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug

  if (typeof slug === 'string') {
    const start = slug.lastIndexOf('-') + 1
    const end = slug.length

    const pageId = slug.slice(start, end)

    try {
      const post = await notion.posts.getFullPost(pageId)

      return {
        props: { post },
        revalidate: config.revalidate,
      }
    } catch { }
  }

  return {
    props: { post: {} },
    revalidate: config.revalidate,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
