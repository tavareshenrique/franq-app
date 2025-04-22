"use client"

import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, BarChart3, Bitcoin, DollarSign, Heart, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import type { Quote } from "@/types/finance"

interface QuotesListProps {
  quotes: Quote[]
  onSelectQuote: (quote: Quote) => void
  onToggleFavorite: (quoteId: string) => void
  selectedQuoteId: string | undefined
}

export function QuotesList({ quotes, onSelectQuote, onToggleFavorite, selectedQuoteId }: QuotesListProps) {
  const formatMainValue = (quote: Quote) => {
    const value = quote.price || quote.buy || quote.points || 0
    return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const getIcon = (quote: Quote) => {
    switch (quote.type) {
      case "currency":
        return <DollarSign className="h-5 w-5 text-blue-300" />
      case "stock":
        return <BarChart3 className="h-5 w-5 text-purple-300" />
      case "crypto":
        return <Bitcoin className="h-5 w-5 text-yellow-300" />
      default:
        return <DollarSign className="h-5 w-5 text-blue-300" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "currency":
        return <Badge className="bg-blue-500 text-white border-none">Moeda</Badge>
      case "stock":
        return <Badge className="bg-purple-500 text-white border-none">Ação</Badge>
      case "crypto":
        return <Badge className="bg-yellow-500 text-white border-none">Cripto</Badge>
      default:
        return <Badge className="text-white">Outro</Badge>
    }
  }

  return (
    <Card className="finance-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2 finance-title">
          <TrendingUp className="h-5 w-5 text-blue-300" />
          Cotações
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {quotes.length === 0 ? (
          <div className="p-6 text-center finance-text">
            <p>Nenhuma cotação encontrada com os filtros atuais.</p>
          </div>
        ) : (
          <div className="max-h-[600px] overflow-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className={cn(
                  "p-4 cursor-pointer transition-all border-l-4 border-transparent hover:border-blue-500 hover:bg-slate-700 relative",
                  selectedQuoteId === quote.id && "border-l-4 border-blue-500 bg-slate-700",
                )}
                onClick={() => {
                  onSelectQuote(quote)
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                    {getIcon(quote)}
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate finance-text">{quote.name}</h3>
                      <div className="flex-shrink-0">{getTypeBadge(quote.type)}</div>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className="font-bold text-lg finance-text">
                        {quote.type === "currency" ? "R$ " : ""}
                        {formatMainValue(quote)}
                      </p>

                      <div
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                          quote.variation > 0
                            ? "bg-green-600 text-white"
                            : quote.variation < 0
                              ? "bg-red-600 text-white"
                              : "bg-slate-500 text-white",
                        )}
                      >
                        {quote.variation > 0 ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : quote.variation < 0 ? (
                          <ArrowDown className="h-3 w-3" />
                        ) : null}
                        {quote.variation > 0 ? "+" : ""}
                        {quote.variation.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-slate-700 hover:bg-slate-600"
                  data-testid={`favorite-button-${quote.id}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(quote.id)
                  }}
                >
                  <Heart className={cn("h-4 w-4", quote.isFavorite ? "fill-red-400 text-red-400" : "text-slate-300")} />
                  <span className="sr-only">
                    {quote.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  </span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
