"use client"

import { FormEvent, useState } from "react"

import Image from "next/image"

import { useAuth } from "@/contexts/auth-context"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginForm() {
  const { login, register } = useAuth()
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!loginData.email || !loginData.password) {
      setError("Preencha todos os campos")
      return
    }

    try {
      setLoading(true)
      await login(loginData.email, loginData.password)
    } catch (err: any) {
      setError(err.message || "Falha ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setError("Preencha todos os campos")
      return
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (registerData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    try {
      setLoading(true)
      await register(registerData.name, registerData.email, registerData.password)
    } catch (err: any) {
      setError(err.message || "Falha ao criar conta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <Image src="franq-logo.png" alt="Logo da Franq" height={64} width={64} />
        <CardTitle className="text-2xl text-center">Franq App</CardTitle>
        <CardDescription className="text-center">Acompanhe cotações financeiras em tempo real</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>

              {error && <div className="bg-red-500/20 text-red-500 p-2 rounded-md text-sm">{error}</div>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Senha</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                />
              </div>

              {error && <div className="bg-red-500/20 text-red-500 p-2 rounded-md text-sm">{error}</div>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">Dados financeiros fornecidos por HG Brasil</p>
      </CardFooter>
    </Card>
  )
}
