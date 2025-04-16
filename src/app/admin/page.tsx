"use client"

import { useEffect } from "react"

import { Metadata } from "next"
import { useRouter } from "next/navigation"

import { useAuth } from "@/contexts/auth-context"

import { DashboardHeader } from "@/components/dashboard-header"
import { UserManagement } from "@/components/user-management"

export const metadata: Metadata = {
  title: "Administração",
  description: "Área de administração do sistema",
}

export default function AdminPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <DashboardHeader username={user?.name || "Usuário"} />

      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Administração</h1>

        <div className="grid grid-cols-1 gap-6">
          <UserManagement />
        </div>
      </main>
    </div>
  )
}
