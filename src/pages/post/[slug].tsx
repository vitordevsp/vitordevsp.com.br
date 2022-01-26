import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { notion } from '../../services/notion'
import { config } from '../../components/config'

export default function Page() {
  const router = useRouter()
  const { slug } = router.query

  const getPageElements = async (slug: string) => {
    const pageElements = await notion.posts.getPage(slug)
    console.log('pageElements: ', pageElements)
  }

  useEffect(() => {
    if (typeof slug === 'string') getPageElements(slug)
  }, [slug])

  return (
    <h1>Page</h1>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await notion.posts.list()

  return {
    props: {
      posts,
    },
    revalidate: config.revalidate,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
