"use client"

import Image from "next/image"

import { LogOut, User } from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  username: string
}

export function DashboardHeader({ username }: DashboardHeaderProps) {
  const { logout } = useAuth()

  return (
    <header className="bg-slate-800 border-b border-slate-700 py-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="franq-logo.png" alt="Logo da Franq" height={64} width={64} />
          <div className="font-bold text-xl bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent">
            Franq App
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-700 rounded-full py-1 px-3">
            <User className="h-4 w-4 text-slate-300" />
            <span className="text-sm text-white">{username}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={logout} className="text-white hover:text-white hover:bg-slate-700">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}
