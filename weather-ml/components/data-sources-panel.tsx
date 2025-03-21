"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Satellite, CloudRain, Thermometer, Wind, Waves, Database } from "lucide-react"

export function DataSourcesPanel() {
  const dataSources = [
    { name: "NOAA Satellite Data", icon: Satellite, status: "active" },
    { name: "Weather Stations", icon: Thermometer, status: "active" },
    { name: "Radar Networks", icon: CloudRain, status: "active" },
    { name: "Ocean Buoys", icon: Waves, status: "active" },
    { name: "Wind Sensors", icon: Wind, status: "active" },
    { name: "Historical Database", icon: Database, status: "active" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Sources</CardTitle>
        <CardDescription>Real-time data feeds for ML training</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {dataSources.map((source) => {
            const Icon = source.icon
            return (
              <div key={source.name} className="flex items-center justify-between p-2 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{source.name}</span>
                </div>
                <Badge variant={source.status === "active" ? "default" : "outline"}>
                  {source.status === "active" ? "Connected" : "Offline"}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

