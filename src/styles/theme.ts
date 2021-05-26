import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      }
    },
  },
  fonts: {
    body: '"Fira Sans", sans-serif',
    heading: '"Fira Sans", sans-serif',
  },
  colors: {
    custom: {
      'primary': '#7489F4',
      'secondary': '#FF0083',
    },
    gray: {
      '50': '#F8F8F8',
      '100': '#D7D7D7',
      '700': '#2D3B59',
      '800': '#212B41',
      '900': '#0E141B',
    },
  }
})
