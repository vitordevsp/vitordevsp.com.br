import axios from 'axios'
import { PostDevToProps } from './types/PostDevToProps'

export interface PostsProps {
  total: number
  items: {
    id: number
    title: string
    description: string
    tags: string[]
    publishedAt: string
    urlPost: string
  }[]
}

export async function getPostsDevTo(maxResults: number): Promise<PostsProps> {
  try {
    const { data } = await axios.get<PostDevToProps[]>('https://dev.to/api/articles', {
      params: {
        username: process.env.DEVTO_USERNAME,
      },
    })

    const arrayPostsFormatted = data.map(post => {
      const dateFormatted = new Date(post.published_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })

      return {
        id: post.id,
        title: post.title,
        description: post.description,
        tags: post.tag_list,
        publishedAt: dateFormatted,
        urlPost: post.url,
      }
    })

    const arrayPosts = [...arrayPostsFormatted].splice(0, maxResults)

    return {
      total: arrayPostsFormatted.length,
      items: arrayPosts,
    }
  } catch {
    return {
      total: 0,
      items: [],
    }
  }
}
