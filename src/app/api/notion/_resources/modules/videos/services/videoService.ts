import { notionRepository } from "../../../notionRepository/notionRepository"
import { generateProperties } from "./videoService.utils"
import { parseDateText } from "../../../../../../../utils/DateUtil"
import { VideoReqType, VideosDataType, VideoType } from "../types/video.types"

const NOTION_DB_VIDEOS = process.env.NOTION_DB_VIDEOS || ""

async function list(pageSize?: number): Promise<VideosDataType> {
  try {
    const database = await notionRepository.getDatabase<VideoReqType[]>(NOTION_DB_VIDEOS, {
      filter: {
        or: [
          {
            property: "status",
            select: {
              equals: "published",
            },
          },
        ],
      },
      sorts: [{
        property: "publishedAt",
        direction: "descending",
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

    const videosData: VideosDataType = {
      totalCount: videos.length,
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

export const videoService = {
  list,
}
