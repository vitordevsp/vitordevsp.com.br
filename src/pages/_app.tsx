import { AppProps } from 'next/app'
import Head from 'next/head'
import { Box, ChakraProvider } from '@chakra-ui/react'

import { Header } from '../components/Header'

import { theme } from '../styles/theme'
import '../styles/scrollbar.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Vitor DevSP</title>
      </Head>

      <Box maxW="1168px" mx="auto" px={6}>
        <Header />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
