import { Heading, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { Main } from '../components/Main'
import { CardInfoLarge } from '../components/CardInfoLarge'

import { config } from '../components/config'
import { notion } from '../services/notion'
import { VideoType } from '../services/notion/modules/videos/video.types'

interface PageVideosProps {
  videos: VideoType[]
}

export default function Videos({ videos }: PageVideosProps) {
  const totalVideos = videos.length

  return (
    <Main>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Vídeos
        </Heading>

        <Text textAlign="center">
          {totalVideos}
          {totalVideos > 1 ? ' Vídeos' : ' Vídeo'}
        </Text>
      </Stack>

      <Stack align="center" spacing={20}>
        {videos.map(video => (
          <CardInfoLarge
            key={video.id}
            src={video.thumbnail}
            badges={video.tags}
            title={video.title}
            description={video.description}
            href={video.urlVideo}
          />
        ))}
      </Stack>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const videos = await notion.videos.list()

  return {
    props: {
      videos,
    },
    revalidate: config.revalidate,
  }
}
