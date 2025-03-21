"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import type { WeatherPrediction } from "@/lib/ml-weather-service"
import { Skeleton } from "@/components/ui/skeleton"

interface TemperatureChartProps {
  predictions: WeatherPrediction[]
  loading: boolean
}

export function TemperatureChart({ predictions, loading }: TemperatureChartProps) {
  if (loading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  if (!predictions || predictions.length === 0) {
    return <div className="text-center py-4">No temperature data available</div>
  }

  // Format data for the chart
  const data = predictions.map((prediction) => ({
    day: prediction.timestamp.toLocaleDateString("en-US", { weekday: "short" }),
    temp: Math.round(prediction.temperature),
    high: Math.round(prediction.temperatureHigh),
    low: Math.round(prediction.temperatureLow),
  }))

  return (
    <ChartContainer
      config={{
        temp: {
          label: "Temperature",
          color: "hsl(var(--chart-1))",
        },
        high: {
          label: "High Range",
          color: "hsl(var(--chart-2))",
        },
        low: {
          label: "Low Range",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="high"
            stroke="var(--color-high)"
            fill="var(--color-high)"
            fillOpacity={0.1}
            strokeDasharray="3 3"
          />
          <Area type="monotone" dataKey="temp" stroke="var(--color-temp)" fill="var(--color-temp)" fillOpacity={0.2} />
          <Area
            type="monotone"
            dataKey="low"
            stroke="var(--color-low)"
            fill="var(--color-low)"
            fillOpacity={0.1}
            strokeDasharray="3 3"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

