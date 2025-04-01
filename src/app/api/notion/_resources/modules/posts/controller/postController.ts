import { NextApiRequest, NextApiResponse } from "next"
import { postService } from "../services/postService"
import { PostDataType } from "../types/post.types"

async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    let pageSize = Number(req.query.pageSize)
    if (!pageSize) pageSize = 50

    const postsData = await postService.list(pageSize)

    return res.status(200).json(postsData)
  } catch (error) {
    return res.status(500).json({ message: "internal error" })
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (typeof id !== "string") throw new TypeError("id is not a string")

    const post = await postService.get(id)

    const postData: PostDataType = {
      data: post,
    }

    return res.status(200).json(postData)
  } catch (error) {
    return res.status(500).json({ message: "internal error" })
  }
}

export const postController = {
  list,
  get,
}
