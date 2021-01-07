import { createContext, useState, Dispatch, SetStateAction } from "react"
import { Country } from "../types"

type arrOfObject = { [key: string]: number }[]

interface Hist {
  cases: arrOfObject
  deaths: arrOfObject
  recovered: arrOfObject
}

interface SelectedItem {
  country?: Country | null
  hist?: Hist | null
}

interface Selected {
  value: SelectedItem
  setValue: Dispatch<SetStateAction<SelectedItem>>
}

export const SelectedContext = createContext<Selected | null>(null)
export const CountryProvider = ({ children }: { children: any }) => {
  const [value, setValue] = useState<SelectedItem>({})
  return (
    <SelectedContext.Provider value={{ value, setValue }}>
      {children}
    </SelectedContext.Provider>
  )
}
