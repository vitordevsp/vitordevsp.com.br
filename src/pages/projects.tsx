import { Heading, Stack, Text } from '@chakra-ui/react'
import { CardInfoLarge } from '../components/CardInfoLarge'

const srcImage = 'https://cdn.dribbble.com/users/690168/screenshots/6292240/shot-money-saving.png'

export default function Projects() {
  return (
    <Stack as="main" my={20} spacing={20}>
      <Stack>
        <Heading as="h1" color="custom.primary" textAlign="center" size="2xl">
          Todos os Projetos
        </Heading>

        <Text textAlign="center">5 Projetos</Text>
      </Stack>

      <Stack align="center" spacing={20}>
        <CardInfoLarge
          src={srcImage}
          badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript', 'Typescript']}
          title="GitHub Explore"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
        />

        <CardInfoLarge
          src={srcImage}
          badges={['ReactJS', 'NextJS']}
          title="GitHub Explore"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
        />

        <CardInfoLarge
          src={srcImage}
          title="GitHub Explore"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
        />

        <CardInfoLarge
          src={srcImage}
          badges={['ReactJS', 'NextJS']}
          title="GitHub Explore"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
        />

        <CardInfoLarge
          src={srcImage}
          title="GitHub Explore"
          description="Apenas uma pequena descrição de teste para fazer a prototipagem."
        />
      </Stack>
    </Stack>
  )
}
