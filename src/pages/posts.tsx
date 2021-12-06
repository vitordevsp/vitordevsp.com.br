import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { Main } from '../components/Main'
import { CardTexts } from '../components/CardTexts'

import { notion } from '../services/notion'
import { PostType } from '../services/notion/modules/posts/post.types'
import { config } from '../components/config'

interface PagePostsProps {
  posts: PostType[]
}

export default function Posts({ posts }: PagePostsProps) {
  const totalPosts = posts.length

  return (
    <Main>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Posts
        </Heading>

        <Text textAlign="center">
          {totalPosts}
          {totalPosts > 1 ? ' Posts' : ' Post'}
        </Text>
      </Stack>

      <SimpleGrid columns={[null, 1, 2]} spacing={8}>
        {posts.map(post => (
          <CardTexts
            key={post.id}
            title={post.title}
            date={post.publishedAt}
            description={post.description}
            badges={post.tags}
            href={post.slug}
          />
        ))}
      </SimpleGrid>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await notion.posts.list()

  return {
    props: {
      posts,
    },
    revalidate: config.revalidate,
  }
}
