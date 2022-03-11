import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPropsContext } from 'next'

import { Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { Badge } from '../../components/Badge'
import { FlexGap } from '../../components/FlexGap'

import { postService } from '../api/notion/_resources/modules/posts/services/postService'
import { parseBlocksToComponents } from '../../utils/NotionUtil'
import { PostDataType } from '../api/notion/_resources/modules/posts/types/post.types'

import { config } from '../../components/config'

interface PostProps {
  post: PostDataType | null
}

export default function Post({ post }: PostProps) {
  const [componentsJSX, setComponentsJSX] = useState<ReactElement[] | null>(null)

  useEffect(() => {
    if (post?.data?.body) {
      const components = parseBlocksToComponents(post.data.body)
      setComponentsJSX(components)
    }
  }, [post])

  if (!post?.data?.body) {
    return <Spinner position="absolute" top="50%" left="50%" />
  }

  return (
    <Stack width="100" maxWidth="900px" margin="40px auto" spacing={10}>
      <Stack as="header" align="center">
        <Heading as="h1" maxWidth="700px" textAlign="center">{post?.data.title}</Heading>

        <Text textAlign="center">{post?.data.description}</Text>

        {post?.data.tags && (
          <FlexGap justify="center">
            {post?.data.tags.map((tag: string, i: number) => (
              <Badge key={i} bg="gray.700">{tag}</Badge>
            ))}
          </FlexGap>
        )}

        <Text fontSize="sm">{post?.data.dateDisplay}</Text>
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

    const post = await postService.get(pageId, true)

    return {
      props: {
        post: {
          data: post,
        },
      },
      revalidate: config.revalidate,
    }
  } catch (e) {
    return {
      props: { post: null },
      revalidate: 1,
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
