import { Heading, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { CardInfoLarge } from '../components/CardInfoLarge'
import { getVideosYoutube, YoutubeVideoProps } from '../services/youtube'

interface VideosProps {
  arrayVideos: YoutubeVideoProps[]
}

export default function Videos({ arrayVideos }: VideosProps) {
  return (
    <Stack as="main" my={20} spacing={20}>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Vídeos
        </Heading>

        <Text textAlign="center">
          {arrayVideos.length}
          {arrayVideos.length > 1 ? ' Vídeos' : ' Vídeo'}
        </Text>
      </Stack>

      <Stack align="center" spacing={20}>
        {arrayVideos.map(video => (
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
  const arrayVideos = await getVideosYoutube(50)

  return {
    props: {
      arrayVideos,
    },
    revalidate: 60 * 60 * 6, // 6 hours
  }
}
