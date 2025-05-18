"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import DashboardView from "@/components/views/dashboard-view"

export default function DashboardPage() {
  return (
    <div className="w-full h-full lg:px-46 md:px-20">
      <Header />
      <DashboardView />
      <Footer />
    </div>
  )
}
