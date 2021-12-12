import { GetStaticProps } from 'next'
import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'

import { Main } from '../components/Main'
import { CardTexts } from '../components/CardTexts'

import { notion } from '../services/notion'
import { ProjectsType } from '../services/notion/modules/projects/project.types'
import { config } from '../components/config'

interface ProjectsProps {
  projects: ProjectsType
}

export default function Projects({ projects }: ProjectsProps) {
  const { totalCount, data } = projects

  return (
    <Main>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Projetos
        </Heading>

        <Text textAlign="center">
          {totalCount} {totalCount > 1 ? ' Projetos' : ' Projeto'}
        </Text>
      </Stack>

      <SimpleGrid columns={[null, 1, 2]} spacing={8}>
        {data.map(repo => (
          <CardTexts
            key={repo.id}
            title={repo.name}
            description={repo.description}
            badges={repo.tags}
            href={repo.urlSite || repo.urlRepo}
          />
        ))}
      </SimpleGrid>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await notion.projects.list()

  return {
    props: {
      projects,
    },
    revalidate: config.revalidate,
  }
}
