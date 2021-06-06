import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import { Link as LinkChakra } from '@chakra-ui/react'

interface ActiveLinkProps extends LinkProps {
  children: string
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter()

  const isActiveLink = asPath === rest.href

  return (
    <Link {...rest} passHref>
      <LinkChakra
        fontSize="lg"
        opacity={isActiveLink ? 1 : 0.7}
        color={isActiveLink ? 'custom.primary' : 'gray.50'}
        fontWeight={isActiveLink ? 'semibold' : 'normal'}
        _hover={{ opacity: 1 }}
      >
        {children}
      </LinkChakra>
    </Link>
  )
}
