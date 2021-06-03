import { Box, Text } from '@chakra-ui/react'

interface BadgeProps {
  children: string
}

export function Badge({ children }: BadgeProps) {
  return (
    <Box w="fit-content" bg="gray.800" px="10px" py="2px" borderRadius="full">
      <Text as="span" fontSize="sm">
        {children}
      </Text>
    </Box>
  )
}
