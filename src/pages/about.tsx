import { Heading, VStack, Stack, Text } from '@chakra-ui/react'
import { SectionBadgesTechs } from '../components/sectionBadgesTechs'

export default function About() {
  return (
    <Stack as="main" maxW="800px" mx="auto" my={20} spacing={20}>
      <VStack as="section" spacing={6}>
        <Heading size="2xl" color="custom.primary">
          Sobre
        </Heading>

        <Stack spacing={4}>
          <Text>
            São Paulo, SP, Brasil
          </Text>

          <Text>
            Formado no Ensino médio integrado com Técnico em informática, minha história com a
            programação se inicia em 2014, comecei aprendendo lógica de programação e a criar
            algoritmos com o VisualG, depois passei por desenvolvimento de software com Java e C#.
            No último ano ao iniciar o meu TCC, decidi me desafiar a criar algo diferente do que
            estava na grade disciplinar, passei a estudar Android por conta própria e desenvolvi
            um App chamado mochila do aluno, que ajudaria o aluno a organizar sua vida acadêmica.
          </Text>

          <Text>
            Ao sair do Ensino médio, decidi que trabalharia por conta própria, pouco tempo depois
            comecei a trabalhar com Desenvolvimento Web e a fazer Freelas. Com isso,
            passei a desenvolver o layout dos projetos que iria trabalhar no Figma,
            e me apaixonei também pela área de UI Design.
          </Text>

          <Text>
            Passei o ano de 2020 e parte de 2021 trabalhando na empresa do Igor Oliveira,
            do canal Programador BR, que conta com mais de 130k de inscritos no YouTube.
            Fui o responsável pelo suporte do curso de desenvolvimento web full stack por certa de
            1 ano e isso me ajudou muito a me desenvolver.
          </Text>

          <Text>
            Nesse período lidei com diversas perguntas e e-mails com duvidas dos alunos sobre as
            tecnologias da web e pude evoluir muito me aprofundando para responder sempre da melhor
            maneira possível, me tornei um especialista em achar erro no código de outras pessoas.
          </Text>

          <Text>
            Sempre busco me aperfeiçoar, e estudo constantemente para isso,
            atualmente estou me aventurando em criar conteúdo, para o YouTube e o Medium.
            Acredito que a melhor maneira de aprender é ensinando, estou tentando transmitir um pouco
            do meu conhecimento enquanto vou lapidando ele.
          </Text>

          <Text>
            Sou extremamente apaixonado por Linux e projetos Open Source.
          </Text>
        </Stack>
      </VStack>

      <VStack as="section" spacing={10}>
        <Heading size="2xl" color="custom.primary">
          Habilidades
        </Heading>

        <SectionBadgesTechs
          title="Front-end"
          arrayBadges={[
            {
              title: 'HTML',
              pathIcon: '/technologies/html.svg',
            },
            {
              title: 'CSS',
              pathIcon: '/technologies/css.svg',
            },
            {
              title: 'Javascript',
              pathIcon: '/technologies/javascript.svg',
            },
            {
              title: 'Typescript',
              pathIcon: '/technologies/typescript.svg',
            },
            {
              title: 'ReactJS',
              pathIcon: '/technologies/react.svg',
            },
            {
              title: 'NextJS',
              pathIcon: '/technologies/next.svg',
            },
            {
              title: 'ChakraUI',
              pathIcon: '/technologies/chakra-ui.svg',
            },
            {
              title: 'Styled Components',
              pathIcon: '/technologies/styled-components.png',
            },
            {
              title: 'SASS',
              pathIcon: '/technologies/sass.svg',
            },
            {
              title: 'JAM Stack',
              pathIcon: '/technologies/jam-stack.svg',
            },
            {
              title: 'React Query',
              pathIcon: '/technologies/react-query.svg',
            },
          ]}
        />

        <SectionBadgesTechs
          title="Back-end"
          arrayBadges={[
            {
              title: 'NodeJS',
              pathIcon: '/technologies/node.svg',
            },
            {
              title: 'Javascript',
              pathIcon: '/technologies/javascript.svg',
            },
            {
              title: 'Typescript',
              pathIcon: '/technologies/typescript.svg',
            },
            {
              title: 'Express',
            },
            {
              title: 'MongoDB',
              pathIcon: '/technologies/mongo-db.svg',
            },
          ]}
        />

        <SectionBadgesTechs
          title="Outras"
          arrayBadges={[
            {
              title: 'Linux',
              pathIcon: '/technologies/linux.svg',
            },
            {
              title: 'Git',
              pathIcon: '/technologies/git.svg',
            },
            {
              title: 'Figma',
              pathIcon: '/technologies/figma.svg',
            },
            {
              title: 'VS Code',
              pathIcon: '/technologies/vscode.svg',
            },
          ]}
        />
      </VStack>
    </Stack>
  )
}
