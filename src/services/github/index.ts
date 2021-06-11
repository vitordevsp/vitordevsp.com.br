import axios from 'axios'
import { RepositoryGitHubProps } from './types/RepositoryGitHubProps'

export interface RepositoriesProps {
  total: number
  items: {
    id: number
    name: string
    description: string
    urlRepo: string
    urlSite: string
    tags: string[]
  }[]
}

export async function getRepositoriesGitHub(maxResults: number): Promise<RepositoriesProps> {
  try {
    const { GITHUB_USERNAME } = process.env
    const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos`

    const { data } = await axios.get<RepositoryGitHubProps[]>(apiUrl, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
      },
    })

    const arrayRepositoriesFormatted = data
      .filter(repo => repo.name !== GITHUB_USERNAME)
      .map(repo => {
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          urlRepo: repo.html_url,
          urlSite: repo.homepage,
          tags: repo.topics,
        }
      })

    const arrayRepositories = [...arrayRepositoriesFormatted].splice(0, maxResults)

    return {
      total: arrayRepositoriesFormatted.length,
      items: arrayRepositories,
    }
  } catch {
    return {
      total: 0,
      items: [],
    }
  }
}
