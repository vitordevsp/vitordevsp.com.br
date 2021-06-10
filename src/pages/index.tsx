import { GetStaticProps } from 'next'
import { Box, SimpleGrid, Stack } from '@chakra-ui/react'

import { CardInfo } from '../components/CardInfo'
import { CardTexts } from '../components/CardTexts'
import { TitleSection } from '../components/TitleSection'

import { getVideosYoutube, YoutubeVideoProps } from '../services/youtube'
import { getPostsDevTo, PostProps } from '../services/devTo'
import { getRepositoriesGitHub, RepositoriesProps } from '../services/github'

interface HomeProps {
  arrayVideos: YoutubeVideoProps[]
  repositories: RepositoriesProps
  arrayPosts: PostProps[]
}

export default function Home({ arrayVideos, repositories, arrayPosts }: HomeProps) {
  return (
    <Stack as="main" my={20} spacing={20}>
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
          href="/projects"
          title="Últimos Projetos"
          subTitle={`${repositories.total} ${repositories.total > 1 ? ' Projetos' : ' Projeto'}`}
          mb={8}
        />

        <SimpleGrid columns={3} spacing={8}>
          {repositories.items.map(repo => (
            <CardTexts
              key={repo.id}
              title={repo.name}
              description={repo.description}
              badges={repo.tags}
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
            <CardTexts
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
  const repositories = await getRepositoriesGitHub(3)
  const arrayPosts = await getPostsDevTo(6)

  return {
    props: {
      arrayVideos,
      repositories,
      arrayPosts,
    },
    revalidate: 60 * 60 * 6, // 6 hours
  }
}
