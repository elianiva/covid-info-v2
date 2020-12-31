import { Country, CountryGeoJSON } from "../types"

export default class MapData {
  private geoJSON: CountryGeoJSON
  private apiData: Country[]
  private colorRange = {
    highest: "#991b1b",
    higher: "#dc2626",
    high: "#f87171",
    normal: "#fca5a5",
    low: "#fecaca",
    lower: "#fee2e2",
    lowest: "#FFFFFF",
  }

  constructor(geoJSON: any, apiData: Country[]) {
    this.geoJSON = geoJSON.default
    this.apiData = apiData

    this._appendConfirmedCases(this.geoJSON, this.apiData)
    this._setColour(this.geoJSON)
  }

  private _appendConfirmedCases(
    geoJSON: CountryGeoJSON,
    apiData: Country[]
  ): void {
    for (const country of geoJSON.features) {
      const currentCountry = apiData.find(
        item => item.countryInfo.iso3 === country.id
      )
      currentCountry && (country.properties.confirmed = currentCountry.cases)
    }
  }

  private _setColour(geoJSON: CountryGeoJSON): void {
    for (const country of geoJSON.features) {
      const confirmed = country.properties.confirmed
      if (confirmed === undefined) continue

      if (confirmed > 25e5) {
        country.properties.colour = this.colorRange.highest
      } else if (confirmed > 1e6) {
        country.properties.colour = this.colorRange.higher
      } else if (confirmed > 5e5) {
        country.properties.colour = this.colorRange.high
      } else if (confirmed > 250e3) {
        country.properties.colour = this.colorRange.normal
      } else if (confirmed > 5e4) {
        country.properties.colour = this.colorRange.low
      } else if (confirmed > 5e3) {
        country.properties.colour = this.colorRange.lower
      } else {
        country.properties.colour = this.colorRange.lowest
      }
    }
  }

  get getGeoJSON(): CountryGeoJSON {
    return this.geoJSON
  }
}
