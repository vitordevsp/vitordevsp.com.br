import { NextApiRequest, NextApiResponse } from "next"
import { videoService } from "../services/videoService"

async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    let pageSize = Number(req.query.pageSize)
    if (!pageSize) pageSize = 30

    const videosData = await videoService.list(pageSize)

    return res.status(200).json(videosData)
  } catch (error) {
    return res.status(500).json({ message: "internal error" })
  }
}

export const videoController = {
  list,
}
