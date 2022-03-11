import { GetStaticProps } from 'next'
import { Box, Stack } from '@chakra-ui/react'

import { Main } from '../components/Main'
import { CardTexts } from '../components/CardTexts'
import { TitleSection } from '../components/TitleSection'

import { contentService } from './api/notion/_resources/modules/contents/services/contentService'
import { ContentsDataType, ContentsTagsDataType } from './api/notion/_resources/modules/contents/types/content.types'

import { config } from '../components/config'

interface HomeProps {
  contents: ContentsDataType | null
  tags: ContentsTagsDataType | null
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
          {contents?.data?.map(content => (
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
  try {
    const contents = await contentService.list()
    const tags = await contentService.listTags()

    return {
      props: {
        contents,
        tags,
      },
      revalidate: config.revalidate,
    }
  } catch (e) {
    return {
      props: {
        contents: null,
        tags: null,
      },
      revalidate: 1,
    }
  }
}
