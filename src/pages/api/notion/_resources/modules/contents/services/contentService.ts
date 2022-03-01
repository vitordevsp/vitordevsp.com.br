import { ContentsDataType } from '../types/content.types'
import { getContents } from './contentService.util'

async function list(pageSize?: number): Promise<ContentsDataType> {
  const contents = await getContents(pageSize)

  const contentsData: ContentsDataType = {
    totalCount: contents.length,
    data: contents,
  }

  if (pageSize) {
    const data = contentsData.data.slice(0, pageSize)
    return {
      totalCount: data.length,
      data,
    }
  } else {
    return contentsData
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

export const contentService = {
  list,
  listTags,
}
