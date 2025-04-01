/* eslint-disable camelcase */
import { NotionBlockType, NotionPageType } from "../../../notionRepository/types/notion.types"
import { DateType, MultiSelectType, RichTextType, SelectType, TitleType } from "../../../notionRepository/types/notionProperties.types"

export interface PostReqType extends NotionPageType {
  properties: {
    title: TitleType
    description: RichTextType
    tags: MultiSelectType
    status: SelectType
    publishedAt: DateType
  }
}

export type PostStatusType = "published" | "writing"

export interface PostPropsType {
  title: string
  description: string
  tags: string[]
  status: null | PostStatusType
  publishedAt: string
  body?: NotionBlockType[]
}

export interface PostType extends PostPropsType {
  id: string
  slug: string
  dateDisplay: string
}

export interface PostDataType {
  data: PostType
}

export interface PostsDataType {
  totalCount: number
  data: PostType[]
}
