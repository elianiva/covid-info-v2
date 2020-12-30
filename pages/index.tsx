import { GetStaticProps } from "next"
import { useEffect } from "react"
import { tw } from "twind"
import { fetchData } from "../utils/fetchData"
import { Countries } from "../types/countries"

export default function Home({ data }: { [key: string]: any }): JSX.Element {
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className={tw`grid main-grid grid-rows-4 gap-4 h-screen p-4`}></div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response: Countries = await fetchData<Countries>("countries")

  return {
    props: {
      data: response,
    },
  }
}
