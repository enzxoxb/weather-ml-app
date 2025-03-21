import { NextResponse } from "next/server"

// This is a server-side API route to proxy weather API requests
// This helps keep your API key secure by not exposing it to the client

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")

  if (!location) {
    return NextResponse.json({ error: "Location parameter is required" }, { status: 400 })
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY

  if (!API_KEY) {
    return NextResponse.json({ error: "Weather API key is not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${API_KEY}`,
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch weather data" },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}

