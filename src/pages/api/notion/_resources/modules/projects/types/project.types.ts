/* eslint-disable camelcase */

import { NotionPageType } from '../../../notionRepository/types/notion.types'
import { DateType, MultiSelectType, RichTextType, TitleType, UrlType } from '../../../notionRepository/types/notionProperties.types'

export interface ProjectPropsType {
  name: string
  description: string
  urlRepo: string
  urlSite: string
  tags: string[]
  publishedAt: string
}

export interface ProjectType extends ProjectPropsType {
  id: string
  dateDisplay: string
}

export interface ProjectsType {
  totalCount: number
  data: ProjectType[]
}

export interface ProjectReqType extends NotionPageType {
  properties: {
    description: RichTextType
    publishedAt: DateType
    tags: MultiSelectType
    urlSite: UrlType
    urlRepo: UrlType
    name: TitleType
  },
}
