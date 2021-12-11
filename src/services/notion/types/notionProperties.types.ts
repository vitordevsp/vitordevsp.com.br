/* eslint-disable camelcase */

export interface SelectType {
  id: string
  type: 'select'
  select: null | {
    id: string
    name: string
    color: string
  }
}

export interface MultiSelectType {
  id: string
  type: 'multi_select'
  multi_select: {
    id: string
    name: string
    color: string
  }[]
}

export interface DateType {
  id: string
  type: 'date'
  date: null | {
    start: null | string
    end: null | string
  }
}

export interface RichTextType {
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

export interface TitleType {
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

export interface UrlType {
  id: string
  type: string
  url: string
}
