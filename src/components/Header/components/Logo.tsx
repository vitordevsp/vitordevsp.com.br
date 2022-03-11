import NextLink from 'next/link'
import { HStack, Avatar, Image } from '@chakra-ui/react'

export function Logo() {
  return (
    <NextLink href="/" passHref>
      <HStack as="a" spacing={4}>
        <Avatar name="Vitor DevSP" src="/devsp-perfil.png" bg="black" />
        <Image src="/devsp-logo.svg" alt="devsp" h="20px" />
      </HStack>
    </NextLink>
  )
}
