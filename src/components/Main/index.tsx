import { ReactNode } from 'react'
import { Stack } from '@chakra-ui/react'

interface MainProps {
  children: ReactNode
}

export function Main({ children }: MainProps) {
  return (
    <Stack as="main" my={[12, 20]} spacing={[12, 20]}>
      {children}
    </Stack>
  )
}
