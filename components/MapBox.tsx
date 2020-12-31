import { CountryGeoJSON, Countries } from "../types"
import { tw } from "twind"
import "leaflet/dist/leaflet.css"
import LeafletMap from "./LeafletMap"

export default function MapBox({
  mapData,
  apiData,
}: {
  mapData: CountryGeoJSON | null
  apiData: Countries[] | null
}) {
  return (
    <div
      className={tw`grid map-grid items-center col-start-1 col-end-5 row-start-2 row-end-5 bg-white rounded-md shadow-md p-4`}
    >
      <div className={tw`flex col-start-1 col-end-2 row-start-1 row-end-2`}>
        <span className={tw`text-xl nunito font-semibold flex-1`}>
          COVID-19 Affected Areas
        </span>
        <div className={tw`flex items-center gap-3`}>
          {[
            ["2.5M+", "red-800"],
            ["1M+", "red-600"],
            ["500K+", "red-300"],
            ["250K+", "red-200"],
            ["50K+", "red-100"],
            ["5K+", "white"],
          ].map((label: string[], idx: number) => (
            <div className={tw`flex gap-1 items-center`} key={idx}>
              <div
                className={tw`w-4 h-4 bg-${label[1]} rounded-sm ${
                  label[1] === "white" && "border border-gray-300"
                }`}
              />
              <span className={tw`nunito text-red-800 text-sm`}>
                {label[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={tw`col-start-2 col-end-3 row-start-1 row-end-5`}>
        <span className={tw`nunito font-semibold`}>Top Countries</span>
      </div>
      <div
        className={tw`col-start-1 col-end-2 row-start-2 row-end-5 rounded-md h-full overflow-hidden`}
      >
        <LeafletMap mapData={mapData} />
      </div>
    </div>
  )
}
