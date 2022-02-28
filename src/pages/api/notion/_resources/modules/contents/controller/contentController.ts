import { NextApiRequest, NextApiResponse } from 'next'
import { contentService } from '../services/contentService'

async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    const contentsData = await contentService.list()

    return res.status(200).json(contentsData)
  } catch (error) {
    return res.status(500).json({ message: 'internal error' })
  }
}

async function listTags(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tags = await contentService.listTags()

    const tagsData = { tags }

    return res.status(200).json(tagsData)
  } catch (error) {
    return res.status(500).json({ message: 'internal error' })
  }
}

export const contentController = {
  list,
  listTags,
}
