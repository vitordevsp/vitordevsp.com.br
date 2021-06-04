import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { FiCalendar } from 'react-icons/fi'

import { Badge } from '../Badge'

interface CardPostProps {
  title: string
  date: string
  description: string
  badges?: string[]
}

export function CardPost({ title, date, description, badges }: CardPostProps) {
  return (
    <Stack bg="gray.800" p={6} borderRadius="lg" spacing={2.5}>
      <Heading as="h3" fontSize="3xl">{title}</Heading>

      <Stack my={3} align="center" color="gray.100" isInline>
        <Icon as={FiCalendar} color="gray.100" />
        <Text fontSize="sm" ml={2}>{date}</Text>
      </Stack>

      <Text fontSize="lg" color="gray.100">{description}</Text>

      {badges && (
        <Flex gridGap={2} wrap="wrap">
          {badges.map((badge, i) => (
            <Badge key={i} bg="gray.700">{badge}</Badge>
          ))}
        </Flex>
      )}
    </Stack>
  )
}
