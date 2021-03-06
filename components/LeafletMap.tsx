import { tw } from "twind"
import { MapContainer, GeoJSON } from "react-leaflet"
import { CountryGeoJSON, Feature } from "../types"
import { formatNumber } from "../utils"

interface LeafletMapProps {
  mapData: CountryGeoJSON | null
}

export default function LaefletMap({ mapData }: LeafletMapProps) {
  const eachFeature = (country: Feature, layer: any) => {
    const name: string = country.properties.name
    const confirmedText: string = formatNumber(
      country.properties.confirmed || 0
    )
    layer.bindPopup(`${name} | ${confirmedText} Confirmed Cases`)
    layer.options.fillColor = country.properties.colour
  }

  return (
    <MapContainer
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
    </MapContainer>
  )
}
