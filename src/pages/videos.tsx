import { Heading, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps, GetStaticPropsResult } from 'next'

import { Main } from '../components/Main'
import { CardInfoLarge } from '../components/CardInfoLarge'

// import { api } from '../services/api'
import { videoService } from './api/notion/_resources/modules/videos/services/videoService'
import { VideosDataType } from './api/notion/_resources/modules/videos/types/video.types'

import { config } from '../components/config'

interface PageVideosProps {
  videos: VideosDataType | null
}

export default function Videos({ videos }: PageVideosProps) {
  const totalCount = videos?.totalCount || 0

  return (
    <Main>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Vídeos
        </Heading>

        <Text textAlign="center">
          {totalCount} {totalCount > 1 ? ' Vídeos' : ' Vídeo'}
        </Text>
      </Stack>

      <Stack align="center" spacing={20}>
        {videos?.data.map(video => (
          <CardInfoLarge
            key={video.id}
            src={video.thumbnail}
            title={video.title}
            date={video.dateDisplay}
            badges={video.tags}
            description={video.description}
            href={video.urlVideo}
          />
        ))}
      </Stack>
    </Main>
  )
}

type GetStaticPropsType = GetStaticPropsResult<{ videos: VideosDataType | null }>

export const getStaticProps: GetStaticProps = async (ctx): Promise<GetStaticPropsType> => {
  try {
    // const { data: videos } = await api.get<VideosDataType>('notion/videos')

    const videos = await videoService.list()

    return {
      props: {
        videos,
      },
      revalidate: config.revalidate,
    }
  } catch (e) {
    return {
      props: {
        videos: null,
      },
      revalidate: 1,
    }
  }
}
