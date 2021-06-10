import { Flex, Avatar, Image, HStack } from '@chakra-ui/react'
import { FiYoutube, FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi'

import { ActiveLink } from './ActiveLink'
import { IconLink } from './IconLink'

export function Toolbar() {
  return (
    <Flex as="header" mt={8} justify="space-between">
      <HStack spacing={4}>
        <Avatar name="Vitor DevSP" src="/devsp-perfil.png" bg="black" />
        <Image src="/devsp-logo.svg" alt="devsp" h="20px" />
      </HStack>

      <HStack as="nav" spacing={8}>
        <ActiveLink href="/">Início</ActiveLink>
        <ActiveLink href="/videos">Vídeos</ActiveLink>
        <ActiveLink href="/projects">Projetos</ActiveLink>
        <ActiveLink href="/posts">Posts</ActiveLink>
        <ActiveLink href="/about">Sobre</ActiveLink>
      </HStack>

      <HStack spacing={6}>
        <IconLink
          href="https://www.youtube.com/channel/UCFIHeoKduKPsE2m1oSiK9Mg"
          as={FiYoutube}
          accentColor="red.500"
        />

        <IconLink
          href="https://www.linkedin.com/in/vitordevsp"
          as={FiLinkedin}
          accentColor="blue.600"
        />

        <IconLink
          href="https://www.github.com/vitordevsp"
          as={FiGithub}
          accentColor="gray.600"
        />

        <IconLink
          href="https://www.instagram.com/vitordevsp"
          as={FiInstagram}
          accentColor="red.400"
        />
      </HStack>
    </Flex>
  )
}
