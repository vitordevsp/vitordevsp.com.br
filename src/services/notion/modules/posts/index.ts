import { notionClient } from '../../notionClient'
import { PostReqType, PostsType, PostType } from './post.types'
import { generateProperties, generateSlug } from './post.utils'

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

    const posts = database.data.map(dbPost => {
      const props = generateProperties(dbPost)
      const slug = generateSlug(dbPost.url)
      const publishedAt = new Date(props.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      })

      const post: PostType = {
        ...props,
        id: dbPost.id,
        slug,
        publishedAt,
      }

      return post
    })

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
}

export const posts = {
  list,
  getPage,
}
