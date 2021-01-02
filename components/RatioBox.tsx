import Chart from "react-apexcharts"
import { tw } from "twind"
import { Country } from "../types"
import { formatNumber } from "../utils"

interface RatioBoxProps {
  data: Country
}

export default function RatioBox({ data }: RatioBoxProps) {
  const series: [number] = [
    parseFloat(
      ((data.recovered / (data.cases + data.active)) * 100).toFixed(2)
    ),
  ]
  const chartOptions = {
    chart: {
      height: 220,
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#dc2626"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          position: "front",
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 2,
            opacity: 0.1,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },

        dataLabels: {
          show: true,
          name: { show: false },
          formatter: (val: string) => `${val}%`,
          value: {
            color: "#242424",
            fontSize: "1.5rem",
            show: true,
          },
          style: {
            fontFamily: '"Nunito", sans-serif',
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#fca5a5"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
  }
  return (
    <div
      className={tw`flex(& col) items-center justify-center col(start-4 end-5) row(start-1 end-3) bg-white p-4 rounded-md shadow-md nunito`}
    >
      <span className={tw`text-xl font-bold text-gray-600`}>
        Ratio Of Recovery
      </span>
      <Chart
        options={chartOptions}
        series={series}
        type="radialBar"
        height={220}
      />
      <div className={tw`flex flex-col justify-between align-center`}>
        <span className={tw`nunito font-bold text-gray-400`}>
          <span className={tw`text-gray-700`}>
            {formatNumber(data.cases + data.active)}
          </span>{" "}
          Affected
        </span>
        <span className={tw`nunito font-bold text-gray-400`}>
          <span className={tw`text-gray-700`}>
            {formatNumber(data.recovered)}
          </span>{" "}
          Recovered
        </span>
      </div>
    </div>
  )
}
