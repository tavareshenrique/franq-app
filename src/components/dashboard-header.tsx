"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { BarChart3, LogOut, Settings, Hand } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  username: string
}

export function DashboardHeader({ username }: DashboardHeaderProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <header className="bg-slate-800 border-b border-slate-700 py-3 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 hidden md:flex justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <Image src="/franq-logo.png" alt="Logo da Franq" height={64} width={64} />
          <div className="font-bold text-xl bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent">
            Franq App
          </div>

          <span className="text-slate-400"> | </span>

          <div className="flex items-center gap-2 py-1 px-3">
            <span className="text-lg text-white">Olá, {username}!</span>
            <Hand className="h-6 w-6 text-slate-300" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className={`${
              pathname === "/dashboard"
                ? "bg-slate-700 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-700"
            } rounded-full py-1 px-3`}
          >
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-slate-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>

          <Link
            href="/admin"
            className={`${
              pathname === "/admin" ? "bg-slate-700 text-white" : "text-slate-300 hover:text-white hover:bg-slate-700"
            } rounded-full py-1 px-3`}
          >
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-slate-700">
              <Settings className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>

          <Button variant="ghost" size="sm" onClick={logout} className="text-white hover:text-white hover:bg-slate-700">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 flex md:hidden justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold text-blue-300">
            Franq<span className="text-white">App</span>
          </div>
          <span className="text-slate-400 mx-1">|</span>
          <div className="text-white">Olá, {username}!</div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className={`p-2 ${pathname === "/dashboard" ? "bg-slate-700" : ""}`}>
              <BarChart3 className="h-5 w-5 text-white" />
            </Button>
          </Link>

          <Link href="/admin">
            <Button variant="ghost" size="sm" className={`p-2 ${pathname === "/admin" ? "bg-slate-700" : ""}`}>
              <Settings className="h-5 w-5 text-white" />
            </Button>
          </Link>

          <Button variant="ghost" size="sm" className="p-2" onClick={logout}>
            <LogOut className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  )
}
