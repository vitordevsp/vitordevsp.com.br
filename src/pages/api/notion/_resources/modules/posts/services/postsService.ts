import { notionRepository } from '../../../notionRepository/notionRepository'
import { PostReqType, PostsType } from '../types/post.types'
import { generateObjPost } from './post.utils'

const NOTION_DB_POSTS = process.env.NOTION_DB_POSTS || ''

async function list(pageSize?: number): Promise<PostsType> {
  try {
    const database = await notionRepository.getDatabase<PostReqType[]>(NOTION_DB_POSTS, {
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

async function getPostProps(pageId: string) {
  const page = await notionRepository.getPage<PostReqType>(pageId)

  const post = generateObjPost(page)

  return post
}

async function getPostBody(pageId: string) {
  const pageBody = await notionRepository.getBlocksFromPage(pageId)
  return pageBody
}

async function getFullPost(pageId: string) {
  const postProps = await getPostProps(pageId)
  const postBody = await getPostBody(pageId)

  const post = {
    ...postProps,
    body: postBody,
  }

  return post
}

export const postsService = {
  list,
  getPostProps,
  getPostBody,
  getFullPost,
}
