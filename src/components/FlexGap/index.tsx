import { ReactNode } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

interface FlexGapProps extends FlexProps {
  children: ReactNode
  gap?: string
}

export function FlexGap({ children, gap = '8px', ...rest }: FlexGapProps) {
  return (
    <Flex style={{ gap }} wrap="wrap" {...rest}>
      {children}
    </Flex>
  )
}
