export interface Country {
  type: string
  id: string
  properties: {
    name: string
    confirmed?: number
    colour?: string
  }
  geometry: {
    type: string
    coordinates: number[][][]
  }
}

export interface CountryGeoJSON {
  type: string
  features: Country[]
}
