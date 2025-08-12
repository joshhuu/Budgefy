"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ExpensePieChart } from "@/components/charts/expense-pie-chart"
import { MonthlyTrendChart } from "@/components/charts/monthly-trend-chart"
import { SpendingInsights } from "@/components/charts/spending-insights"

export default function AnalyticsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Insights and trends from your expense data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpensePieChart />
          <MonthlyTrendChart />
        </div>

        <SpendingInsights />
      </div>
    </DashboardLayout>
  )
}
