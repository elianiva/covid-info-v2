import { tw } from "twind"

export default function ChartBox({
  className,
  data,
}: {
  className: string
  data?: number
}) {
  return (
    <div className={tw`bg-white rounded-md shadow-md ${className}`}>{data}</div>
  )
}
