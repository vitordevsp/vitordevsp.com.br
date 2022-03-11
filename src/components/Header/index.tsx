import { useBreakpointValue } from '@chakra-ui/react'

import { HeaderMobile } from './components/HeaderMobile'
import { HeaderDesktop } from './components/HeaderDesktop'

export function Header() {
  const isHeaderMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (isHeaderMobile) {
    return <HeaderMobile />
  }

  return <HeaderDesktop />
}
