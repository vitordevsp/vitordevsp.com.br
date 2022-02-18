import { notionClient } from '../../notionClient'
import { PostReqType, PostsType } from './post.types'
import { generateObjPost } from './post.utils'

const NOTION_DB_POSTS = process.env.NOTION_DB_POSTS || ''

async function list(pageSize?: number): Promise<PostsType> {
  try {
    const database = await notionClient.getDatabase<PostReqType[]>(NOTION_DB_POSTS, {
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

    const posts = database.data.map(postReq => generateObjPost(postReq))

    const postsData: PostsType = {
      totalCount: database.totalCount,
      data: posts,
    }

    return postsData
  } catch (error) {
    return {
      totalCount: 0,
      data: [],
    }
  }
}

async function getPage(pageId: string) {
  const page = await notionClient.getPage<PostReqType>(pageId)

  const post = generateObjPost(page)

  return post
}

async function getPageBody(pageId: string) {
  const pageBody = await notionClient.getBlocksFromPage(pageId)
  return pageBody
}

export const posts = {
  list,
  getPage,
  getPageBody,
}
