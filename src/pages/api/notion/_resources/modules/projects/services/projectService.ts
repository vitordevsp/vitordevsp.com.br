import { notionRepository } from '../../../notionRepository/notionRepository'
import { generateProperties } from './projectService.util'
import { parseDateText } from '../../../../../../../utils/DateUtil'
import { ProjectReqType, ProjectsType, ProjectType } from '../types/project.types'

const NOTION_DB_PROJECTS = process.env.NOTION_DB_PROJECTS || ''

async function list(pageSize?: number): Promise<ProjectsType> {
  try {
    const database = await notionRepository.getDatabase<ProjectReqType[]>(NOTION_DB_PROJECTS, { pageSize })

    const projects = database.data.map(dbProject => {
      const props = generateProperties(dbProject)
      const dateDisplay = parseDateText(props.publishedAt)

      const project: ProjectType = {
        id: dbProject.id,
        dateDisplay,
        ...props,
      }

      return project
    })

    const projectsData: ProjectsType = {
      totalCount: projects.length,
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

export const projectService = {
  list,
}
