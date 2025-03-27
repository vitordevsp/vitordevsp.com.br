import { notionRepository } from '../../../notionRepository/notionRepository'
import { PostReqType, PostsDataType, PostType } from '../types/post.types'
import { generateObjPost } from './postService.utils'

const NOTION_DB_POSTS = process.env.NOTION_DB_POSTS || ''

async function list(pageSize?: number): Promise<PostsDataType> {
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

    const postsData: PostsDataType = {
      totalCount: posts.length,
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

async function get(pageId: string, body?: boolean): Promise<PostType> {
  const getData = body
    ? getFullPost
    : getPostProps

  const post = await getData(pageId)

  return post
}

// -------------------- util --------------------

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

// -------------------- export service --------------------

export const postService = {
  list,
  get,
  error: () => {
    throw new Error("Teste")
  }
}
