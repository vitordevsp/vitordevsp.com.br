import { Box, Text, BoxProps } from '@chakra-ui/react'

interface BadgeProps extends BoxProps {
  children: string
}

export function Badge({ children, ...props }: BadgeProps) {
  return (
    <Box
      w="fit-content"
      bg="gray.800"
      px="10px"
      py="2px"
      borderRadius="full"
      {...props}
    >
      <Text as="span" fontSize="sm" color="gray.100">
        {children}
      </Text>
    </Box>
  )
}
