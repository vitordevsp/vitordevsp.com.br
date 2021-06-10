import { Heading, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { CardInfoLarge } from '../components/CardInfoLarge'
import { getVideosYoutube, VideosProps } from '../services/youtube'

interface PageVideosProps {
  videos: VideosProps
}

export default function Videos({ videos }: PageVideosProps) {
  return (
    <Stack as="main" my={20} spacing={20}>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Vídeos
        </Heading>

        <Text textAlign="center">
          {videos.total}
          {videos.total > 1 ? ' Vídeos' : ' Vídeo'}
        </Text>
      </Stack>

      <Stack align="center" spacing={20}>
        {videos.items.map(video => (
          <CardInfoLarge
            key={video.id}
            src={video.thumbnails.maxres}
            badges={video.tags}
            title={video.title}
            description={video.description}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const videos = await getVideosYoutube(50)

  return {
    props: {
      videos,
    },
    revalidate: 60 * 60 * 6, // 6 hours
  }
}
