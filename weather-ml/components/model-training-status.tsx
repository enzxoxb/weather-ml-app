"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Cpu } from "lucide-react"
import { MLWeatherService, type TrainingStatus } from "@/lib/ml-weather-service"

export function ModelTrainingStatus() {
  const [trainingStatus, setTrainingStatus] = useState<TrainingStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrainingStatus() {
      try {
        setLoading(true)
        const status = await MLWeatherService.getTrainingStatus()
        setTrainingStatus(status)
      } catch (error) {
        console.error("Failed to fetch training status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrainingStatus()

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchTrainingStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading && !trainingStatus) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <span>Model Training</span>
          </CardTitle>
          <CardDescription>Loading training status...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center py-4">
            <Cpu className="h-8 w-8 animate-pulse text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!trainingStatus) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <span>Model Training</span>
          </CardTitle>
          <CardDescription>Unable to load training status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">Training status unavailable</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          <span>Model Training</span>
        </CardTitle>
        <CardDescription>Reinforcement learning progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm">Training Epochs</span>
            <span className="text-sm font-medium">
              {trainingStatus.epochs}/{trainingStatus.totalEpochs}
            </span>
          </div>
          <Progress value={(trainingStatus.epochs / trainingStatus.totalEpochs) * 100} />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm">Validation Accuracy</span>
            <span className="text-sm font-medium">{trainingStatus.accuracy.toFixed(1)}%</span>
          </div>
          <Progress value={trainingStatus.accuracy} />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-2 mt-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">NVIDIA Simulation</span>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              trainingStatus.simulationRunning ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {trainingStatus.simulationRunning ? "Running" : "Paused"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

