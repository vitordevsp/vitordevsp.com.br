export interface ContentType {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
  linkSocial?: string
  publishedAt: string
  dateDisplay: string
  type: 'video' | 'project' | 'post'
}