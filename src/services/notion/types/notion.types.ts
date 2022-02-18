/* eslint-disable camelcase */

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

// TODO: concluir a criação da tipagem
export interface NotionBlockType {
  object: 'block'
  id: string
  archived: false
  has_children: true
  created_time: string
  last_edited_time: string
  type: 'child_page'
  child_page?: {
    title: string
  }
}
