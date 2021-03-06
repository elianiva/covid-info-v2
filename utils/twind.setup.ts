import { setup } from "twind"

setup({
  plugins: {
    "grid-main": {
      "grid-template-columns": "repeat(4, 1fr)",
      "grid-template-rows": "1.25fr repeat(4, 1fr)",
    },
    "gauge-grid": {
      "grid-template-columns": "1fr 2fr",
    },
    "grid-map": {
      "grid-template-columns": "2fr 1fr",
      "grid-template-rows": "2.5rem 1fr 1fr 1fr",
      gap: "1rem",
    },
    nunito: {
      "font-family": "'Nunito', sans-serif",
    },
  },
})
