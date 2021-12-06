import { GetStaticProps } from 'next'
import { Box, SimpleGrid } from '@chakra-ui/react'

import { Main } from '../components/Main'
import { CardInfo } from '../components/CardInfo'
import { CardTexts } from '../components/CardTexts'
import { TitleSection } from '../components/TitleSection'

import { getVideosYoutube, VideosProps } from '../services/youtube'
import { notion } from '../services/notion'
import { ProjectType } from '../services/notion/modules/projects/project.types'
import { PostType } from '../services/notion/modules/posts/post.types'
import { config } from '../components/config'

interface HomeProps {
  videos: VideosProps
  projects: ProjectType[]
  posts: PostType[]
}

export default function Home({ videos, projects, posts }: HomeProps) {
  const totalProjects = projects.length
  const totalPosts = posts.length

  return (
    <Main>
      <Box id="section-videos" as="section">
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

      <Box id="section-projects" as="section">
        <TitleSection
          href="/projects"
          title="Últimos Projetos"
          subTitle={`${totalProjects} ${totalProjects > 1 ? ' Projetos' : ' Projeto'}`}
          mb={8}
        />

        <SimpleGrid columns={[null, 1, 2]} spacing={8}>
          {projects.map(repo => (
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

      <Box id="section-posts" as="section">
        <TitleSection
          href="/posts"
          title="Últimos Posts"
          subTitle={`${totalPosts} ${totalPosts > 1 ? 'Posts' : 'Post'}`}
          mb={8}
        />

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
      </Box>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const videos = await getVideosYoutube(3)
  const projects = await notion.projects.list()
  const posts = await notion.posts.list()

  return {
    props: {
      videos,
      projects,
      posts,
    },
    revalidate: config.revalidate,
  }
}
