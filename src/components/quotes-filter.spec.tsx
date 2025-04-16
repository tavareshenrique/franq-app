import { render, screen, fireEvent } from "@testing-library/react"

import userEvent from "@testing-library/user-event"

import { describe, it, expect, vi } from "vitest"
import { QuotesFilter } from "./quotes-filter"

describe("QuotesFilter", () => {
  
  it("should render all tabs and the favorites button", () => {
    render(
      <QuotesFilter
        onFilterChange={vi.fn()}
        onFavoritesToggle={vi.fn()}
        showFavorites={false}
        activeFilter="all"
      />
    )

    expect(screen.getByText("Moedas")).toBeInTheDocument()
    expect(screen.getByText("Ações")).toBeInTheDocument()
    expect(screen.getByText("Favoritos")).toBeInTheDocument()
  })

  it("should call onFilterChange when a tab is clicked", async () => {
    const onFilterChange = vi.fn()
    render(
      <QuotesFilter
        onFilterChange={onFilterChange}
        onFavoritesToggle={vi.fn()}
        showFavorites={false}
        activeFilter="all"
      />
    )

    await userEvent.click(screen.getByText("Moedas"))

    expect(onFilterChange).toHaveBeenCalled()
  })

  it("should toggle favorites when the button is clicked", () => {
    const onFavoritesToggle = vi.fn()
    render(
      <QuotesFilter
        onFilterChange={vi.fn()}
        onFavoritesToggle={onFavoritesToggle}
        showFavorites={false}
        activeFilter="all"
      />
    )

    fireEvent.click(screen.getByText("Favoritos"))
    expect(onFavoritesToggle).toHaveBeenCalledWith(true)
  })

  it("should display 'Todos' on the button when showFavorites is true", () => {
    render(
      <QuotesFilter
        onFilterChange={vi.fn()}
        onFavoritesToggle={vi.fn()}
        showFavorites={true}
        activeFilter="all"
      />
    )

    expect(screen.getByText("Todos", { selector: "button" })).toBeInTheDocument()
  })


  it("should toggle favorites when the button is clicked", () => {
    const onFavoritesToggle = vi.fn()
    render(
      <QuotesFilter
        onFilterChange={vi.fn()}
        onFavoritesToggle={onFavoritesToggle}
        showFavorites={false}
        activeFilter="all"
      />
    )

    fireEvent.click(screen.getByText("Favoritos"))
    expect(onFavoritesToggle).toHaveBeenCalledWith(true)
  })
})