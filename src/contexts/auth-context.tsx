"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { secureStore, secureRetrieve } from "@/lib/crypto"

const USERS_STORAGE_KEY = "finance_app_users_secure"
const SESSION_STORAGE_KEY = "finance_app_session_secure"
const SESSION_EXPIRY_KEY = "finance_app_session_expiry"

const TIME_TO_EXPIRY = 30 * 60 * 1000 // 30 minutos
const TIME_INTERVAL = 60 * 1000 // 1 minuto

interface User {
  id: string
  name: string
  email: string
}

interface UserWithPassword extends User {
  password: string
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

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === "undefined") {
        setLoading(false)
        return
      }

      const sessionUser = secureRetrieve<User>(SESSION_STORAGE_KEY)
      const sessionExpiry = localStorage.getItem(SESSION_EXPIRY_KEY)

      if (sessionUser && sessionExpiry) {
        const expiry = Number.parseInt(sessionExpiry)

        if (expiry > Date.now()) {
          setUser(sessionUser)
          setIsAuthenticated(true)

          localStorage.setItem(SESSION_EXPIRY_KEY, TIME_TO_EXPIRY.toString())
        } else {
          logout()
        }
      }

      setLoading(false)
    }

    checkAuth()

    const interval = setInterval(() => {
      if (typeof window === "undefined") return

      const sessionExpiry = localStorage.getItem(SESSION_EXPIRY_KEY)

      if (sessionExpiry && Number.parseInt(sessionExpiry) < Date.now()) {
        logout()
      }
    }, TIME_INTERVAL)

    const updateSession = () => {
      if (isAuthenticated) {
        localStorage.setItem(SESSION_EXPIRY_KEY, TIME_TO_EXPIRY.toString())
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("click", updateSession)
      window.addEventListener("keypress", updateSession)
      window.addEventListener("scroll", updateSession)
    }

    return () => {
      clearInterval(interval)

      if (typeof window !== "undefined") {
        window.removeEventListener("click", updateSession)
        window.removeEventListener("keypress", updateSession)
        window.removeEventListener("scroll", updateSession)
      }
    }
  }, [isAuthenticated])

  const login = async (email: string, password: string) => {
    const users = secureRetrieve<UserWithPassword[]>(USERS_STORAGE_KEY) || []

    const user = users.find((u) => u.email === email)

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

    secureStore(SESSION_STORAGE_KEY, sessionUser)

    localStorage.setItem(SESSION_EXPIRY_KEY, TIME_TO_EXPIRY.toString())

    setUser(sessionUser)
    setIsAuthenticated(true)
  }

  const register = async (name: string, email: string, password: string) => {
    const users = secureRetrieve<UserWithPassword[]>(USERS_STORAGE_KEY) || []

    if (users.some((u) => u.email === email)) {
      throw new Error("Este email já está em uso")
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    }

    users.push(newUser)
    secureStore(USERS_STORAGE_KEY, users)

    await login(email, password)
  }

  const logout = () => {
    localStorage.removeItem(SESSION_EXPIRY_KEY)
    localStorage.removeItem(SESSION_STORAGE_KEY)
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
