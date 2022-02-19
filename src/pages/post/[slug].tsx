import { GetStaticProps, GetStaticPropsContext } from 'next'
import { notion } from '../../services/notion'
import { config } from '../../components/config'

export default function Page({ post }: { post: any }) {
  return (
    <>
      <h1>{post?.title}</h1>
      <code>{JSON.stringify(post, null, 4)}</code>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const slug = context.params?.slug

    if (typeof slug !== 'string') throw new TypeError()

    const start = slug.lastIndexOf('-') + 1
    const end = slug.length

    const pageId = slug.slice(start, end)

    const post = await notion.posts.getFullPost(pageId)

    return {
      props: { post },
      revalidate: config.revalidate,
    }
  } catch (e) {
    return {
      props: { post: null },
      revalidate: config.revalidate,
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
