import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { describe, it, beforeEach, afterEach, vi, expect } from "vitest"

import LoginForm from "./login-form"
import { useAuth } from "@/contexts/auth-context"

vi.mock("@/contexts/auth-context", () => ({
  useAuth: vi.fn(),
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

describe("LoginForm", () => {
  const mockLogin = vi.fn()
  const mockRegister = vi.fn()

  beforeEach(() => {
    (useAuth as any).mockReturnValue({
      login: mockLogin,
      register: mockRegister,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe("Login Form", () => {
    it("renders login form by default", () => {
      render(<LoginForm />)
      expect(screen.getByText("Login")).toBeInTheDocument()
      expect(screen.getByLabelText("Email")).toBeInTheDocument()
      expect(screen.getByLabelText("Senha")).toBeInTheDocument()
    })
  
    it("shows error when login fields are empty", async () => {
      render(<LoginForm />)
      fireEvent.click(screen.getByText("Entrar"))
      expect(await screen.findByText("Preencha todos os campos")).toBeInTheDocument()
    })
  
    it("calls login function with correct data", async () => {
      render(<LoginForm />)
      
      fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } })
      fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "password123" } })
      fireEvent.click(screen.getByText("Entrar"))
  
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123")
    })
  })

  describe("Register Form", () => {
    it("renders register form when 'Cadastro' tab is clicked", async () => {
      render(<LoginForm />)
  
      const registerTab = screen.getByRole('tab', {
        name: /cadastro/i
      })
  
      await userEvent.click(registerTab)
  
      expect(screen.getByLabelText("Nome")).toBeInTheDocument()
    })
  
    it("calls register function with correct data", async () => {
      render(<LoginForm />)
  
      const registerTab = screen.getByRole('tab', {
        name: /cadastro/i
      })
  
      await userEvent.click(registerTab)
  
      fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Test User" } })
      fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } })
      fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "password123" } })
      fireEvent.change(screen.getByLabelText("Confirmar Senha"), { target: { value: "password123" } })
      fireEvent.click(screen.getByText("Criar conta"))
      
      expect(mockRegister).toHaveBeenCalledWith("Test User", "test@example.com", "password123")
    })
  
  
    it("calls login function with correct data", async () => {
      render(<LoginForm />)
      fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } })
      fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "password123" } })
      fireEvent.click(screen.getByText("Entrar"))
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123")
    })
  
    it("calls register function with correct data", async () => {
      render(<LoginForm />)
  
      const registerTab = screen.getByRole('tab', {
        name: /cadastro/i
      })
  
      await userEvent.click(registerTab)
  
  
      fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Test User" } })
      fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } })
      fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "password123" } })
      fireEvent.change(screen.getByLabelText("Confirmar Senha"), { target: { value: "password123" } })
      fireEvent.click(screen.getByText("Criar conta"))
      expect(mockRegister).toHaveBeenCalledWith("Test User", "test@example.com", "password123")
    })
  })
})