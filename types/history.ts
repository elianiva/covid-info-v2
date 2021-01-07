export type ArrOfObject = { [key: string]: number }[]

export interface CountryHist {
  country: string
  province: string[]
  timeline: {
    cases: ArrOfObject
    deaths: ArrOfObject
    recovered: ArrOfObject
  }
}
