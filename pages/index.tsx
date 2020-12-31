import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { tw } from "twind"
import { fetchData } from "../utils/fetchData"
import { Country, CountryGeoJSON } from "../types"
import MapBox from "../components/MapBox"
import ChartBox from "../components/ChartBox"
import MapData from "../utils/mapData"
import * as countryData from "../data/countries.json"

export default function Home({
  apiData,
}: {
  apiData: Country[]
}): JSX.Element {
  const [mapData, setMapData] = useState<CountryGeoJSON | null>(null)

  useEffect(() => {
    const mapdata = new MapData(countryData, apiData)
    setMapData(mapdata.getGeoJSON)
  }, [])

  return (
    <div className={tw`grid main-grid grid-rows-4 gap-4 min-h-screen p-4`}>
      <ChartBox className="col-start-1 col-end-2" />
      <ChartBox className="col-start-2 col-end-3" />
      <ChartBox className="col-start-3 col-end-4" />
      <ChartBox className="col-start-4 col-end-5" />
      <MapBox mapData={mapData} apiData={apiData} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response: Country[] = await fetchData<Country[]>("countries")

  return {
    props: {
      apiData: response,
    },
  }
}
