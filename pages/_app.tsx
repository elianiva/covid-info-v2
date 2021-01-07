import type { AppProps } from "next/app"
import { CountryProvider } from "../context/selectedCountry"
import "../assets/styles/globals.css"
import "../utils/twind.setup"

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <CountryProvider>
      <Component {...pageProps} />
    </CountryProvider>
  )
}
