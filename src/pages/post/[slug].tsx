import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPropsContext } from 'next'

import { Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { Badge } from '../../components/Badge'
import { FlexGap } from '../../components/FlexGap'

import { notion } from '../../services/notion'
import { parseBlocksToComponents } from '../../utils/NotionUtil'
import { config } from '../../components/config'

export default function Page({ post }: { post: any }) {
  const [componentsJSX, setComponentsJSX] = useState<ReactElement[] | null>(null)

  useEffect(() => {
    if (post) {
      const components = parseBlocksToComponents(post.body)
      setComponentsJSX(components)
    }
  }, [post])

  if (!post) return <Spinner position="absolute" top="50%" left="50%" />

  return (
    <Stack width="100" maxWidth="900px" margin="40px auto" spacing={10}>
      <Stack as="header" align="center">
        <Heading as="h1" maxWidth="700px" textAlign="center">{post?.title}</Heading>
        <Text>{post?.dateDisplay}</Text>

        {post?.tags && (
          <FlexGap justify="center">
            {post?.tags.map((tag: string, i: number) => (
              <Badge key={i} bg="gray.700">{tag}</Badge>
            ))}
          </FlexGap>
        )}
      </Stack>

      <Stack as="article">
        {componentsJSX?.map((Comp, idx) => {
          return cloneElement(Comp, { key: idx })
        })}
      </Stack>
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const slug = context.params?.slug

    if (typeof slug !== 'string') throw new TypeError('slug is not a string')

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
