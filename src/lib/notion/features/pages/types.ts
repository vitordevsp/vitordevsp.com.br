// ------------------------------
// title: Properties de paginas e banco de dados
// description: Um banco de dados ou pagina tem suas props com as possibilidades de configuração do Notion
// cada propriedade tem um tipo específico e um valor específico que é definido no CMS
// ------------------------------

export type NotionRichTextNode = {
  type: "text"
  plain_text: string
  href: string | null
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
    color: string
  }
}

export type NotionTitleProperty = {
  id: string
  type: "title"
  title: NotionRichTextNode[]
}

export type NotionRichTextProperty = {
  id: string
  type: "rich_text"
  rich_text: NotionRichTextNode[]
}

export type NotionDateProperty = {
  id: string
  type: "date"
  date: {
    start: string
    end: string | null
    time_zone: string | null
  } | null
}

export type NotionSelectProperty<Option extends string = string> = {
  id: string
  type: "select"
  select: {
    id: string
    name: Option
    color: string
  } | null
  options?: {
    id: string
    name: Option
    color: string
    description?: string
  }
}

export type NotionMultiSelectProperty<Option extends string = string> = {
  id: string
  type: "multi_select"
  multi_select: {
    id: string
    name: Option
    color: string
  }[]
  options?: {
    id: string
    name: Option
    color: string
    description?: string
  }
}

export type NotionFilesProperty = {
  id: string
  type: "files"
  files: Array<
    | {
      type: "external"
      name: string
      external: {
        url: string
      }
    }
    | {
      type: "file"
      name: string
      file: {
        url: string
        expiry_time: string
      }
    }
  >
}

export type NotionAnyProperty =
  | NotionTitleProperty
  | NotionRichTextProperty
  | NotionDateProperty
  | NotionSelectProperty<string>
  | NotionMultiSelectProperty<string>
  | NotionFilesProperty

export type NotionPropertiesSchema = Record<string, NotionAnyProperty>

// Helper de verificação de tipos (gera erro em compile-time se não bater)
export type EnsureNotionPropertiesSchema<P extends NotionPropertiesSchema> = P

// ------------------------------
// title: NotionPage
// description: Página do Notion com propriedades tipadas
// ------------------------------

export type NotionPage<P extends NotionPropertiesSchema> = {
  object: "page"
  id: string
  created_time: string
  last_edited_time: string
  created_by: NotionPageUserRef
  last_edited_by: NotionPageUserRef
  cover: null | {
    type: "external"
    external: {
      url: string
    }
  }
  icon: NotionPageIcon
  parent: NotionPageParent
  archived: boolean
  in_trash: boolean
  url: string
  public_url: string | null
  properties: P
}

export type NotionPageIcon = NotionPageIconEmoji | null

export type NotionPageIconEmoji = {
  type: "emoji"
  emoji: string
}

export type NotionPageParent = {
  type: "database_id"
  database_id: string
}

export type NotionPageUserRef = {
  object: "user"
  id: string
}
