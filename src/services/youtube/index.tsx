import axios from 'axios'
import { ArrayVideosProps } from './types/ArrayVideosProps'
import { VideoProps } from './types/VideoProps'

export interface VideosProps {
  total: number
  items: {
    id: string
    title: string
    description: string
    tags: string[]
    publishedAt: string
    urlVideo: string
    thumbnails: {
      high: string
      maxres: string
    }
  }[]
}

export async function getVideosYoutube(maxResults: number): Promise<VideosProps> {
  try {
    const { YT_API_KEY, YT_CHANNEL_ID } = process.env

    const { data } = await axios.get<ArrayVideosProps>('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: YT_API_KEY,
        channelId: YT_CHANNEL_ID,
        part: 'snippet',
        order: 'date',
      },
    })

    const arrayVideosPromise = data.items
      .filter(video => video.id.kind === 'youtube#video')
      .map(async video => {
        const { data } = await axios.get<VideoProps>('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            key: YT_API_KEY,
            id: video.id.videoId,
            part: 'snippet,statistics',
          },
        })

        const tags = data.items[0].snippet.tags || []

        return {
          id: video.id.videoId,
          title: video.snippet.title,
          description: video.snippet.description,
          tags,
          publishedAt: video.snippet.publishedAt,
          urlVideo: `https://www.youtube.com/watch?v=${video.id.videoId}`,
          thumbnails: {
            high: data.items[0].snippet.thumbnails.high.url,
            maxres: data.items[0].snippet.thumbnails.maxres.url,
          },
        }
      })

    const arrayVideosFormatted = await Promise.all(arrayVideosPromise)
    const arrayVideos = [...arrayVideosFormatted].splice(0, maxResults)

    return {
      total: arrayVideosFormatted.length,
      items: arrayVideos,
    }
  } catch {
    return {
      total: 0,
      items: [],
    }
  }
}
