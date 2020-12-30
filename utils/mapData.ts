import { Countries } from "../types/countries"
import { CountryGeoJSON } from "../types/geojsonData"

export default class MapData {
  private geoJSON: CountryGeoJSON
  private apiData: Countries[]
  private colorRange = {
    highest: "#BA201E",
    higher: "#FC312F",
    high: "#FD5756",
    normal: "#FC7C7B",
    low: "#FFA5A5",
    lower: "#FFC8C8",
    lowest: "#FFFFFF",
  }

  constructor(geoJSON: any, apiData: Countries[]) {
    this.geoJSON = geoJSON.default
    this.apiData = apiData

    this._appendConfirmedCases(this.geoJSON, this.apiData)
    this._setColour(this.geoJSON)
  }

  private _appendConfirmedCases(
    geoJSON: CountryGeoJSON,
    apiData: Countries[]
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
      }else if (confirmed > 1e6) {
        country.properties.colour = this.colorRange.higher
      } else if (confirmed > 5e5) {
        country.properties.colour = this.colorRange.high
      } else if (confirmed > 250e3) {
        country.properties.colour = this.colorRange.normal
      } else if (confirmed > 5e4) {
        country.properties.colour = this.colorRange.low
      } else if (confirmed > 1e4) {
        country.properties.colour = this.colorRange.lower
      } else {
        country.properties.colour = this.colorRange.lowest
      }
    }
  }

  get getResult(): CountryGeoJSON {
    return this.geoJSON
  }
}
