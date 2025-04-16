import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, vi, beforeEach, expect } from "vitest"

import { useAuth } from "@/contexts/auth-context"

vi.mock("next/link", () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}))
vi.mock("@/contexts/auth-context", () => ({
  useAuth: vi.fn(),
}))
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}))

import { usePathname } from "next/navigation"
import { DashboardHeader } from "./dashboard-header"

describe("DashboardHeader", () => {
  const logout = vi.fn()

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      logout,
      user: { id: "1", name: "Test User", email: "test@example.com" },
      isAuthenticated: true,
      login: vi.fn(),
      register: vi.fn(),
    })
  })

  it("renders the username", () => {
    vi.mocked(usePathname).mockReturnValue("/dashboard")

    render(<DashboardHeader username="João" />)

    expect(screen.getAllByText(/Olá, João!/i)).toHaveLength(2)
  })

  it("highlights Dashboard link when on /dashboard", () => {
    vi.mocked(usePathname).mockReturnValue("/dashboard")

    render(<DashboardHeader username="Maria" />)

    const dashboardButtons = screen.getAllByRole("button", { name: /dashboard/i })
    dashboardButtons.forEach(button => {
      expect(button.className).toContain("bg-slate-700")
    })
  })

  it("highlights Admin link when on /admin", () => {
    vi.mocked(usePathname).mockReturnValue("/admin")

    render(<DashboardHeader username="Pedro" />)

    const adminButtons = screen.getAllByRole("button", { name: /admin/i })
    adminButtons.forEach(button => {
      expect(button.className).toContain("bg-slate-700")
    })
  })

  it("calls logout when logout button is clicked", () => {
    vi.mocked(usePathname).mockReturnValue("/admin")

    render(<DashboardHeader username="Ana" />)

    const logoutButtons = screen.getAllByRole("button", { name: /sair/i })
    logoutButtons.forEach(button => fireEvent.click(button))

    expect(logout).toHaveBeenCalledTimes(logoutButtons.length)
  })
})
