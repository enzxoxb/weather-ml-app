"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import type { WeatherPrediction } from "@/lib/ml-weather-service"
import { Skeleton } from "@/components/ui/skeleton"

interface PrecipitationChartProps {
  predictions: WeatherPrediction[]
  loading: boolean
}

export function PrecipitationChart({ predictions, loading }: PrecipitationChartProps) {
  if (loading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  if (!predictions || predictions.length === 0) {
    return <div className="text-center py-4">No precipitation data available</div>
  }

  // Format data for the chart
  const data = predictions.map((prediction) => ({
    day: prediction.timestamp.toLocaleDateString("en-US", { weekday: "short" }),
    chance: Math.round(prediction.precipitationChance),
    amount: prediction.precipitation,
  }))

  return (
    <ChartContainer
      config={{
        chance: {
          label: "Chance of Precipitation (%)",
          color: "hsl(var(--chart-1))",
        },
        amount: {
          label: "Precipitation Amount (in)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar yAxisId="left" dataKey="chance" fill="var(--color-chance)" />
          <Bar yAxisId="right" dataKey="amount" fill="var(--color-amount)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

