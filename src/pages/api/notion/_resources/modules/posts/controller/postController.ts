import { NextApiRequest, NextApiResponse } from 'next'
import { postService } from '../services/postService'

async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    // TODO: implementar pageSize
    const postsData = await postService.list()

    return res.status(200).json(postsData)
  } catch (error) {
    return res.status(500).json({ message: 'internal error' })
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, body } = req.query

    if (typeof id !== 'string') throw new TypeError('id is not a string')

    // TODO: colocar essa implementação dentro da camana de Service
    const getData = body === 'true'
      ? postService.getFullPost
      : postService.getPostProps

    const post = await getData(id)

    const postData = { post }

    return res.status(200).json(postData)
  } catch (error) {
    return res.status(500).json({ message: 'internal error' })
  }
}

export const postController = {
  list,
  get,
}
