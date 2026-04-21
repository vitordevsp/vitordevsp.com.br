/**
 * Remove o prefixo `https://www.notion.so/` de uma URL pública do Notion,
 * devolvendo só o slug final (`Titulo-da-pagina-<hash>`).
 */
export const generateNotionPageSlug = (string: string) => {
  const replace = string.replace("https://www.notion.so/", "")
  return replace
}

/**
 * Extrai o ID do Notion (32 chars hex) a partir de um slug.
 *
 * **Limitação atual**: depende do último hífen do slug. Slugs sem hífen no
 * título (ex.: apenas o ID puro) não são extraídos corretamente. Ver
 * PLAN-002-T002 para substituir por regex `/[0-9a-f]{32}$/i`.
 */
export const generateNotionPageID = (slug: string) => {
  const start = slug.lastIndexOf("-") + 1
  const end = slug.length
  const pageId = slug.slice(start, end)
  return pageId
}

/**
 * Formata uma data ISO em pt-BR no padrão `"21 de abril de 2026"`.
 * Retorna `undefined` quando a entrada for vazia.
 */
export const parseDateDisplay = <T extends string | undefined>(dateString: T, timeZone = "UTC"): T extends string ? string : undefined => {
  if (!dateString) return undefined as any

  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone,
  }) as any
}
