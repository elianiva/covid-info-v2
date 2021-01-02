import Chart from "react-apexcharts"
import { tw } from "twind"
import { css } from "twind/css"
import { formatNumber } from "../utils"

type arrOfObject = { [key: string]: number }[]

interface ChartBoxProps {
  className: string
  data: arrOfObject
  label: string
}

export default function ChartBox({ className, data, label }: ChartBoxProps) {
  const series = [
    {
      name: label,
      data: Object.values(data),
    },
  ]
  const chartOptions = {
    chart: {
      type: "area",
      height: 160,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [label !== "Total Recovered" ? "#dc2626" : "#1EC38A"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      show: false,
    },
    title: {
      show: false,
    },
    subtitle: {
      show: false,
    },
    labels: Object.keys(data),
    yaxis: {
      labels: {
        show: false,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => {
          return formatNumber(value)
        },
      },
    },
  }
  return (
    <div
      className={tw`relative bg-white rounded-md shadow-md row-start-1 row-end-2 ${className}`}
    >
      <span
        className={tw`absolute nunito text-lg font-bold ${css({
          "&": {
            left: "1rem",
            top: "1rem",
          },
        })}`}
      >
        {label}
        <span
          className={tw`block ${
            label === "Total Recovered" ? "text-green-600" : "text-red-600"
          }`}
        >
          <span
            className={tw`pr-2 ${
              label === "Total Recovered" ? "text-green-600" : "text-red-600"
            }`}
          >
            {label === "Total Recovered" ? <>&#11206;</> : <>&#11205;</>}
          </span>
          {formatNumber((Object.values(data)[0] as unknown) as number)}
        </span>
      </span>
      <Chart options={chartOptions} series={series} type="area" height={160} />
    </div>
  )
}
