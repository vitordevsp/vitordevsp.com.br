import { ProjectPropsType, ProjectReqType } from '../types/project.types'

export const generateProperties = (dbProject: ProjectReqType): ProjectPropsType => {
  const { name, description, urlRepo, urlSite, tags, publishedAt } = dbProject.properties

  const props: ProjectPropsType = {
    name: name.title[0]?.plain_text || '',
    description: description.rich_text[0]?.plain_text || '',
    urlRepo: urlRepo.url || '',
    urlSite: urlSite.url || '',
    tags: tags.multi_select?.map(s => s.name) || [],
    publishedAt: publishedAt.date?.start || '',
  }

  return props
}
