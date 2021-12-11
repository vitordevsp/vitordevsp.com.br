import { notionClient } from '../../notionClient'
import { DatabaseReqType, VideoType } from './video.types'
import { generateProperties } from './video.utils'

const NOTION_DB_VIDEOS = process.env.NOTION_DB_VIDEOS || ''

async function list(): Promise<VideoType[]> {
  try {
    const database = await notionClient.getDatabase<DatabaseReqType>(NOTION_DB_VIDEOS, {
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
    })

    const videos = database.results.map(dbVideo => {
      const props = generateProperties(dbVideo)

      const video: VideoType = {
        id: dbVideo.id,
        ...props,
      }

      return video
    })

    return videos
  } catch (error) {
    return []
  }
}

export const videos = {
  list,
}
