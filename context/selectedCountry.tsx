import { createContext, useState, Dispatch, SetStateAction } from "react"
import { Country, ArrOfObject } from "../types"

interface Hist {
  cases: ArrOfObject
  deaths: ArrOfObject
  recovered: ArrOfObject
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
