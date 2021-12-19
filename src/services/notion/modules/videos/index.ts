import { notionClient } from '../../notionClient'
import { VideoReqType, VideosType, VideoType } from './video.types'
import { generateProperties } from './video.utils'
import { parseDateText } from '../../../../utils/DateUtil'

const NOTION_DB_VIDEOS = process.env.NOTION_DB_VIDEOS || ''

async function list(pageSize?: number): Promise<VideosType> {
  try {
    const database = await notionClient.getDatabase<VideoReqType[]>(NOTION_DB_VIDEOS, {
      filter: {
        or: [
          {
            property: 'status',
            select: {
              equals: 'published',
            },
          },
        ],
      },
      sorts: [{
        property: 'publishedAt',
        direction: 'descending',
      }],
      pageSize,
    })

    const videos = database.data.map(dbVideo => {
      const props = generateProperties(dbVideo)
      const dateDisplay = parseDateText(props.publishedAt)

      const video: VideoType = {
        id: dbVideo.id,
        dateDisplay,
        ...props,
      }

      return video
    })

    const videosData: VideosType = {
      totalCount: database.totalCount,
      data: videos,
    }

    return videosData
  } catch (error) {
    return {
      totalCount: 0,
      data: [],
    }
  }
}

export const videos = {
  list,
}
