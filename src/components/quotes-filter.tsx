"use client"

import { BarChart3, DollarSign, Heart, Star } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface QuotesFilterProps {
  onFilterChange: (filter: string) => void
  onFavoritesToggle: (showFavorites: boolean) => void
  showFavorites: boolean
  activeFilter: string
}

export function QuotesFilter({ onFilterChange, onFavoritesToggle, showFavorites, activeFilter }: QuotesFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
      <Tabs defaultValue="all" value={activeFilter} className="w-full sm:w-auto" onValueChange={onFilterChange}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all" className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Todos</span>
          </TabsTrigger>
          <TabsTrigger value="currency" className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Moedas</span>
          </TabsTrigger>
          <TabsTrigger value="stock" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Ações</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onFavoritesToggle(!showFavorites)}
        className={cn(
          "bg-slate-700 border-slate-600 hover:bg-slate-600",
          showFavorites ? "text-red-300 hover:text-red-300" : "text-white hover:text-white",
        )}
      >
        <Heart className={cn("h-4 w-4 mr-2", showFavorites ? "fill-red-300" : "")} />
        {showFavorites ? "Todos" : "Favoritos"}
      </Button>
    </div>
  )
}
