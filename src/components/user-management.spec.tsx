import { render, screen, fireEvent } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { UserManagement } from "./user-management"
import { useAuth } from "@/contexts/auth-context"
import { secureRetrieve, secureStore } from "@/lib/crypto"

vi.mock("@/contexts/auth-context", () => ({
  useAuth: vi.fn(),
}))

vi.mock("@/lib/crypto", () => ({
  secureRetrieve: vi.fn(),
  secureStore: vi.fn(),
}))

describe("UserManagement", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render the component with no users", () => {
    (secureRetrieve as any).mockReturnValue([])
    ;(useAuth as any).mockReturnValue({ user: { id: "1", name: "Admin" } })

    render(<UserManagement />)

    expect(screen.getByText("Gerenciamento de Usuários")).toBeInTheDocument()
    expect(screen.getByText("Nenhum usuário cadastrado.")).toBeInTheDocument()
  })

  it("should display users and allow removing a user", () => {
    const mockUsers = [
      { id: "1", name: "User One", email: "user1@example.com", password: "password1" },
      { id: "2", name: "User Two", email: "user2@example.com", password: "password2" },
    ]
    ;(secureRetrieve as any).mockReturnValue(mockUsers)
    ;(useAuth as any).mockReturnValue({ user: { id: "1", name: "Admin" } })

    render(<UserManagement />)

    expect(screen.getByText("User One")).toBeInTheDocument()
    expect(screen.getByText("User Two")).toBeInTheDocument()

    const removeButtons = screen.getAllByRole("button", { name: /Remover/i })
    fireEvent.click(removeButtons[1])

    expect(secureStore).toHaveBeenCalledWith("finance_app_users_secure", [
      { id: "1", name: "User One", email: "user1@example.com", password: "password1" },
    ])
    expect(screen.queryByText("User Two")).not.toBeInTheDocument()
  })

  it("should not allow removing the logged-in user", () => {
    const mockUsers = [
      { id: "1", name: "User One", email: "user1@example.com", password: "password1" },
    ]
    ;(secureRetrieve as any).mockReturnValue(mockUsers)
    ;(useAuth as any).mockReturnValue({ user: { id: "1", name: "User One" } })

    render(<UserManagement />)

    const removeButton = screen.getByRole("button", { name: /Remover/i })
    expect(removeButton).toBeDisabled()
  })

  it("should export users as JSON", () => {
    const mockUsers = [
      { id: "1", name: "User One", email: "user1@example.com", password: "password1" },
    ]
    ;(secureRetrieve as any).mockReturnValue(mockUsers)
    ;(useAuth as any).mockReturnValue({ user: { id: "1", name: "Admin" } })

    render(<UserManagement />)

    const exportButton = screen.getByText("Exportar Dados")
    fireEvent.click(exportButton)

    expect(screen.getByText("Dados exportados com sucesso.")).toBeInTheDocument()
  })
})