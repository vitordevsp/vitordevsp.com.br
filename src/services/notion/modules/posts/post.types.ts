/* eslint-disable camelcase */

import { NotionPageType } from '../../types/notion.types'
import { DateType, MultiSelectType, RichTextType, SelectType, TitleType } from '../../types/notionProperties.types'

export type PostStatusType = 'published' | 'writing'

export interface PostPropsType {
  title: string
  description: string
  tags: string[]
  status: null | PostStatusType
  publishedAt: string
}

export interface PostType extends PostPropsType {
  id: string
  slug: string
  dateDisplay: string
}

export interface PostsType {
  totalCount: number
  data: PostType[]
}

export interface PostReqType extends NotionPageType {
  properties: {
    status: SelectType
    tags: MultiSelectType
    publishedAt: DateType
    description: RichTextType
    title: TitleType
  }
}
