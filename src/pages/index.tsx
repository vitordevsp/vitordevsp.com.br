import { GetStaticProps } from 'next'
import { Box, SimpleGrid, Stack } from '@chakra-ui/react'

import { CardInfo } from '../components/CardInfo'
import { CardPost } from '../components/CardPost'
import { TitleSection } from '../components/TitleSection'

import { getVideosYoutube, YoutubeVideoProps } from '../services/youtube'
import { getPostsDevTo, PostProps } from '../services/devTo'

interface HomeProps {
  arrayVideos: YoutubeVideoProps[]
  arrayPosts: PostProps[]
}

const srcImage = 'https://cdn.dribbble.com/users/690168/screenshots/6292240/shot-money-saving.png'

export default function Home({ arrayVideos, arrayPosts }: HomeProps) {
  return (
    <Stack as="main" my={20} spacing={20}>
      <Box as="section">
        <TitleSection
          href="/projects"
          title="Últimos Projetos"
          subTitle="5 Projetos"
          mb={8}
        />

        <SimpleGrid columns={3} spacing={8}>
          <CardInfo
            src={srcImage}
            badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript', 'Typescript']}
            title="GitHub Explore"
            description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          />

          <CardInfo
            src={srcImage}
            badges={['ReactJS', 'NextJS']}
            title="GitHub Explore"
            description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          />

          <CardInfo
            src={srcImage}
            title="GitHub Explore"
            description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          />
        </SimpleGrid>
      </Box>

      <Box as="section">
        <TitleSection
          href="/videos"
          title="Últimos Vídeos"
          subTitle={`${arrayVideos.length} ${arrayVideos.length > 1 ? 'Vídeos' : 'Vídeo'}`}
          mb={8}
        />

        <SimpleGrid columns={3} spacing={8}>
          {arrayVideos.map(video => (
            <CardInfo
              key={video.id}
              src={video.thumbnails.maxres}
              badges={video.tags}
              title={video.title}
              description={video.description}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box as="section">
        <TitleSection
          href="/posts"
          title="Últimos Posts"
          subTitle={`${arrayPosts.length} ${arrayPosts.length > 1 ? 'Posts' : 'Post'}`}
          mb={8}
        />

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
      </Box>
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const arrayVideos = await getVideosYoutube(3)
  const arrayPosts = await getPostsDevTo(6)

  return {
    props: {
      arrayVideos,
      arrayPosts,
    },
    revalidate: 60 * 60 * 6, // 6 hours
  }
}
