import { ContentType } from './content.types'
import { getContents } from './content.utils'

async function list(pageSize?: number): Promise<ContentType[]> {
  const contents = await getContents(pageSize)

  if (pageSize) {
    return contents.slice(0, pageSize)
  } else {
    return contents
  }
}

async function listTags(pageSize?: number): Promise<string[]> {
  const contents = await getContents(pageSize)

  const allTags = contents.reduce((acc, content) => {
    const { tags } = content
    return [...acc, ...tags]
  }, [] as string[])

  const tagsUniq = Array.from(new Set(allTags))
  const tagsOrdened = tagsUniq.sort()

  if (pageSize) {
    return tagsOrdened.slice(0, pageSize)
  } else {
    return tagsOrdened
  }
}

export const contents = {
  list,
  listTags,
}
