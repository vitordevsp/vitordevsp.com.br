import { GetStaticProps } from 'next'
import { Box, SimpleGrid } from '@chakra-ui/react'

import { Main } from '../components/Main'
import { CardInfo } from '../components/CardInfo'
import { CardTexts } from '../components/CardTexts'
import { TitleSection } from '../components/TitleSection'

import { getVideosYoutube, VideosProps } from '../services/youtube'
import { getRepositoriesGitHub, RepositoriesProps } from '../services/github'
import { getPostsDevTo, PostsProps } from '../services/devTo'
import { config } from '../components/config'

interface HomeProps {
  videos: VideosProps
  repositories: RepositoriesProps
  posts: PostsProps
}

export default function Home({ videos, repositories, posts }: HomeProps) {
  return (
    <Main>
      <Box as="section">
        <TitleSection
          href="/videos"
          title="Últimos Vídeos"
          subTitle={`${videos.total} ${videos.total > 1 ? 'Vídeos' : 'Vídeo'}`}
          mb={8}
        />

        <SimpleGrid
          w={[null, '370px', '100%']}
          columns={[null, 1, 3]}
          mx="auto"
          spacing={8}
        >
          {videos.items.map(video => (
            <CardInfo
              key={video.id}
              src={video.thumbnails.high}
              badges={video.tags}
              title={video.title}
              description={video.description}
              href={video.urlVideo}
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

        <SimpleGrid columns={[null, 1, 3]} spacing={8}>
          {repositories.items.map(repo => (
            <CardTexts
              key={repo.id}
              title={repo.name}
              description={repo.description}
              badges={repo.tags}
              href={repo.urlSite || repo.urlRepo}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box as="section">
        <TitleSection
          href="/posts"
          title="Últimos Posts"
          subTitle={`${posts.total} ${posts.total > 1 ? 'Posts' : 'Post'}`}
          mb={8}
        />

        <SimpleGrid columns={[null, 1, 2]} spacing={8}>
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
      </Box>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const videos = await getVideosYoutube(3)
  const repositories = await getRepositoriesGitHub(3)
  const posts = await getPostsDevTo(6)

  return {
    props: {
      videos,
      repositories,
      posts,
    },
    revalidate: config.revalidate,
  }
}
