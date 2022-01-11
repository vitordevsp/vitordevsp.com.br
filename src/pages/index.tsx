import { GetStaticProps } from 'next'
import { Box, Stack } from '@chakra-ui/react'

import { Main } from '../components/Main'
import { CardTexts } from '../components/CardTexts'
import { TitleSection } from '../components/TitleSection'

import { notion } from '../services/notion'
import { ContentType } from '../services/notion/modules/contents/content.types'
import { config } from '../components/config'

interface HomeProps {
  contents: ContentType[]
  tags: string[]
}

export default function Home({ contents, tags }: HomeProps) {
  return (
    <Main>
      <Box id="section-videos" as="section">
        <TitleSection
          title="Publicações recentes"
          mb={8}
        />

        <Stack spacing="20px">
          {contents.map(content => (
            <CardTexts
              key={content.id}
              title={content.title}
              date={content.dateDisplay}
              informationText={content.type}
              description={content.description}
              badges={content.tags}
              href={content.link}
            />
          ))}
        </Stack>
      </Box>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const contents = await notion.contents.list(20)
  const tags = await notion.contents.listTags()

  return {
    props: {
      contents,
      tags,
    },
    revalidate: config.revalidate,
  }
}
