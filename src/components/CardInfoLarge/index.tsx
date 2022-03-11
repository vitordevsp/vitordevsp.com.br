import { AspectRatio, Box, Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react'
import { FiCalendar, FiExternalLink } from 'react-icons/fi'

import { FlexGap } from '../FlexGap'
import { Badge } from '../Badge'

interface CardInfoLargeProps {
  src: string
  title: string
  date?: string
  badges?: string[]
  description: string
  href?: string
}

export function CardInfoLarge({ src, title, date, badges, description, href }: CardInfoLargeProps) {
  return (
    <Stack
      as="a"
      maxW={['380px', '380px', '800px']}
      direction={['column', 'column', 'row']}
      spacing={3}
      href={href || undefined}
      target="_blank"
      role={href ? 'group' : undefined}
    >
      <AspectRatio minW={['270px', '360px']} h="fit-content" ratio={16 / 9} >
        <Box h="fit-content" borderRadius="lg" position="relative" overflow="hidden">
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

      <Stack spacing={2.5}>
        <Heading
          as="h3"
          fontSize="3xl"
          transition="color 0.4s"
          _groupHover={{ color: 'custom.secondary' }}
        >
          {title}
        </Heading>

        {date && (
          <Stack my={3} align="center" color="gray.100" isInline>
            <Icon as={FiCalendar} color="gray.100" />
            <Text fontSize="sm" ml={2}>{date}</Text>
          </Stack>
        )}

        {badges && (
          <FlexGap>
            {badges.map((badge, i) => (
              <Badge key={i}>{badge}</Badge>
            ))}
          </FlexGap>
        )}

        <Text fontSize="lg" color="gray.100">{description}</Text>
      </Stack>
    </Stack>
  )
}
