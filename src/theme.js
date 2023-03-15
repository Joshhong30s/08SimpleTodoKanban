import { extendTheme, theme } from '@chakra-ui/react'

const colors = {
  'main-bg': '#F596AA',

  'black-text': '#FFFFFF',
  'subtle-text': '#ffffff',

  'column-bg': '#EE718C',
  'column-header-bg': '#D54A68',

  'card-bg': '#FABECB',
  'card-border': '#FABECB',
}

const fonts = {
  heading: 'Zen Maru Gothic',
  body: 'Zen Maru Gothic',
}

export default extendTheme({
  ...theme,
  colors,
  fonts,
})
