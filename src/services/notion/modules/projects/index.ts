import { notionClient } from '../../notionClient'
import { ProjectReqType, ProjectsType, ProjectType } from './project.types'
import { generateProperties } from './project.utils'

const NOTION_DB_PROJECTS = process.env.NOTION_DB_PROJECTS || ''

async function list(pageSize?: number): Promise<ProjectsType> {
  try {
    const database = await notionClient.getDatabase<ProjectReqType[]>(NOTION_DB_PROJECTS, { pageSize })

    const projects = database.data.map(dbProject => {
      const props = generateProperties(dbProject)
      const project: ProjectType = {
        id: dbProject.id,
        ...props,
      }

      return project
    })

    const projectsData: ProjectsType = {
      totalCount: database.totalCount,
      data: projects,
    }

    return projectsData
  } catch (error) {
    return {
      totalCount: 0,
      data: [],
    }
  }
}

export const projects = {
  list,
}
