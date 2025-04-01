import { postService } from '../../posts/services/postService'
import { projectService } from '../../projects/services/projectService'
import { videoService } from '../../videos/services/videoService'

import { PostType } from '../../posts/types/post.types'
import { ProjectType } from '../../projects/types/project.types'
import { VideoType } from '../../videos/types/video.types'
import { ContentType } from '../types/content.types'

import { parseStringToDate } from '../../../../../../../utils/DateUtil'

export const transform = {
  videos: (videos: VideoType[]): ContentType[] => {
    return videos.map(video => {
      const { id, title, description, urlVideo, tags, publishedAt, dateDisplay } = video

      return {
        id,
        title,
        description,
        tags,
        link: urlVideo,
        publishedAt,
        dateDisplay,
        type: 'video',
      }
    })
  },

  projects: (projects: ProjectType[]): ContentType[] => {
    return projects.map(project => {
      const { id, name, description, urlSite, urlRepo, tags, publishedAt, dateDisplay } = project

      return {
        id,
        title: name,
        description,
        tags,
        link: urlSite,
        linkSocial: urlRepo,
        publishedAt,
        dateDisplay,
        type: 'project',
      }
    })
  },

  posts: (posts: PostType[]): ContentType[] => {
    return posts.map(post => {
      const { id, title, description, slug, tags, publishedAt, dateDisplay } = post

      return {
        id,
        title,
        description,
        tags,
        link: `post/${slug}`,
        publishedAt,
        dateDisplay,
        type: 'post',
      }
    })
  },
}

export async function getContents(pageSize?: number): Promise<ContentType[]> {
  const dbVideos = await videoService.list(pageSize)
  const dbProjects = await projectService.list(pageSize)
  const dbPosts = await postService.list(pageSize)

  const videos = transform.videos(dbVideos.data)
  const projects = transform.projects(dbProjects.data)
  const posts = transform.posts(dbPosts.data)

  const contents = [...videos, ...projects, ...posts]

  const contentsOrdened = contents.sort((a, b) => {
    const dateA: any = parseStringToDate(a.publishedAt)
    const dateB: any = parseStringToDate(b.publishedAt)

    return dateB - dateA
  })

  return contentsOrdened
}
