import { tw, CSSRules } from "twind"
import { css } from "twind/css"
import { Country } from "../types"
import CountryItem from "./CountryItem"

interface CountryListProps {
  countries: Country[]
  type: keyof Country
  gridCol: [number, number]
}

export default function CountryList({
  countries,
  type,
  gridCol,
}: CountryListProps) {
  const scrollbarStyle: CSSRules = {
    "&": {
      marginRight: "-0.5rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#d4d4d4",
      borderRadius: "0.5rem",
      cursor: "pointer",
      display: "none",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "#b0b0b0",
      display: "block",
    },
    "&::-webkit-scrollbar": {
      "background-color": "#ffffff",
      width: "0.5rem",
    },
  }

  return (
    <div
      className={tw`
        grid(& row-10) gap-2 row(start-2 end-5)
        col(start-${gridCol[0]} end-${gridCol[1]})
        h-full overflow-y-auto pr-1 ${css(scrollbarStyle)}
      `}
    >
      {countries?.map((country, idx) => (
        <CountryItem
          key={idx}
          name={country.country}
          confirmed={country[type] as number}
          flag={country.countryInfo.flag}
        />
      ))}
    </div>
  )
}
