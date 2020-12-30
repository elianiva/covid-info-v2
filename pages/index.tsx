import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { tw } from "twind"
import { fetchData } from "../utils/fetchData"
import { Countries } from "../types/countries"
import { CountryGeoJSON } from "../types/geojsonData"
import GlobalMap from "../components/GlobalMap"
import ChartBox from "../components/ChartBox"
import MapData from "../utils/mapData"
import * as countryData from "../data/countries.json"

export default function Home({ data }: { data: Countries[] }): JSX.Element {
  const [mapData, setMapData] = useState<CountryGeoJSON | null>(null)

  useEffect(() => {
    const mapdata = new MapData(countryData, data)
    setMapData(mapdata.getResult)
  }, [])

  return (
    <div className={tw`grid main-grid grid-rows-4 gap-4 min-h-screen p-4`}>
      <ChartBox className="col-start-1 col-end-2 row-start-1 row-end-2" />
      <ChartBox className="col-start-2 col-end-3 row-start-1 row-end-2" />
      <ChartBox className="col-start-3 col-end-4 row-start-1 row-end-2" />
      <ChartBox className="col-start-4 col-end-5 row-start-1 row-end-2" />
      <GlobalMap mapData={mapData} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response: Countries[] = await fetchData<Countries[]>("countries")

  return {
    props: {
      data: response,
    },
  }
}
