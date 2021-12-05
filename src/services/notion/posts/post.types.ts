/* eslint-disable camelcase */
export interface PostType {
  id: string
  slug: string
  title: string
  description: string
  tags: string[]
  status: null | 'published' | 'writing'
  publishedAt: string
}

export interface PostReqType {
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
  properties: {
    status: {
      id: string
      type: 'select'
      select: null | {
        id: string
        name: 'published' | 'writing'
        color: string
      }
    }
    tags: {
      id: string
      type: 'multi_select'
      multi_select: {
        id: string
        name: string
        color: string
      }[]
    }
    publishedAt: {
      id: string
      type: 'date'
      date: null | {
        start: null | string
        end: null | string
      }
    }
    description: {
      id: string
      type: 'rich_text'
      rich_text: {
        type: 'text'
        text: {
          content: string
          link: null
        }
        annotations: {
          bold: boolean
          italic: boolean
          strikethrough: boolean
          underline: boolean
          code: boolean
          color: string
        }
        plain_text: string
        href: null
      }[]
    }
    title: {
      id: string
      type: 'title'
      title: {
        type: 'text'
        text: {
          content: string
          link: null
        }
        annotations: {
          bold: boolean
          italic: boolean
          strikethrough: boolean
          underline: boolean
          code: boolean
          color: string
        }
        plain_text: string
        href: null
      }[]
    }
  }
}

export interface DatabaseReqType {
  object: 'list'
  results: PostReqType[]
  next_cursor: null
  has_more: boolean
}
