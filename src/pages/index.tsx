import { Box, SimpleGrid, Stack } from '@chakra-ui/react'

import { CardInfo } from '../components/CardInfo'
import { CardPost } from '../components/CardPost'
import { TitleSection } from '../components/TitleSection'

const srcImage = 'https://cdn.dribbble.com/users/690168/screenshots/6292240/shot-money-saving.png'

export default function Home() {
  return (
    <Stack as="main" my={20} spacing={20}>
      <Box as="section">
        <TitleSection
          href="/projetos"
          title="Últimos Projetos"
          subTitle="5 Projetos"
          mb={8}
        />

        <SimpleGrid columns={3} spacing={8}>
          <CardInfo
            src={srcImage}
            badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript', 'Typescript']}
            title="GitHub Explore"
            description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          />

          <CardInfo
            src={srcImage}
            badges={['ReactJS', 'NextJS']}
            title="GitHub Explore"
            description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          />

          <CardInfo
            src={srcImage}
            title="GitHub Explore"
            description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          />
        </SimpleGrid>
      </Box>

      <Box as="section">
        <TitleSection
          href="/videos"
          title="Últimos Vídeos"
          subTitle="10 Vídeos"
          mb={8}
        />

        <SimpleGrid columns={3} spacing={8}>
          <CardInfo
            src={srcImage}
            badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript']}
            title="GitHub Explore"
            description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          />

          <CardInfo
            src={srcImage}
            badges={['ReactJS', 'NextJS']}
            title="GitHub Explore"
            description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          />

          <CardInfo
            src={srcImage}
            badges={['ReactJS', 'NextJS', 'ChakraUI', 'Typescript']}
            title="GitHub Explore"
            description="Apenas uma pequena descrição de teste para fazer a prototipagem."
          />
        </SimpleGrid>
      </Box>

      <Box as="section">
        <TitleSection
          href="/posts"
          title="Últimos Posts"
          subTitle="15 Posts"
          mb={8}
        />

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
        </SimpleGrid>
      </Box>
    </Stack>
  )
}
