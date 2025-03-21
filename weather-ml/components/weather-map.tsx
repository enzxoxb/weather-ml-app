"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WeatherMap() {
  const [mapType, setMapType] = useState("satellite")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Simulation Map</CardTitle>
        <CardDescription>NVIDIA-powered weather simulation</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="satellite" onValueChange={setMapType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="satellite">Satellite</TabsTrigger>
            <TabsTrigger value="radar">Radar</TabsTrigger>
            <TabsTrigger value="prediction">ML Prediction</TabsTrigger>
          </TabsList>
          <TabsContent value="satellite" className="pt-4">
            <div className="relative h-[300px] w-full bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=800"
                alt="Satellite weather map"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-background/80 p-1 text-xs rounded">Satellite imagery</div>
            </div>
          </TabsContent>
          <TabsContent value="radar" className="pt-4">
            <div className="relative h-[300px] w-full bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=800"
                alt="Radar weather map"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-background/80 p-1 text-xs rounded">Radar imagery</div>
            </div>
          </TabsContent>
          <TabsContent value="prediction" className="pt-4">
            <div className="relative h-[300px] w-full bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=800"
                alt="ML prediction weather map"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-background/80 p-1 text-xs rounded">
                ML prediction overlay
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

