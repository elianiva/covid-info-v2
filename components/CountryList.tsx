import { useContext } from "react"
import { tw, CSSRules } from "twind"
import { css } from "twind/css"
import { Country, CountryHist } from "../types"
import CountryItem from "./CountryItem"
import { fetchData } from "../utils"
import { SelectedContext } from "../context/selectedCountry"

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
  const selected = useContext(SelectedContext)

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

  const getNewData = async (country: string): Promise<void> => {
    const newCountry = await fetchData<Country>(
      `countries/${country.toLowerCase()}`
    )
    const newHist = await fetchData<CountryHist>(
      `historical/${country.toLowerCase()}?lastdays=10`
    )

    selected?.setValue({
      country: newCountry,
      hist: newHist.timeline,
    })
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
          onClick={async () => await getNewData(country.country)}
        />
      ))}
    </div>
  )
}
