import { NextApiRequest, NextApiResponse } from "next"
import { projectService } from "../services/projectService"

async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    let pageSize = Number(req.query.pageSize)
    if (!pageSize) pageSize = 30

    const projectsData = await projectService.list(pageSize)

    return res.status(200).json(projectsData)
  } catch (error) {
    return res.status(500).json({ message: "internal error" })
  }
}

export const projectController = {
  list,
}
