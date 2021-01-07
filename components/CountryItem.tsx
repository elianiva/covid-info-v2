import { tw } from "twind"
import { formatNumber } from "../utils"

interface CountryItemProps {
  name: string
  flag: string
  confirmed: number
  onClick: () => void
}

export default function CountryItem({
  name,
  flag,
  confirmed,
  onClick,
}: CountryItemProps) {
  return (
    <div
      className={tw`flex items-center gap-3 border(& gray-200) rounded-md p-2 cursor-pointer hover:bg-gray-200`}
      onClick={onClick}
    >
      <img
        className={tw`w-8 h-4 object-cover`}
        src={flag}
        alt={`${name}-flag`}
      />
      <span className={tw`flex-1 nunito font-bold`}>{name}</span>
      <span className={tw`nunito text-gray-800`}>
        {formatNumber(confirmed)}
        <span className={tw`pl-2 text-red-600`}>&#11205;</span>
      </span>
    </div>
  )
}
