import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'

import { Badge } from '../Badge'

interface CardInfoLargeProps {
  src: string
  title: string
  badges?: string[]
  description: string
}

export function CardInfoLarge({ src, title, badges, description }: CardInfoLargeProps) {
  return (
    <Stack maxW="800px" direction="row" spacing={8}>
      <Image w="300px" h="168px" borderRadius="lg" src={src} alt="project" />

      <Stack spacing={2.5}>
        <Heading as="h3" fontSize="3xl">{title}</Heading>

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
