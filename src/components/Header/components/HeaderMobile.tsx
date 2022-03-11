import {
  Flex,
  HStack,
  VStack,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react'
import { FiYoutube, FiLinkedin, FiGithub, FiInstagram, FiMenu } from 'react-icons/fi'

import { Logo } from './Logo'
import { ActiveLink } from './ActiveLink'
import { IconLink } from './IconLink'

export function HeaderMobile() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex as="header" mt={8} justify="space-between" align="center">
        <Logo />

        <Icon
          as={FiMenu}
          w={6}
          h={6}
          cursor="pointer"
          opacity="0.7"
          transition="all 0.2s"
          _hover={{ opacity: 1 }}
          onClick={onOpen}
        />
      </Flex>

      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent bg="gray.900" p={4}>
          <DrawerCloseButton size="lg" mt="6" />
          <DrawerBody h="100vh" display="flex" flexDir="column" alignItems="center" justifyContent="center">
            <VStack as="nav" spacing={4} mb={20}>
              <ActiveLink fontSize="2xl" onClick={onClose} href="/">Início</ActiveLink>
              <ActiveLink fontSize="2xl" onClick={onClose} href="/posts">Posts</ActiveLink>
              <ActiveLink fontSize="2xl" onClick={onClose} href="/projects">Projetos</ActiveLink>
              <ActiveLink fontSize="2xl" onClick={onClose} href="/videos">Vídeos</ActiveLink>
              <ActiveLink fontSize="2xl" onClick={onClose} href="/about">Sobre</ActiveLink>
            </VStack>

            <HStack spacing={8}>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
