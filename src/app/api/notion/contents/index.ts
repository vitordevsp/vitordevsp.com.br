import { NextApiRequest, NextApiResponse } from 'next'
import { contentController } from '../_resources/modules/contents/controller/contentController'

async function contents(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'GET') {
    contentController.list(req, res)
    return
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${method} Not Allowed`)
}

export default contents
