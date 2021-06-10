import { Box, Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react'
import { FiExternalLink } from 'react-icons/fi'

import { Badge } from '../Badge'

interface CardInfoLargeProps {
  src: string
  title: string
  badges?: string[]
  description: string
  href?: string
}

export function CardInfoLarge({ src, title, badges, description, href }: CardInfoLargeProps) {
  return (
    <Stack
      as="a"
      maxW="800px"
      direction="row"
      spacing={3}
      href={href || undefined}
      target="_blank"
      role={href ? 'group' : undefined}
    >
      <Box minW="300px" h="170px" borderRadius="lg" position="relative" overflow="hidden">
        <Image minW="100%" h="100%" src={src} alt="project" />

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

      <Stack spacing={2.5}>
        <Heading
          as="h3"
          fontSize="3xl"
          transition="color 0.4s"
          _groupHover={{ color: 'custom.secondary' }}
        >
          {title}
        </Heading>

        {badges && (
          <Flex gridGap={2} wrap="wrap">
            {badges.map((badge, i) => (
              <Badge key={i}>{badge}</Badge>
            ))}
          </Flex>
        )}

        <Text fontSize="lg" color="gray.100">{description}</Text>
      </Stack>
    </Stack>
  )
}
