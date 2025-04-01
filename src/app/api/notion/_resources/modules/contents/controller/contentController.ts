import { NextApiRequest, NextApiResponse } from 'next'
import { contentService } from '../services/contentService'

async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    let pageSize = Number(req.query.pageSize)
    if (!pageSize) pageSize = 50

    const contentsData = await contentService.list(pageSize)

    return res.status(200).json(contentsData)
  } catch (error) {
    return res.status(500).json({ message: 'internal error' })
  }
}

async function listTags(req: NextApiRequest, res: NextApiResponse) {
  try {
    let pageSize = Number(req.query.pageSize)
    if (!pageSize) pageSize = 50

    const tagsData = await contentService.listTags(pageSize)

    return res.status(200).json(tagsData)
  } catch (error) {
    return res.status(500).json({ message: 'internal error' })
  }
}

export const contentController = {
  list,
  listTags,
}
