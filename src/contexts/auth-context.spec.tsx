import { render, screen, act, renderHook, waitFor } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"

import { AuthProvider, useAuth } from "./auth-context"

import { secureStore, secureRetrieve } from "@/lib/crypto"

vi.mock("@/lib/crypto", () => ({
  secureStore: vi.fn(),
  secureRetrieve: vi.fn(),
}))

const TestComponent = () => {
  const { user, isAuthenticated, login, register, logout } = useAuth()

  return (
    <div>
      <p data-testid="user">{user ? user.name : "No user"}</p>
      <p data-testid="auth-status">{isAuthenticated ? "Authenticated" : "Not Authenticated"}</p>
      <button onClick={() => login("test@example.com", "password")}>Login</button>
      <button onClick={() => register("Test User", "test@example.com", "password")}>Register</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe("AuthContext", () => {
  it("should initialize with no user and not authenticated", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId("user").textContent).toBe("No user")
    expect(screen.getByTestId("auth-status").textContent).toBe("Not Authenticated")
  })

  it("should allow a user to log in", async () => {
    const mockUser = { id: "1", name: "Test User", email: "test@example.com", password: "password" }
    secureRetrieve.mockReturnValueOnce(mockUser)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loginButton = screen.getByText("Login")

    userEvent.click(loginButton)

    waitFor(() => {
      expect(screen.getByTestId("user").textContent).toBe("Test User")
      expect(screen.getByTestId("auth-status").textContent).toBe("Authenticated")

      expect(secureStore).toHaveBeenCalledWith("finance_app_session_secure", {
        id: "1",
        name: "Test User",
        email: "test@example.com",
      })
    })
  })

  it("should allow a user to register", async () => {
    secureRetrieve.mockReturnValueOnce([])

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const registerButton = screen.getByText("Register")

 
    userEvent.click(registerButton)

    waitFor(() => {
      expect(screen.getByTestId("user").textContent).toBe("Test User")
      expect(screen.getByTestId("auth-status").textContent).toBe("Authenticated")
      expect(secureStore).toHaveBeenCalledWith("finance_app_users_secure", [
        expect.objectContaining({ name: "Test User", email: "test@example.com" }),
      ])
    })
  })

  it("should allow a user to log out", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const logoutButton = screen.getByText("Logout")

    await act(async () => {
      logoutButton.click()
    })

    expect(screen.getByTestId("user").textContent).toBe("No user")
    expect(screen.getByTestId("auth-status").textContent).toBe("Not Authenticated")
  })
})