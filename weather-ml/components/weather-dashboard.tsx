"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeatherForecast } from "@/components/weather-forecast"
import { TemperatureChart } from "@/components/temperature-chart"
import { PrecipitationChart } from "@/components/precipitation-chart"
import { MLWeatherService, type WeatherPrediction } from "@/lib/ml-weather-service"

export default function WeatherDashboard() {
  const [location, setLocation] = useState("New York, NY")
  const [predictions, setPredictions] = useState<WeatherPrediction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setLoading(true)
        setError(null)
        const data = await MLWeatherService.getPredictions(location, 7)
        setPredictions(data)
      } catch (err) {
        console.error("Failed to fetch weather data:", err)
        setError("Failed to load weather data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [location])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Weather Forecast for {location}</span>
          <span className="text-sm font-normal text-muted-foreground">Last updated: {new Date().toLocaleString()}</span>
        </CardTitle>
        <CardDescription>ML-enhanced forecast with confidence intervals</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : (
          <Tabs defaultValue="forecast">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
            </TabsList>
            <TabsContent value="forecast" className="pt-4">
              <WeatherForecast predictions={predictions} loading={loading} />
            </TabsContent>
            <TabsContent value="temperature" className="pt-4">
              <TemperatureChart predictions={predictions} loading={loading} />
            </TabsContent>
            <TabsContent value="precipitation" className="pt-4">
              <PrecipitationChart predictions={predictions} loading={loading} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

