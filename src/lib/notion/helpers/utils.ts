export const generateNotionPageSlug = (string: string) => {
  const replace = string.replace("https://www.notion.so/", "")
  return replace
}

export const generateNotionPageID = (slug: string) => {
  const start = slug.lastIndexOf("-") + 1
  const end = slug.length
  const pageId = slug.slice(start, end)
  return pageId
}

export const parseDateDisplay = <T extends string | undefined>(dateString: T, timeZone = "UTC"): T extends string ? string : undefined => {
  if (!dateString) return undefined as any

  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone,
  }) as any
}
