import { notionClient } from '../../notionClient'
import { DatabaseReqType, ProjectType } from './project.types'
import { generateProperties } from './project.utils'

const NOTION_DB_PROJECTS = process.env.NOTION_DB_PROJECTS || ''

async function list(): Promise<ProjectType[]> {
  try {
    const database = await notionClient.getDatabase<DatabaseReqType>(NOTION_DB_PROJECTS)

    const projects = database.results.map(dbProject => {
      const props = generateProperties(dbProject)
      const project: ProjectType = {
        id: dbProject.id,
        ...props,
      }

      return project
    })

    return projects
  } catch (error) {
    return []
  }
}

export const projects = {
  list,
}
