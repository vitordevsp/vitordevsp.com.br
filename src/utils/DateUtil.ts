export const parseStringToDate = (dateString: string) => {
  return new Date(dateString)
}

export const parseDateText = (dateString: string, timeZone = "UTC") => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone,
  })
}
