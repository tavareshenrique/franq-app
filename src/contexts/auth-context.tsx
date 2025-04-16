"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

const STORE_KEY_APP_USER = "finance_app_user"
const STORE_KEY_APP_SESSION_EXPIRY = "finance_app_session_expiry"

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem(STORE_KEY_APP_USER)
      const sessionExpiry = localStorage.getItem(STORE_KEY_APP_SESSION_EXPIRY)

      if (storedUser && sessionExpiry) {
        const user = JSON.parse(storedUser)
        const expiry = Number.parseInt(sessionExpiry)

        if (expiry > Date.now()) {
          setUser(user)
          setIsAuthenticated(true)

          const newExpiry = Date.now() + 30 * 60 * 1000

          localStorage.setItem(STORE_KEY_APP_SESSION_EXPIRY, newExpiry.toString())
        } else {
          logout()
        }
      }

      setLoading(false)
    }

    checkAuth()

    // Verificar a sessão a cada minuto
    const interval = setInterval(() => {
      const sessionExpiry = localStorage.getItem(STORE_KEY_APP_SESSION_EXPIRY)

      if (sessionExpiry && Number.parseInt(sessionExpiry) < Date.now()) {
        logout()
      }
    }, 60 * 1000)

    // Atualizar a expiração da sessão quando o usuário interagir com a página
    const updateSession = () => {
      if (isAuthenticated) {
        const newExpiry = Date.now() + 30 * 60 * 1000 // 30 minutos
        localStorage.setItem(STORE_KEY_APP_SESSION_EXPIRY, newExpiry.toString())
      }
    }

    window.addEventListener("click", updateSession)
    window.addEventListener("keypress", updateSession)
    window.addEventListener("scroll", updateSession)

    return () => {
      clearInterval(interval)
      window.removeEventListener("click", updateSession)
      window.removeEventListener("keypress", updateSession)
      window.removeEventListener("scroll", updateSession)
    }
  }, [isAuthenticated])

  const login = async (email: string, password: string) => {
    const usersJson = localStorage.getItem(STORE_KEY_APP_USER)
    const users = usersJson ? JSON.parse(usersJson) : []

    const user = users.find((u: any) => u.email === email)

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    if (user.password !== password) {
      throw new Error("Senha incorreta")
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    localStorage.setItem(STORE_KEY_APP_USER, JSON.stringify(sessionUser))

    const expiry = Date.now() + 30 * 60 * 1000
    localStorage.setItem(STORE_KEY_APP_SESSION_EXPIRY, expiry.toString())

    setUser(sessionUser)
    setIsAuthenticated(true)
  }

  const register = async (name: string, email: string, password: string) => {
    const usersJson = localStorage.getItem(STORE_KEY_APP_USER)
    const users = usersJson ? JSON.parse(usersJson) : []

    if (users.some((u: any) => u.email === email)) {
      throw new Error("Este email já está em uso")
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    }

    users.push(newUser)
    localStorage.setItem(STORE_KEY_APP_USER, JSON.stringify(users))

    await login(email, password)
  }

  const logout = () => {
    localStorage.removeItem(STORE_KEY_APP_USER)
    localStorage.removeItem(STORE_KEY_APP_SESSION_EXPIRY)

    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
