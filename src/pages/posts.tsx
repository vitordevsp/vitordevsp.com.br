import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { CardPost } from '../components/CardPost'

export default function Posts() {
  return (
    <Stack as="main" my={20} spacing={20}>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Posts
        </Heading>

        <Text textAlign="center">7 Posts</Text>
      </Stack>

      <SimpleGrid columns={2} spacing={8}>
        <CardPost
          title="GitHub Explore"
          date="15 Mar 2021"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript', 'Typescript']}
        />

        <CardPost
          title="GitHub Explore"
          date="15 Mar 2021"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript', 'Typescript']}
        />

        <CardPost
          title="GitHub Explore"
          date="15 Mar 2021"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript', 'Typescript']}
        />

        <CardPost
          title="GitHub Explore"
          date="15 Mar 2021"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript', 'Typescript']}
        />

        <CardPost
          title="GitHub Explore"
          date="15 Mar 2021"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript', 'Typescript']}
        />

        <CardPost
          title="GitHub Explore"
          date="15 Mar 2021"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript', 'Typescript']}
        />

        <CardPost
          title="GitHub Explore"
          date="15 Mar 2021"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript', 'Typescript']}
        />
      </SimpleGrid>
    </Stack>
  )
}
