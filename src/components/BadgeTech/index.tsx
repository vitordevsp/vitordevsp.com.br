import { HStack, Image, Text } from '@chakra-ui/react'

interface BadgeTechProps {
  pathIcon?: string
  title: string
}

export function BadgeTech({ pathIcon, title }: BadgeTechProps) {
  return (
    <HStack
      w="fit-content"
      bg="gray.700"
      px={4}
      py={2}
      borderRadius="full"
    >
      {pathIcon && <Image src={pathIcon} alt="iconTech" />}

      <Text as="span" fontSize="md" fontWeight="semibold" color="gray.100">
        {title}
      </Text>
    </HStack>
  )
}
