import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { FiCalendar } from 'react-icons/fi'

import { Badge } from '../Badge'

interface CardTextsProps {
  title: string
  date?: string
  description: string
  badges?: string[]
  href?: string
}

export function CardTexts({ title, date, description, badges, href }: CardTextsProps) {
  return (
    <Stack
      as="a"
      bg="gray.800"
      p={6}
      borderRadius="lg"
      spacing={2.5}
      href={href || undefined}
      target="_blank"
      role={href ? 'group' : undefined}
    >
      <Heading
        as="h3"
        fontSize="3xl"
        transition="color 0.4s"
        _groupHover={{ color: 'custom.secondary', textDecoration: 'underline' }}
      >
        {title}
      </Heading>

      {date && (
        <Stack my={3} align="center" color="gray.100" isInline>
          <Icon as={FiCalendar} color="gray.100" />
          <Text fontSize="sm" ml={2}>{date}</Text>
        </Stack>
      )}

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
