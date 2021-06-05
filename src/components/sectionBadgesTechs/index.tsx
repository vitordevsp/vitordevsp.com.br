import { Heading, VStack, Flex } from '@chakra-ui/react'
import { BadgeTech } from '../BadgeTech'

interface SectionBadgesTechsProps {
  title: string
  arrayBadges: {
    pathIcon?: string
    title: string
  }[]
}

export function SectionBadgesTechs({ title, arrayBadges }: SectionBadgesTechsProps) {
  return (
    <VStack spacing={3}>
      <Heading as="h4" size="lg">{title}</Heading>

      <Flex justify="center" gridGap={4} wrap="wrap">
        {arrayBadges.map(({ title, pathIcon }) => (
          <BadgeTech
            key={title}
            title={title}
            pathIcon={pathIcon}
          />
        ))}
      </Flex>
    </VStack>
  )
}
