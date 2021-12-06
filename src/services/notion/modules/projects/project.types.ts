/* eslint-disable camelcase */

import { NotionDatabaseType, NotionPageType } from '../../types/notion.types'
import { DateType, MultiSelectType, RichTextType, TitleType } from '../../types/notionProperties.types'

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
}

export interface ProjectReqType extends NotionPageType {
  properties: {
    description: RichTextType
    publishedAt: DateType
    tags: MultiSelectType
    urlSite: RichTextType
    urlRepo: RichTextType
    name: TitleType
  },
}

export interface DatabaseReqType extends NotionDatabaseType {
  results: ProjectReqType[]
}
