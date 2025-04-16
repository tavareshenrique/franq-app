import { Metadata } from "next";

import DashboardTemplate from "@/template/dashboard-template";

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function Dashboard() {
  return <DashboardTemplate /> 
}