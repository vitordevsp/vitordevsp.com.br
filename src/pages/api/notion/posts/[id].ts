import { NextApiRequest, NextApiResponse } from 'next'
import { postController } from '../_resources/modules/posts/controller/postController'

async function posts(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'GET') {
    postController.get(req, res)
    return
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${method} Not Allowed`)
}

export default posts
