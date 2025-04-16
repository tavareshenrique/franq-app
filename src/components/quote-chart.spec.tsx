import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { QuoteChart } from "./quote-chart"
import { Quote } from "@/types/finance"

vi.mock("react-chartjs-2")

describe("QuoteChart Component", () => {
  describe("QuoteChart Component", () => {
    const mockQuote: Quote = {
      id: "1",
      name: "Bitcoin",
      type: "crypto",
      price: 50000,
      variation: 5.5,
    }

    vi.mock("react-chartjs-2")

    describe("QuoteChart Component", () => {
      const mockQuote: Quote = {
        id: "1",
        name: "Bitcoin",
        type: "crypto",
        price: 50000,
        variation: 5.5,
      }

      const mockHistory = [
        { time: "10:00", value: 48000 },
        { time: "11:00", value: 49000 },
        { time: "12:00", value: 50000 },
      ]

      it("renders the component with correct data", () => {
        render(<QuoteChart quote={mockQuote} history={mockHistory} />)

        expect(screen.getByText("Bitcoin")).toBeInTheDocument()
        expect(screen.getByText("Criptomoeda")).toBeInTheDocument()
        expect(screen.getByText("Valor Atual")).toBeInTheDocument()
        expect(screen.getByText("+5.50%")).toBeInTheDocument()
      })

      it("displays the correct icon for crypto type", () => {
        render(<QuoteChart quote={mockQuote} history={mockHistory} />)

        const icon = screen.getByTestId("quote-icon")

        expect(icon).toHaveClass("text-yellow-300")
      })

      it("renders a message when history data is insufficient", () => {
        render(<QuoteChart quote={mockQuote} history={[]} />)

        expect(screen.getByText("Aguardando dados para o gráfico...")).toBeInTheDocument()
      })

      it("applies the correct styles for positive variation", () => {
        render(<QuoteChart quote={mockQuote} history={mockHistory} />)
      
        const variationContainer = screen.getByText("+5.50%").closest(".px-4.py-2.rounded-lg")
        expect(variationContainer).toHaveClass("bg-green-600")
      })

      it("applies the correct styles for negative variation", () => {
        const negativeQuote = { ...mockQuote, variation: -3.2 }
        render(<QuoteChart quote={negativeQuote} history={mockHistory} />)

        const variationContainer = screen.getByText("-3.20%").closest(".px-4.py-2.rounded-lg")
        expect(variationContainer).toHaveClass("bg-red-600")
      })

      it("handles empty history gracefully", () => {
        render(<QuoteChart quote={mockQuote} history={[]} />)

        expect(screen.getByText("Aguardando dados para o gráfico...")).toBeInTheDocument()
      })
    })
  })
})