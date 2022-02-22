import { IconType } from 'react-icons'
import { Icon, Link } from '@chakra-ui/react'

interface IconLinkProps {
  href: string
  as: IconType
  accentColor: string
}

export function IconLink({ href, as, accentColor }: IconLinkProps) {
  return (
    <Link href={href} isExternal>
      <Icon
        as={as}
        w={6}
        h={6}
        opacity="0.7"
        transition="all 0.2s"
        _hover={{ opacity: 1, color: accentColor }}
      />
    </Link>
  )
}
