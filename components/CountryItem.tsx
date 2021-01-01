import { tw } from "twind"
import { formatNumber } from "../utils"

interface TopCountryProps {
  name: string
  flag: string
  confirmed: number
  id: number
}

export default function TopCountry({
  name,
  flag,
  confirmed,
  id,
}: TopCountryProps) {
  return (
    <div
      className={tw`flex items-center gap-3 border border-gray-200 rounded-md p-2`}
      key={id}
    >
      <img
        className={tw`w-8 h-4 object-cover`}
        src={flag}
        alt={`${name}-flag`}
      />
      <span className={tw`flex-1 nunito font-bold text-md`}>{name}</span>
      <span className={tw`nunito text-gray-800 `}>{formatNumber(confirmed)}</span>
    </div>
  )
}
