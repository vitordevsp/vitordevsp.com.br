import { NextApiRequest, NextApiResponse } from "next"
import { projectController } from "../_resources/modules/projects/controller/projectController"

async function projects(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === "GET") {
    projectController.list(req, res)
    return
  }

  res.setHeader("Allow", ["GET"])
  res.status(405).end(`Method ${method} Not Allowed`)
}

export default projects
