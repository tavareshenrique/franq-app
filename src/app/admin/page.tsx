import { Metadata } from "next"

import AdminTemplate from "@/template/admin-template"

export const metadata: Metadata = {
  title: "Administração",
  description: "Área de administração do sistema",
}

export default function AdminPage() {
  return <AdminTemplate />
}
