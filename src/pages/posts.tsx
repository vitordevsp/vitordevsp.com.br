import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { Main } from '../components/Main'
import { CardTexts } from '../components/CardTexts'
import { getPostsDevTo, PostsProps } from '../services/devTo'

interface PagePostsProps {
  posts: PostsProps
}

export default function Posts({ posts }: PagePostsProps) {
  return (
    <Main>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Posts
        </Heading>

        <Text textAlign="center">
          {posts.total}
          {posts.total > 1 ? ' Posts' : ' Post'}
        </Text>
      </Stack>

      <SimpleGrid columns={2} spacing={8}>
        {posts.items.map(post => (
          <CardTexts
            key={post.id}
            title={post.title}
            date={post.publishedAt}
            description={post.description}
            badges={post.tags}
            href={post.urlPost}
          />
        ))}
      </SimpleGrid>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getPostsDevTo(50)

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 6, // 6 hours
  }
}
