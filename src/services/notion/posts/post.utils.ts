import { PostReqType } from './post.types'

interface PostPropsType {
  title: string
  description: string
  tags: string[]
  status: null | 'published' | 'writing'
  publishedAt: string
}

export const generateSlug = (string: string) => {
  const replace = string.replace('https://www.notion.so/', '')
  return replace
}

export const generateProperties = (dbPost: PostReqType): PostPropsType => {
  const { title, description, tags, status, publishedAt } = dbPost.properties

  const props: PostPropsType = {
    title: title.title[0]?.plain_text || '',
    description: description.rich_text[0]?.plain_text || '',
    tags: tags.multi_select.map(s => s.name),
    status: status.select?.name || null,
    publishedAt: publishedAt.date?.start || '',
  }

  return props
}
