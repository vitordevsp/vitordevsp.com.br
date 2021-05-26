import { Flex, Heading } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex h='100vh' align="center" justify="center" direction="column">
      <Heading as='h1' size="4xl" color='custom.primary'>Hello World</Heading>
      <Heading as='h2' size="xl" color='custom.secondary'>Initial Configuration</Heading>
    </Flex>
  )
}
