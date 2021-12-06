/* eslint-disable camelcase */

export interface NotionDatabaseType {
  object: 'list'
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
