import { Map, GeoJSON } from "react-leaflet-universal"
import { CountryGeoJSON, Country } from "../types/geojsonData"
import { tw } from "twind"
import "leaflet/dist/leaflet.css"

export default function GlobalMap({
  mapData,
}: {
  mapData: CountryGeoJSON | null
}) {
  const formatNumber = (num: number): string =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  const eachFeature = (country: Country, layer: any) => {
    const name: string = country.properties.name
    const confirmedText: string = formatNumber(
      country.properties.confirmed || 0
    )
    layer.bindPopup(`${name} | ${confirmedText} Confirmed Cases`)
    layer.options.fillColor = country.properties.colour
  }

  return (
    <div
      className={tw`col-start-1 col-end-5 row-start-2 row-end-5 bg-white rounded-md shadow-md p-4`}
    >
      <div className={tw`rounded-md w-4/6 h-full overflow-hidden`}>
        <Map
          className={tw`w-full h-full`}
          style={{ backgroundColor: "#f9f3f3" }}
          center={[0, 0]}
          zoom={2}
          minZoom={1.25}
          zoomSnap={0}
        >
          <GeoJSON
            data={mapData?.features as any}
            style={{
              fillColor: "white",
              weight: 1,
              color: "#f9f3f3",
              fillOpacity: 1,
            }}
            onEachFeature={eachFeature as any}
          />
        </Map>
      </div>
    </div>
  )
}
