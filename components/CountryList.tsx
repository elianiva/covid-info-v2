import { tw, CSSRules } from "twind"
import { css } from "twind/css"
import { Country } from "../types"
import CountryItem from "./CountryItem"

interface CountryListProps {
  countries: Country[] | null
}

export default function CountryList({ countries }: CountryListProps) {
  const scrollbarStyle: CSSRules = {
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#d4d4d4",
      borderRadius: "0.5rem",
      cursor: "pointer",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "#b0b0b0",
    },
    "&::-webkit-scrollbar": {
      "background-color": "#ffffff",
      width: "0.5rem",
    },
  }

  return (
    <div
      className={tw`
          grid(& row-10) gap-2 row(start-2 end-5) col(start-2 end-3) h-full overflow-y-auto pr-1
          ${css(scrollbarStyle)}
        `}
    >
      {countries?.map((country, idx) => (
        <CountryItem
          key={idx}
          name={country.country}
          confirmed={country.cases}
          flag={country.countryInfo.flag}
        />
      ))}
    </div>
  )
}
