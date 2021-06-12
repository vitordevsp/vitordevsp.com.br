import { AspectRatio, Box, Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react'
import { FiExternalLink } from 'react-icons/fi'

import { Badge } from '../Badge'

interface CardInfoProps {
  src: string
  badges?: string[]
  title: string
  description: string
  href?: string
}

export function CardInfo({ src, badges, title, description, href }: CardInfoProps) {
  return (
    <Stack
      as="a"
      maxWidth="380px"
      spacing={2.5}
      href={href || undefined}
      target="_blank"
      role={href ? 'group' : undefined}
    >
      <AspectRatio borderRadius="lg" ratio={16 / 9}>
        <Box w="fit-content" borderRadius="lg" position="relative" overflow="hidden">
          <Image src={src} alt="project" />

          {href && (
            <Flex
              w="100%"
              h="100%"
              bgColor="rgba(0, 0, 0, 0.7)"
              position="absolute"
              top="0"
              align="center"
              justify="center"
              opacity="0"
              transition="opacity 0.3s"
              _groupHover={{ opacity: '1' }}
            >
              <Icon as={FiExternalLink} w={8} h={8} />
            </Flex>
          )}
        </Box>
      </AspectRatio>

      {badges && (
        <Flex gridGap={2} wrap="wrap">
          {badges.map((badge, i) => (
            <Badge key={i}>{badge}</Badge>
          ))}
        </Flex>
      )}

      <Stack>
        <Heading
          as="h3"
          fontSize="3xl"
          transition="color 0.4s"
          _groupHover={{ color: 'custom.secondary' }}
        >
          {title}
        </Heading>

        <Text color="gray.100">{description}</Text>
      </Stack>
    </Stack>
  )
}
