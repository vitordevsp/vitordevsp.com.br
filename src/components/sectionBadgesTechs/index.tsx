import { Heading, VStack } from '@chakra-ui/react'

import { FlexGap } from '../FlexGap'
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
    <VStack spacing={5}>
      <Heading as="h4" size="lg">{title}</Heading>

      <FlexGap justify="center" gap="16px">
        {arrayBadges.map(({ title, pathIcon }) => (
          <BadgeTech
            key={title}
            title={title}
            pathIcon={pathIcon}
          />
        ))}
      </FlexGap>
    </VStack>
  )
}
