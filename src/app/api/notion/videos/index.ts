import { NextApiRequest, NextApiResponse } from "next"
import { videoController } from "../_resources/modules/videos/controller/videoController"

async function videos(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === "GET") {
    videoController.list(req, res)
    return
  }

  res.setHeader("Allow", ["GET"])
  res.status(405).end(`Method ${method} Not Allowed`)
}

export default videos
