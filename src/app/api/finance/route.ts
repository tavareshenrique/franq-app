import { NextResponse } from "next/server"

import { mockData } from "@/app/mock/mock-hg-brasil-response"

const HG_BRASIL_API_URL = "https://api.hgbrasil.com/finance?format=json-cors"

async function fetchFromHGBrasil() {
  try {
    const response = await fetch(HG_BRASIL_API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Erro ao buscar dados da API HG Brasil:", error)
    
    return null
  }
}



export async function GET() {
  const apiData = await fetchFromHGBrasil()

  const data = apiData || mockData

  return NextResponse.json(data)
}
