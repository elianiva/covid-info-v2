import { tw } from "twind"
import { useEffect, useState } from "react"
import { Country } from "../types"
import CountryList from "./CountryList"

interface GrowthBoxProps {
  apiData: Country[]
}

export default function GrowthBox({ apiData }: GrowthBoxProps) {
  const [countries, setCountries] = useState<Country[]>()

  useEffect(() => {
    setCountries(
      apiData.slice().sort((a, b) => (a.todayCases > b.todayCases ? -1 : 1))
    )
  }, [])

  return (
    <div
      className={tw`grid(& grid-col-1) col(start-4 end-5) row(start-3 end-6) bg-white p-4 rounded-md shadow-md h-full overflow-hidden`}
    >
      <span
        className={tw`col(start-1 end-2) text-lg font-bold nunito block mb-2`}
      >
        Today's Cases
      </span>
      <CountryList
        countries={countries as Country[]}
        type="todayCases"
        gridCol={[1, 2]}
      />
    </div>
  )
}
