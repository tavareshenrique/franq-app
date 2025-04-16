"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { secureRetrieve, secureStore } from "@/lib/crypto"
import { useAuth } from "@/contexts/auth-context"
import { AlertCircle, Check, Trash2, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const USERS_STORAGE_KEY = "finance_app_users_secure"

interface User {
  id: string
  name: string
  email: string
  password: string
}

export function UserManagement() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>(() => secureRetrieve<User[]>(USERS_STORAGE_KEY) || [])
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const removeUser = (userId: string) => {
    if (currentUser && userId === currentUser.id) {
      setMessage({
        type: "error",
        text: "Você não pode remover sua própria conta enquanto estiver logado.",
      })
      return
    }

    const updatedUsers = users.filter((user) => user.id !== userId)

    setUsers(updatedUsers)
    secureStore(USERS_STORAGE_KEY, updatedUsers)

    setMessage({
      type: "success",
      text: "Usuário removido com sucesso.",
    })

    setTimeout(() => setMessage(null), 3000)
  }

  const exportUsers = () => {
    try {
      const dataStr = JSON.stringify(users, null, 2)
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

      const exportFileDefaultName = "finance-app-users.json"

      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", exportFileDefaultName)
      linkElement.click()

      setMessage({
        type: "success",
        text: "Dados exportados com sucesso.",
      })

      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Erro ao exportar dados:", error)
      setMessage({
        type: "error",
        text: "Erro ao exportar dados. Tente novamente.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Usuários</CardTitle>
        <CardDescription>Gerencie os usuários cadastrados no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert
            className={
              message.type === "success" ? "bg-green-500/20 border-green-500 mb-4" : "bg-red-500/20 border-red-500 mb-4"
            }
          >
            <div className="flex items-center gap-2">
              {message.type === "success" ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <AlertTitle className={message.type === "success" ? "text-green-500" : "text-red-500"}>
                {message.type === "success" ? "Sucesso" : "Erro"}
              </AlertTitle>
            </div>
            <AlertDescription className="mt-2">{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-2">
            Total de usuários cadastrados: <span className="font-bold">{users.length}</span>
          </div>

          {users.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-white">Nome</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-white">Email</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t border-slate-700">
                      <td className="px-4 py-3 text-sm text-white">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-white">{user.email}</td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeUser(user.id)}
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          disabled={currentUser?.id === user.id}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remover</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Nenhum usuário cadastrado.</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setUsers([])}>
          <X className="mr-2 h-4 w-4" />
          Limpar Todos
        </Button>
        <Button onClick={exportUsers}>Exportar Dados</Button>
      </CardFooter>
    </Card>
  )
}
