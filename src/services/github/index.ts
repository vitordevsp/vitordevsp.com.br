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
  const { USER_NAME } = process.env
  const apiUrl = `https://api.github.com/users/${USER_NAME}/repos`

  const { data } = await axios.get<RepositoryGitHubProps[]>(apiUrl, {
    headers: {
      Accept: 'application/vnd.github.mercy-preview+json',
    },
  })

  const arrayRepositoriesFormatted = data
    .filter(repo => repo.name !== USER_NAME)
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
}
