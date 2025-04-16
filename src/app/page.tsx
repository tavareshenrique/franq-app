import { Metadata } from "next"

import LoginTemplate from "@/template/login-template"

export const metadata: Metadata = {
  title: "Login | Franq App",
}

export default function Login() {
  return <LoginTemplate />
}
