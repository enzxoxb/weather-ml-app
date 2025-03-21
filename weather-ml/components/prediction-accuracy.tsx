"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { MLWeatherService } from "@/lib/ml-weather-service"
import { Skeleton } from "@/components/ui/skeleton"

export function PredictionAccuracy() {
  const [accuracyData, setAccuracyData] = useState<{ day: string; accuracy: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAccuracyData() {
      try {
        setLoading(true)
        const data = await MLWeatherService.getAccuracyHistory()
        setAccuracyData(data)
      } catch (error) {
        console.error("Failed to fetch accuracy data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAccuracyData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Prediction Accuracy</CardTitle>
          <CardDescription>Loading accuracy data...</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!accuracyData || accuracyData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Prediction Accuracy</CardTitle>
          <CardDescription>No accuracy data available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">Accuracy history unavailable</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction Accuracy</CardTitle>
        <CardDescription>Improving with reinforcement learning</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            accuracy: {
              label: "Accuracy (%)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[70, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="var(--color-accuracy)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

