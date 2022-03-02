import { GetStaticProps } from 'next'
import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'

import { Main } from '../components/Main'
import { CardTexts } from '../components/CardTexts'

import { api } from '../services/api'
import { ProjectsDataType } from './api/notion/_resources/modules/projects/types/project.types'

import { config } from '../components/config'

interface ProjectsProps {
  projects: ProjectsDataType | null
}

export default function Projects({ projects }: ProjectsProps) {
  const totalCount = projects?.totalCount || 0

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
        {projects?.data.map(repo => (
          <CardTexts
            key={repo.id}
            title={repo.name}
            date={repo.dateDisplay}
            badges={repo.tags}
            description={repo.description}
            href={repo.urlSite || repo.urlRepo}
          />
        ))}
      </SimpleGrid>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: projects } = await api.get<ProjectsDataType>('/notion/projects')

    return {
      props: {
        projects,
      },
      revalidate: config.revalidate,
    }
  } catch (error) {
    console.log('error: ', error)
    return {
      props: {
        projects: null,
      },
      revalidate: 1,
    }
  }
}
