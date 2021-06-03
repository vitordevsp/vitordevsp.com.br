import { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'
import { Toolbar } from '../components/toolbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box maxW="1168px" mx="auto" px={6}>
        <Toolbar />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
