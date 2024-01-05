import {
  Heading,
  PageContainer,
  Paragraph,
  VideoCard,
} from "@/components"
import "./style.scss"

export default function VideosPage() {
  return (
    <PageContainer className="videos-page">
      <section className="videos-page__header">
        <div>
          <Heading as="h1">
            Projetos autorais
          </Heading>

          <Paragraph>
            2 Projetos
          </Paragraph>
        </div>

        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.
        </Paragraph>
      </section>

      <section className="videos-page__content">
        <VideoCard
          title="My Finances"
          date="30 de junho de 2021"
          tags={["ReactJS", "NextJS", "NodeJS", "MongoDB"]}
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          linkYoutube="https://www.my-finances.app"
          linkPost="https://www.my-finances.app"
        />

        <VideoCard
          title="My Finances"
          date="30 de junho de 2021"
          tags={["ReactJS", "NextJS", "NodeJS", "MongoDB"]}
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          linkYoutube="https://www.my-finances.app"
          linkPost="https://www.my-finances.app"
        />
      </section>
    </PageContainer>
  )
}
