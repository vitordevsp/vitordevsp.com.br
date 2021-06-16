import { GetStaticProps } from 'next'
import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'

import { Main } from '../components/Main'
import { CardTexts } from '../components/CardTexts'

import { getRepositoriesGitHub, RepositoriesProps } from '../services/github'
import { config } from '../components/config'

interface ProjectsProps {
  repositories: RepositoriesProps
}

export default function Projects({ repositories }: ProjectsProps) {
  return (
    <Main>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Projetos
        </Heading>

        <Text textAlign="center">
          {repositories.total}
          {repositories.total > 1 ? ' Projetos' : ' Projeto'}
        </Text>
      </Stack>

      <SimpleGrid columns={[null, 1, 2]} spacing={8}>
        {repositories.items.map(repo => (
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const repositories = await getRepositoriesGitHub(3)

  return {
    props: {
      repositories,
    },
    revalidate: config.revalidate,
  }
}
