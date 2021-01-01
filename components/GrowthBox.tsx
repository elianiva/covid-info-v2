import { tw } from "twind"
import { useEffect, useState } from "react"
import { Country } from "../types"
import CountryList from "./CountryList"

interface GrowthBoxProps {
  apiData: Country[]
}

export default function GrowthBox({ apiData }: GrowthBoxProps) {
  const [countries, setCountries] = useState<Country[] | null>()

  useEffect(() => {
    setCountries(
      apiData?.sort((a, b) => (a.todayCases > b.todayCases ? -1 : 1))
    )
  }, [])

  return (
    <div
      className={tw`col(start-5 end-6) row(start-3 end-6) bg-white p-4 rounded-md shadow-md max-h-full overflow-hidden`}
    >
      <span className={tw`text-lg font-bold nunito block mb-2`}>Today's Cases</span>
      <CountryList countries={countries as Country[]} />
    </div>
  )
}
