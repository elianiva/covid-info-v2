import { useEffect, useState } from "react"
import { CountryGeoJSON, Country } from "../types"
import { tw } from "twind"
import "leaflet/dist/leaflet.css"
import LeafletMap from "./LeafletMap"
import CountryList from "./CountryList"

interface MapBoxProps {
  mapData: CountryGeoJSON | null
  apiData: Country[] | null
}

export default function MapBox({ mapData, apiData }: MapBoxProps) {
  const [countries, setCountries] = useState<Country[] | null>()

  useEffect(() => {
    setCountries(apiData?.sort((a, b) => (a.cases > b.cases ? -1 : 1)))
  }, [])

  useEffect(() => {
    console.log(countries)
  }, [countries])
  return (
    <div
      className={tw`grid(& map) items-center col(start-1 end-5) row(start-2 end-6) bg-white rounded-md shadow-md p-4 max-h-80vh`}
    >
      <div className={tw`flex col(start-1 end-2) row(start-1 end-2)`}>
        <span className={tw`text-lg nunito font-semibold flex-1`}>
          COVID-19 Affected Areas
        </span>
        <div className={tw`flex items-center gap-3`}>
          {[
            ["2.5M+", "red-800"],
            ["1M+", "red-600"],
            ["500K+", "red-300"],
            ["250K+", "red-200"],
            ["50K+", "red-100"],
            ["5K+", "white"],
          ].map((label: string[], idx: number) => (
            <div className={tw`flex gap-1 items-center`} key={idx}>
              <div
                className={tw`w-4 h-4 bg-${label[1]} rounded-sm ${
                  label[1] === "white" && "border(& gray-300)"
                }`}
              />
              <span className={tw`nunito text-red-800 text-sm`}>
                {label[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <CountryList countries={countries as Country[]} />
      <div
        className={tw`col(start-1 end-2) row(start-2 end-5) rounded-md h-full overflow-hidden`}
      >
        <LeafletMap mapData={mapData} />
      </div>
    </div>
  )
}
