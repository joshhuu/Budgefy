"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, Suspense, lazy } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

const ExpensePieChart = lazy(() => import("@/components/charts/expense-pie-chart").then(m => ({ default: m.ExpensePieChart })))
const MonthlyTrendChart = lazy(() => import("@/components/charts/monthly-trend-chart").then(m => ({ default: m.MonthlyTrendChart })))
const DailySpendingTrendChart = lazy(() => import("@/components/charts/daily-spending-trend-chart").then(m => ({ default: m.DailySpendingTrendChart })))
const SpendingInsights = lazy(() => import("@/components/charts/spending-insights").then(m => ({ default: m.SpendingInsights })))

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
        <div className="flex items-center justify-center h-[60vh] w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
        <Suspense
          fallback={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-muted/40 rounded-lg animate-pulse" />
              <div className="h-80 bg-muted/40 rounded-lg animate-pulse" />
            </div>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpensePieChart />
            <MonthlyTrendChart />
          </div>
        </Suspense>
        <Suspense fallback={<div className="h-80 bg-muted/40 rounded-lg animate-pulse" />}>
          <DailySpendingTrendChart />
        </Suspense>
        <Suspense fallback={<div className="h-40 bg-muted/40 rounded-lg animate-pulse" />}>
          <SpendingInsights />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
