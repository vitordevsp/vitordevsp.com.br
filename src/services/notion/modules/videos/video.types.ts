/* eslint-disable camelcase */

import { NotionPageType } from '../../types/notion.types'
import { DateType, MultiSelectType, RichTextType, SelectType, TitleType } from '../../types/notionProperties.types'

export type VideoStatusType = 'published' | 'writing'

export interface VideoPropsType {
  idVideoYT: string
  title: string
  description: string
  tags: string[]
  playlist: null | string
  status: null | VideoStatusType
  publishedAt: string
  urlVideo: string
  thumbnail: string
}

export interface VideoType extends VideoPropsType {
  id: string
  dateDisplay: string
}

export interface VideosType {
  totalCount: number
  data: VideoType[]
}

export interface VideoReqType extends NotionPageType {
  properties: {
    idVideoYT: RichTextType
    title: TitleType
    description: RichTextType
    tags: MultiSelectType
    playlist: SelectType
    status: SelectType
    publishedAt: DateType
  }
}
