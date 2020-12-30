import { setup } from "twind"

setup({
  theme: {
    extend: {
    },
  },
  plugins: {
    'main-grid': {
      'grid-template-columns': 'repeat(4, 1fr) 1.25fr'
    }
  }
})
