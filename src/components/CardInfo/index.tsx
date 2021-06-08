import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'

import { Badge } from '../Badge'

interface CardInfoProps {
  src: string
  badges?: string[]
  title: string
  description: string
}

export function CardInfo({ src, badges, title, description }: CardInfoProps) {
  return (
    <Stack spacing={2.5}>
      <Image w="300px" h="168px" borderRadius="lg" src={src} alt="project" />

      {badges && (
        <Flex gridGap={2} wrap="wrap">
          {badges.map((badge, i) => (
            <Badge key={i}>{badge}</Badge>
          ))}
        </Flex>
      )}

      <Stack>
        <Heading as="h3" fontSize="3xl">{title}</Heading>
        <Text color="gray.100">{description}</Text>
      </Stack>
    </Stack>
  )
}
