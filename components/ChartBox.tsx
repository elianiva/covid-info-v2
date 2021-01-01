import { tw } from "twind"

interface ChartBoxProps {
  className: string
  data?: number
}

export default function ChartBox({ className, data }: ChartBoxProps) {
  return (
    <div
      className={tw`bg-white rounded-md shadow-md row-start-1 row-end-2 ${className}`}
    >
      {data}
    </div>
  )
}
