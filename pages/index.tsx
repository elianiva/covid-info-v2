import Head from "next/head"
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import { tw } from "twind"
import { MapData, fetchData } from "../utils"
import { Country, CountryGeoJSON } from "../types"
import MapBox from "../components/MapBox"
import ChartBox from "../components/ChartBox"
import * as countryData from "../assets/data/countries.json"

interface HomeProps {
  apiData: Country[]
}

export default function Home({ apiData }: HomeProps): JSX.Element {
  const [mapData, setMapData] = useState<CountryGeoJSON | null>(null)

  useEffect(() => {
    const mapdata = new MapData(countryData, apiData)
    setMapData(mapdata.getGeoJSON)
  }, [])

  return (
    <>
      <Head>
        <title>Covid Info</title>
      </Head>
      <div className={tw`grid main-grid grid-rows-4 gap-4 min-h-screen p-4`}>
        <ChartBox className="col-start-1 col-end-2" />
        <ChartBox className="col-start-2 col-end-3" />
        <ChartBox className="col-start-3 col-end-4" />
        <ChartBox className="col-start-4 col-end-5" />
        <MapBox mapData={mapData} apiData={apiData} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response: Country[] = await fetchData<Country[]>("countries")

  return {
    props: {
      apiData: response,
    },
  }
}
