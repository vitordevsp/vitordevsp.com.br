import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { Main } from '../components/Main'
import { CardTexts } from '../components/CardTexts'

import { api } from '../services/api'
import { PostsDataType } from './api/notion/_resources/modules/posts/types/post.types'

import { config } from '../components/config'

interface PagePostsProps {
  posts: PostsDataType | null
}

export default function Posts({ posts }: PagePostsProps) {
  const totalCount = posts?.totalCount || 0

  return (
    <Main>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Posts
        </Heading>

        <Text textAlign="center">
          {totalCount} {totalCount > 1 ? ' Posts' : ' Post'}
        </Text>
      </Stack>

      <SimpleGrid columns={[null, 1, 2]} spacing={8}>
        {posts?.data.map(post => (
          <CardTexts
            key={post.id}
            title={post.title}
            date={post.dateDisplay}
            description={post.description}
            badges={post.tags}
            href={`/post/${post.slug}`}
          />
        ))}
      </SimpleGrid>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: posts } = await api.get<PostsDataType>('/notion/posts')

    return {
      props: {
        posts,
      },
      revalidate: config.revalidate,
    }
  } catch (error) {
    return {
      props: {
        projects: null,
      },
      revalidate: 1,
    }
  }
}
