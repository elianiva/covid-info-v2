import { tw } from "twind"
import { Country } from "../types"
import CountryItem from "./CountryItem"

interface CountryListProps {
  countries: Country[] | null
}

export default function CountryList({ countries }: CountryListProps) {
  return (
    <div className={tw`contents`}>
      <div
        className={tw`flex items-center col-start-2 col-end-3 row-start-1 row-end-2`}
      >
        <span className={tw`flex-1 nunito font-bold text-lg`}>
          Top Countries
        </span>
        <div className={tw`flex items-center gap-2`}>
          <button className={tw`px-4 py-2 rounded-md shadow-md`}>&lt;</button>
          <button className={tw`px-4 py-2 rounded-md shadow-md`}>&gt;</button>
        </div>
      </div>
      <div
        className={tw`grid grid-row-10 gap-2 row-start-2 row-end-5 col-start-2 col-end-3 h-full overflow-y-auto`}
      >
        {countries?.map((country, idx) => (
          <CountryItem
            id={idx}
            name={country.country}
            confirmed={country.cases}
            flag={country.countryInfo.flag}
          />
        ))}
      </div>
    </div>
  )
}
