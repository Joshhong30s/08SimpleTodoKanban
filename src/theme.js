import { extendTheme, theme } from '@chakra-ui/react'

const colors = {
  'main-bg': '#FFC9C3',

  'black-text': '#210401',
  'subtle-text': '#ffffff',

  'column-bg': '#DA8C84',
  'column-header-bg': '#904840',

  'card-bg': '#FFC9C3',
  'card-border': '#904840',
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
