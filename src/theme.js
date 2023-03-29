import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    'column-bg': '#F0F4F8',
    'column-header-bg': '#0070f3',
    'subtle-text': '#FFFFFF',
    'black-text': '#1A1A1A',
    'card-bg': '#FFFFFF',
    'card-border': '#D8D8D8',
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'column-bg',
        color: 'black-text',
      },
    },
  },
  components: {
    Box: {
      baseStyle: {
        borderRadius: 'md',
      },
    },
    Flex: {
      baseStyle: {
        borderRadius: 'md',
      },
    },
  },
})

export default theme
