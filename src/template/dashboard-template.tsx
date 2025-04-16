"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { BarChart3, RefreshCw } from "lucide-react"

import { fetchFinanceData } from "@/lib/api"

import { useAuth } from "@/contexts/auth-context"

import { DashboardHeader } from "@/components/dashboard-header"
import { QuotesList } from "@/components/quotes-list"
import { QuoteChart } from "@/components/quote-chart"
import { QuotesFilter } from "@/components/quotes-filter"
import { Button } from "@/components/ui/button"

import type { Quote } from "@/types/finance"

const FAVORITE_KEY_STORAGE = "finance_app_favorites"

export default function DashboardTemplate() {
  const router = useRouter()

  const { isAuthenticated, user } = useAuth()

  const [quotes, setQuotes] = useState<Quote[]>([])
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([])
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [quoteHistory, setQuoteHistory] = useState<{ time: string; value: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (quotes.length === 0) return

    let result = [...quotes]

    if (activeFilter !== "all") {
      result = result.filter((quote) => quote.type === activeFilter)
    }

    if (showFavorites) {
      result = result.filter((quote) => quote.isFavorite)
    }

    setFilteredQuotes(result)

    if (selectedQuote && !result.some((q) => q.id === selectedQuote.id) && result.length > 0) {
      setSelectedQuote(result[0])
    } else if (result.length === 0) {
      setSelectedQuote(null)
    }
  }, [quotes, activeFilter, showFavorites, selectedQuote])

  const fetchData = async () => {
    try {
      setRefreshing(true)
      setError("")

      const data = await fetchFinanceData()

      const storedFavorites = localStorage.getItem(FAVORITE_KEY_STORAGE)
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : []

      const quotesArray: Quote[] = []

      if (data.results.currencies) {
        Object.entries(data.results.currencies)
          .filter(([key]) => key !== "source")
          .forEach(([key, value]: [string, any]) => {
            quotesArray.push({
              id: key,
              name: value.name,
              buy: value.buy,
              sell: value.sell,
              variation: value.variation,
              type: "currency",
              isFavorite: favorites.includes(key),
            })
          })
      }

      if (data.results.stocks) {
        Object.entries(data.results.stocks).forEach(([key, value]: [string, any]) => {
          quotesArray.push({
            id: key,
            name: value.name,
            price: value.points || value.price,
            variation: value.variation,
            type: "stock",
            isFavorite: favorites.includes(key),
          })
        })
      }

      if (data.results.bitcoin) {
        Object.entries(data.results.bitcoin).forEach(([key, value]: [string, any]) => {
          const id = `bitcoin_${key}`
          quotesArray.push({
            id: id,
            name: `Bitcoin (${key.toUpperCase()})`,
            price: value.buy || value.last,
            variation: value.variation,
            type: "crypto",
            isFavorite: favorites.includes(id),
          })
        })
      }

      setQuotes(quotesArray)

      if (!selectedQuote && quotesArray.length > 0) {
        setSelectedQuote(quotesArray[0])
      }

      setLoading(false)
      setRefreshing(false)
    } catch (err) {
      console.error("Erro ao buscar dados:", err)
      setError("Falha ao carregar cotações. Tente novamente mais tarde.")
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()

      const interval = setInterval(fetchData, 5 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (selectedQuote) {
      setQuoteHistory([])

      const now = new Date()
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
      const value = selectedQuote.price || selectedQuote.buy || 0

      const initialHistory = []
      for (let i = 5; i >= 0; i--) {
        const pastTime = new Date(now.getTime() - i * 60000)
        const pastTimeStr = `${pastTime.getHours().toString().padStart(2, "0")}:${pastTime.getMinutes().toString().padStart(2, "0")}`
        const randomVariation = Math.random() * 0.02 - 0.01

        initialHistory.push({
          time: pastTimeStr,
          value: value * (1 + randomVariation),
        })
      }

      initialHistory.push({ time: timeStr, value })
      setQuoteHistory(initialHistory)

      const interval = setInterval(() => {
        const now = new Date()
        const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
        const randomVariation = Math.random() * 0.02 - 0.01 // -1% a +1%
        const baseValue = selectedQuote.price || selectedQuote.buy || 0
        const newValue = baseValue * (1 + randomVariation)

        setQuoteHistory((prev) => {
          const newHistory = [...prev, { time: timeStr, value: newValue }]
          if (newHistory.length > 20) {
            return newHistory.slice(newHistory.length - 20)
          }
          return newHistory
        })
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [selectedQuote])

  const handleSelectQuote = (quote: Quote) => {
    setSelectedQuote(quote)
  }

  const handleRefresh = () => {
    fetchData()
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  const handleFavoritesToggle = (showFavs: boolean) => {
    setShowFavorites(showFavs)
  }

  const handleToggleFavorite = (quoteId: string) => {
    setQuotes((prevQuotes) => {
      const updatedQuotes = prevQuotes.map((quote) => {
        if (quote.id === quoteId) {
          return { ...quote, isFavorite: !quote.isFavorite }
        }

        return quote
      })

      const favorites = updatedQuotes.filter((quote) => quote.isFavorite).map((quote) => quote.id)

      localStorage.setItem(FAVORITE_KEY_STORAGE, JSON.stringify(favorites))

      return updatedQuotes
    })
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <DashboardHeader username={user?.name || "Usuário"} />

      <main className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold finance-text">Cotações Financeiras</h1>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="self-start md:self-auto bg-slate-700 text-white border-slate-600 hover:bg-slate-600 hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Atualizando..." : "Atualizar Cotações"}
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="finance-text">Carregando cotações...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-md finance-text">{error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <QuotesFilter
                onFilterChange={handleFilterChange}
                onFavoritesToggle={handleFavoritesToggle}
                showFavorites={showFavorites}
                activeFilter={activeFilter}
              />
              <QuotesList
                quotes={filteredQuotes}
                onSelectQuote={handleSelectQuote}
                onToggleFavorite={handleToggleFavorite}
                selectedQuoteId={selectedQuote?.id}
              />
            </div>
            <div className="lg:col-span-2">
              {selectedQuote ? (
                <QuoteChart quote={selectedQuote} history={quoteHistory} />
              ) : (
                <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-xl p-6 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                    <p className="finance-text">Selecione uma cotação para visualizar o gráfico</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
