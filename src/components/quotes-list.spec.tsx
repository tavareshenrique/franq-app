import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, vi, expect } from "vitest"
import { QuotesList } from "./quotes-list"
import { cn } from "@/lib/utils"

// filepath: src/components/quotes-list.test.tsx

vi.mock("@/lib/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}))

describe("QuotesList", () => {
  const mockOnSelectQuote = vi.fn()
  const mockOnToggleFavorite = vi.fn()

  const mockQuotes = [
    {
      id: "1",
      name: "Bitcoin",
      type: "crypto" as const,
      price: 50000,
      variation: 2.5,
      isFavorite: false,
    },
    {
      id: "2",
      name: "Apple Stock",
      type: "stock" as const,
      price: 150,
      variation: -1.2,
      isFavorite: true,
    },
  ]

  it("renders a message when no quotes are available", () => {
    render(
      <QuotesList
        quotes={[]}
        onSelectQuote={mockOnSelectQuote}
        onToggleFavorite={mockOnToggleFavorite}
        selectedQuoteId={undefined}
      />
    )

    expect(screen.getByText("Nenhuma cotação encontrada com os filtros atuais.")).toBeInTheDocument()
  })

  it("renders quotes correctly", () => {
    render(
      <QuotesList
        quotes={mockQuotes}
        onSelectQuote={mockOnSelectQuote}
        onToggleFavorite={mockOnToggleFavorite}
        selectedQuoteId={undefined}
      />
    )

    expect(screen.getByText("Bitcoin")).toBeInTheDocument()
    expect(screen.getByText("Apple Stock")).toBeInTheDocument()
    expect(screen.getByText("+2.50%")).toBeInTheDocument()
    expect(screen.getByText("-1.20%")).toBeInTheDocument()
  })

  it("calls onSelectQuote when a quote is clicked", () => {
    render(
      <QuotesList
        quotes={mockQuotes}
        onSelectQuote={mockOnSelectQuote}
        onToggleFavorite={mockOnToggleFavorite}
        selectedQuoteId={undefined}
      />
    )

    fireEvent.click(screen.getByText("Bitcoin"))
    expect(mockOnSelectQuote).toHaveBeenCalledWith(mockQuotes[0])
  })

  it("calls onToggleFavorite when the favorite button is clicked", () => {
    render(
      <QuotesList
        quotes={mockQuotes}
        onSelectQuote={mockOnSelectQuote}
        onToggleFavorite={mockOnToggleFavorite}
        selectedQuoteId={undefined}
      />
    )

    const favoriteButton = screen.getAllByRole("button", { hidden: true })[0]
    fireEvent.click(favoriteButton)
    expect(mockOnToggleFavorite).toHaveBeenCalledWith("1")
  })

  it("highlights the selected quote", () => {
    render(
      <QuotesList
        quotes={mockQuotes}
        onSelectQuote={mockOnSelectQuote}
        onToggleFavorite={mockOnToggleFavorite}
        selectedQuoteId="1"
      />
    )

    // Find the outermost div of the selected quote
    const selectedQuote = screen.getByText("Bitcoin").closest(".p-4.cursor-pointer")
    expect(selectedQuote).toHaveClass("border-blue-500 bg-slate-700")
  })
})