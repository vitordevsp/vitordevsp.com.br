import { VideoPropsType, VideoReqType, VideoStatusType } from '../types/video.types'

export const generateSlug = (string: string) => {
  const replace = string.replace('https://www.notion.so/', '')
  return replace
}

export const generateProperties = (dbVideo: VideoReqType): VideoPropsType => {
  const { idVideoYT: idYT, title, description, tags, playlist, status, publishedAt } = dbVideo.properties

  const idVideoYT = idYT.rich_text[0]?.plain_text || ''
  const urlVideo = `https://www.youtube.com/watch?v=${idVideoYT}`
  const thumbnail = `https://i.ytimg.com/vi/${idVideoYT}/hqdefault.jpg`

  const props: VideoPropsType = {
    idVideoYT,
    title: title.title[0]?.plain_text || '',
    description: description.rich_text[0]?.plain_text || '',
    tags: tags.multi_select?.map(s => s.name) || [],
    playlist: playlist.select?.name || null,
    status: (status.select?.name as VideoStatusType) || null,
    publishedAt: publishedAt.date?.start || '',
    urlVideo,
    thumbnail,
  }

  return props
}
