"use client"

import { useRef } from "react"

import { Line } from "react-chartjs-2"

import { ArrowDown, ArrowUp, Bitcoin, BarChart3, DollarSign } from "lucide-react"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { Quote } from "@/types/finance"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface QuoteChartProps {
  quote: Quote
  history: { time: string; value: number }[]
}

export function QuoteChart({ quote, history }: QuoteChartProps) {
  const chartRef = useRef<ChartJS<"line"> | null>(null)

  const chartColor = quote.variation > 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
  const chartGradientStart = quote.variation > 0 ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"
  const chartGradientEnd = quote.variation > 0 ? "rgba(34, 197, 94, 0)" : "rgba(239, 68, 68, 0)"

  const mainValue = quote.price || quote.buy || quote.points || 0
  const formattedValue = mainValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const getIcon = () => {
    switch (quote.type) {
      case "currency":
        return <DollarSign className="h-6 w-6 text-blue-300" />
      case "stock":
        return <BarChart3 className="h-6 w-6 text-purple-300" />
      case "crypto":
        return <Bitcoin className="h-6 w-6 text-yellow-300" />
      default:
        return <DollarSign className="h-6 w-6 text-blue-300" />
    }
  }

  const data = {
    labels: history.map((item) => item.time),
    datasets: [
      {
        label: quote.name,
        data: history.map((item) => item.value),
        borderColor: chartColor,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 300)
          gradient.addColorStop(0, chartGradientStart)
          gradient.addColorStop(1, chartGradientEnd)
          return gradient
        },
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: chartColor,
        pointHoverBackgroundColor: chartColor,
        pointBorderColor: "#fff",
        pointHoverBorderColor: "#fff",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(148, 163, 184, 0.2)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) =>
            `Valor: ${context.raw.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            size: 10,
          },
          maxRotation: 0,
          maxTicksLimit: 5,
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            size: 10,
          },
          padding: 8,
        },
        beginAtZero: false,
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    elements: {
      line: {
        borderJoinStyle: "round" as const,
      },
    },
    animation: {
      duration: 1000,
    },
  }

  return (
    <Card className="finance-card">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center">
              {getIcon()}
            </div>
            <div>
              <CardTitle className="text-xl finance-title">{quote.name}</CardTitle>
              <p className="text-sm finance-subtitle">
                {quote.type === "currency" ? "Moeda" : "Criptomoeda"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-sm finance-subtitle">Valor Atual</p>
              <p className="text-2xl font-bold finance-text">
                {quote.type === "currency" ? "R$ " : ""}
                {formattedValue}
              </p>
            </div>

            <div
              className={cn(
                "flex flex-col items-center justify-center px-4 py-2 rounded-lg",
                quote.variation > 0 ? "bg-green-600" : "bg-red-600",
              )}
            >
              <p className="text-sm text-white">Variação</p>
              <div className="flex items-center gap-1">
                {quote.variation > 0 ? (
                  <ArrowUp className="h-4 w-4 text-white" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-white" />
                )}
                <p className="text-lg font-bold text-white">
                  {quote.variation > 0 ? "+" : ""}
                  {quote.variation.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] mt-4">
          {history.length > 1 ? (
            <Line data={data} options={options} ref={chartRef} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="finance-text">Aguardando dados para o gráfico...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
