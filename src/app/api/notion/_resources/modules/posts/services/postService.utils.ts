import { parseDateText } from '@/utils/DateUtil'
import { PostPropsType, PostReqType, PostStatusType, PostType } from '../types/post.types'

export const generateSlug = (string: string) => {
  const replace = string.replace('https://www.notion.so/', '')
  return replace
}

export const generateProperties = (postReq: PostReqType): PostPropsType => {
  const { title, description, tags, status, publishedAt } = postReq.properties

  const props: PostPropsType = {
    title: title.title[0]?.plain_text || '',
    description: description.rich_text[0]?.plain_text || '',
    tags: tags.multi_select?.map(s => s.name) || [],
    status: (status.select?.name as PostStatusType) || null,
    publishedAt: publishedAt.date?.start || '',
  }

  return props
}

export const generateObjPost = (postReq: PostReqType): PostType => {
  const props = generateProperties(postReq)
  const slug = generateSlug(postReq.url)
  const dateDisplay = parseDateText(props.publishedAt)

  const post: PostType = {
    id: postReq.id,
    slug,
    dateDisplay,
    ...props,
  }

  return post
}
