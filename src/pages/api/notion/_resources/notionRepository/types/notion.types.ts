/* eslint-disable camelcase */
import {
  BulletedListItemType,
  CodeType,
  H1Type,
  H2Type,
  H3Type,
  ImageType,
  ParagraphType,
  PropTypeType,
} from './notionBlocks.types'

export interface NotionDatabaseType {
  object: 'list'
  results: any[]
  next_cursor: null
  has_more: boolean
}

export interface NotionPageType {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  cover: null
  icon: null | {
    type: 'emoji' | string
    emoji?: string
  }
  parent: {
    type: 'database_id' | string
    database_id: string
  }
  archived: boolean
  url: string
}

export interface NotionBlockType {
  object: 'block'
  id: string
  created_time: string
  last_edited_time: string
  has_children: boolean
  archived: boolean
  created_by: {
    object: 'user'
    id: string
  }
  last_edited_by: {
    object: 'user'
    id: string
  }
  type: PropTypeType

  paragraph?: ParagraphType
  heading_1?: H1Type
  heading_2?: H2Type
  heading_3?: H3Type
  bulleted_list_item?: BulletedListItemType
  numbered_list_item?: any
  code?: CodeType
  to_do?: any
  toggle?: any
  child_page?: any
  child_database?: any
  embed?: any
  image?: ImageType
  video?: any
  file?: any
  pdf?: any
  bookmark?: any
  callout?: any
  quote?: any
  equation?: any
  divider?: any
  table_of_contents?: any
  column?: any
  column_list?: any
  link_preview?: any
  synced_block?: any
  template?: any
  link_to_page?: any
  table?: any
  table_row?: any
  unsupported?: null
}
