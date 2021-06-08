import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { CardPost } from '../components/CardPost'
import { getPostsDevTo, PostProps } from '../services/devTo'

interface PostsProps {
  arrayPosts: PostProps[]
}

export default function Posts({ arrayPosts }: PostsProps) {
  return (
    <Stack as="main" my={20} spacing={20}>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Posts
        </Heading>

        <Text textAlign="center">
          {arrayPosts.length}
          {arrayPosts.length > 1 ? ' Posts' : ' Post'}
        </Text>
      </Stack>

      <SimpleGrid columns={2} spacing={8}>
        {arrayPosts.map(post => (
          <CardPost
            key={post.id}
            title={post.title}
            date={post.publishedAt}
            description={post.description}
            badges={post.tags}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const arrayPosts = await getPostsDevTo(50)

  return {
    props: {
      arrayPosts,
    },
    revalidate: 60 * 60 * 6, // 6 hours
  }
}
