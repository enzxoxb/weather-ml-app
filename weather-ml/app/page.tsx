import { Suspense } from "react"
import WeatherDashboard from "@/components/weather-dashboard"
import { DataSourcesPanel } from "@/components/data-sources-panel"
import { ModelTrainingStatus } from "@/components/model-training-status"
import { PredictionAccuracy } from "@/components/prediction-accuracy"
import { WeatherMap } from "@/components/weather-map"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">ML Weather Forecast</h1>
      <p className="text-muted-foreground max-w-3xl">
        Advanced weather forecasting using machine learning with reinforcement learning techniques and NVIDIA weather
        simulations to continuously improve prediction accuracy.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <WeatherDashboard />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
            <WeatherMap />
          </Suspense>
        </div>

        <div className="space-y-6">
          <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
            <DataSourcesPanel />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
            <ModelTrainingStatus />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
            <PredictionAccuracy />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

