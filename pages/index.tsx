import Head from "next/head"
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"
import { useEffect, useState, useContext } from "react"
import { tw } from "twind"
import { MapData, fetchData } from "../utils"
import { Country, CountryGeoJSON } from "../types"
import MapBox from "../components/MapBox"
import GrowthBox from "../components/GrowthBox"
import { SelectedContext } from "../context/selectedCountry"
import * as countryData from "../assets/data/countries.json"

const ChartBox = dynamic(() => import("../components/ChartBox"), { ssr: false })
const RatioBox = dynamic(() => import("../components/RatioBox"), { ssr: false })

type arrOfObject = { [key: string]: number }[]

interface HomeProps {
  countries: Country[]
  globalHistory: {
    cases: arrOfObject
    deaths: arrOfObject
    recovered: arrOfObject
  }
  globalData: Country
}

export default function Home({
  countries,
  globalHistory,
  globalData,
}: HomeProps) {
  const [mapData, setMapData] = useState<CountryGeoJSON | null>(null)
  const selected = useContext(SelectedContext)

  useEffect(() => {
    const mapdata = new MapData(countryData, countries)
    selected?.setValue({
      hist: globalHistory,
      country: globalData,
    })
    setMapData(mapdata.getGeoJSON)
  }, [])

  return (
    <>
      <Head>
        <title>Covid Info v2</title>
      </Head>
      <div className={tw`grid(& main) gap-4 min-h-screen max-h-screen p-4`}>
        <ChartBox
          className="col-start-1 col-end-2"
          data={selected?.value.hist?.cases as arrOfObject}
          label="Total Cases"
        />
        <ChartBox
          className="col-start-2 col-end-3"
          data={selected?.value.hist?.recovered as arrOfObject}
          label="Total Recovered"
        />
        <ChartBox
          className="col-start-3 col-end-4"
          data={selected?.value.hist?.deaths as arrOfObject}
          label="Total Deaths"
        />
        <RatioBox data={selected?.value.country as Country} />
        <MapBox mapData={mapData} apiData={countries} />
        <GrowthBox apiData={countries} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const countries: Country[] = await fetchData<Country[]>(
    "countries?sort=cases"
  )
  const globalHistory: arrOfObject = await fetchData<arrOfObject>(
    "historical/all?lastdays=10"
  )
  const globalData: Country[] = await fetchData<Country[]>("all")

  return {
    props: {
      countries,
      globalHistory,
      globalData,
    },
  }
}
