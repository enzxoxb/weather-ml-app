"use client"

import { CloudRain, CloudSnow, Sun, CloudSun } from "lucide-react"
import type { WeatherPrediction } from "@/lib/ml-weather-service"
import { Skeleton } from "@/components/ui/skeleton"

interface WeatherForecastProps {
  predictions: WeatherPrediction[]
  loading: boolean
}

export function WeatherForecast({ predictions, loading }: WeatherForecastProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-7 gap-2">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col items-center p-2 rounded-lg">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-8 rounded-full my-2" />
              <Skeleton className="h-6 w-12 mb-1" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-1 w-full mt-2" />
            </div>
          ))}
      </div>
    )
  }

  if (!predictions || predictions.length === 0) {
    return <div className="text-center py-4">No forecast data available</div>
  }

  // Helper function to determine weather icon based on conditions
  const getWeatherIcon = (prediction: WeatherPrediction) => {
    const { precipitationChance, temperature } = prediction

    if (precipitationChance > 50) {
      return temperature < 32 ? CloudSnow : CloudRain
    } else if (precipitationChance > 20) {
      return CloudSun
    } else {
      return temperature > 75 ? Sun : CloudSun
    }
  }

  // Format day name
  const getDayName = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return "Today"
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow"

    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {predictions.map((prediction, index) => {
        const Icon = getWeatherIcon(prediction)
        const confidenceWidth = `${prediction.confidence * 100}%`
        const day = getDayName(prediction.timestamp)

        return (
          <div key={index} className="flex flex-col items-center p-2 rounded-lg">
            <div className="font-medium">{day}</div>
            <Icon className="h-8 w-8 my-2" />
            <div className="text-xl font-bold">{Math.round(prediction.temperature)}°</div>
            <div className="text-xs text-muted-foreground">{Math.round(prediction.precipitationChance)}% rain</div>
            <div className="w-full h-1 bg-muted mt-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: confidenceWidth }}
                title={`${Math.round(prediction.confidence * 100)}% confidence`}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

