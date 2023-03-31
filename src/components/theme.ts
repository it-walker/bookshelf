import { Theme } from '@aws-amplify/ui-react'

export const theme: Theme = {
  name: 'button-theme',
  tokens: {
    colors: {
      border: {
        // this will affect the default button's border color
        primary: { value: 'black' },
      },
    },
    components: {
      button: {
        // this will affect the font weight of all button variants
        fontWeight: { value: '{fontWeights.extrabold}' },
        // style the primary variation
        primary: {
          backgroundColor: { value: '{colors.blue.60}' },
          _hover: {
            backgroundColor: { value: '{colors.blue.80}' },
          },
          _focus: {
            backgroundColor: { value: '{colors.blue.80}' },
          },
          _active: {
            backgroundColor: { value: '{colors.blue.90}' },
          },
        },
      },
      heading: {
        color: { value: '{font.primary}' },
      },
    },
  },
}

export default theme
