import {
  Heading,
  PageContainer,
  Paragraph,
  VideoCard,
} from "@/components"
import { videoService } from "@/app/api/notion/_resources/modules/videos/services/videoService"
import "./style.scss"

export default async function VideosPage() {
  const videos = await videoService.list()
  const totalCount = videos?.totalCount || 0

  return (
    <PageContainer className="videos-page">
      <section className="videos-page__header">
        <div>
          <Heading as="h1">
            Todos os Vídeos
          </Heading>

          <Paragraph>
            {totalCount} {totalCount > 1 ? " Vídeos" : " Vídeo"}
          </Paragraph>
        </div>

        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.
        </Paragraph>
      </section>

      <section className="videos-page__content">
        {videos?.data.map(video => (
          <VideoCard
            key={video.id}
            title={video.title}
            date={video.dateDisplay}
            tags={video.tags}
            description={video.description}
            linkYoutube={video.urlVideo}
          // linkPost={video.}
          />
        ))}
      </section>
    </PageContainer>
  )
}
