import type {
  EnsureNotionPropertiesSchema,
  NotionDateProperty,
  NotionMultiSelectProperty,
  NotionRichTextProperty,
  NotionSelectProperty,
  NotionTitleProperty,
} from "@/lib/notion"

export type PostProps = EnsureNotionPropertiesSchema<{
  Status: NotionSelectProperty
  Wiki: NotionSelectProperty
  Nome: NotionTitleProperty
  Descricao: NotionRichTextProperty
  Tags: NotionMultiSelectProperty<string>
  "Publicado Em": NotionDateProperty
  "Atualizado Em": NotionDateProperty
  "Criado Em": NotionDateProperty
  Ano: NotionSelectProperty
}>
