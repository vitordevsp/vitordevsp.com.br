/* eslint-disable camelcase */

/* -------------------- Props -------------------- */

export type PropTypeType = 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'code'
  | 'to_do'
  | 'toggle'
  | 'child_page'
  | 'child_database'
  | 'embed'
  | 'image'
  | 'video'
  | 'file'
  | 'pdf'
  | 'bookmark'
  | 'callout'
  | 'quote'
  | 'equation'
  | 'divider'
  | 'table_of_contents'
  | 'column'
  | 'column_list'
  | 'link_preview'
  | 'synced_block'
  | 'template'
  | 'link_to_page'
  | 'table'
  | 'table_row'
  | 'unsupported'

export interface PropTextType {
  type: 'text'
  text: {
    content: string
    link: null | {
      url: string
    }
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: 'default'
  }
  plain_text: string
  href: string | null
}

/* -------------------- Blocks -------------------- */

export interface ParagraphType {
  text: PropTextType[]
}

export interface H1Type {
  text: PropTextType[]
}

export interface H2Type {
  text: PropTextType[]
}

export interface H3Type {
  text: PropTextType[]
}

export interface BulletedListItemType {
  text: PropTextType[]
}

// 'numbered_list_item'

// 'code'
export interface CodeType {
  caption: any[]
  language: 'plain text'
  text: PropTextType[]
}

// 'to_do'

// 'toggle'

// 'child_page'

// 'child_database'

// 'embed'

// 'image'
export interface ImageType {
  caption: []
  type: 'file'
  file: {
    url: string
    expiry_time: string
  },
}

// 'video'

// 'file'

// 'pdf'

// 'bookmark'

// 'callout'

// 'quote'

// 'equation'

// 'divider'

// 'table_of_contents'

// 'column'

// 'column_list'

// 'link_preview'

// 'synced_block'

// 'template'

// 'link_to_page'

// 'table'

// 'table_row'

// 'unsupported'
