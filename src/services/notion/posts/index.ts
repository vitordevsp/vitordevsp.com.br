import { notionClient } from '../notionClient'
import { DatabaseReqType, PostType } from './post.types'
import { generateProperties, generateSlug } from './post.utils'

const NOTION_DB_POSTS = process.env.NOTION_DB_POSTS || ''

async function list(): Promise<PostType[]> {
  try {
    const database = await notionClient.getDatabase<DatabaseReqType>(NOTION_DB_POSTS)

    const posts = database.results.map(dbPost => {
      const slug = generateSlug(dbPost.url)

      const props = generateProperties(dbPost)

      const post: PostType = {
        id: dbPost.id,
        slug,
        ...props,
      }

      return post
    })

    return posts
  } catch (error) {
    return []
  }
}

async function getPage(pageId: string) {
}

export const posts = {
  list,
  getPage,
}
