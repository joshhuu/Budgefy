"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useExpenses } from "@/hooks/use-expenses"
import { TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react"
import { format, subDays, subMonths } from "date-fns"

export function SpendingInsights() {
  const { expenses, loading } = useExpenses()

  if (loading) {
    return (
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <CardHeader>
          <CardTitle>Spending Insights</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  if (expenses.length === 0) {
    return (
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <CardHeader>
          <CardTitle>Spending Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Add some expenses to see personalized insights</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate insights
  const now = new Date()
  const lastWeek = subDays(now, 7)
  const lastMonth = subMonths(now, 1)
  const twoMonthsAgo = subMonths(now, 2)

  const thisWeekExpenses = expenses.filter((e) => new Date(e.date) >= lastWeek)
  const thisMonthExpenses = expenses.filter((e) => new Date(e.date) >= lastMonth)
  const lastMonthExpenses = expenses.filter((e) => new Date(e.date) >= twoMonthsAgo && new Date(e.date) < lastMonth)

  const thisWeekTotal = thisWeekExpenses.reduce((sum, e) => sum + e.amount, 0)
  const thisMonthTotal = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0)
  const lastMonthTotal = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0)

  const monthlyChange = lastMonthTotal > 0 ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0

  // Find top category
  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0]

  // Find largest single expense
  const largestExpense = expenses.reduce((max, expense) => (expense.amount > max.amount ? expense : max), expenses[0])

  const insights = [
    {
      title: "Monthly Trend",
      value: `${monthlyChange >= 0 ? "+" : ""}${monthlyChange.toFixed(1)}%`,
      description: `vs last month`,
      icon: monthlyChange >= 0 ? TrendingUp : TrendingDown,
      color: monthlyChange >= 0 ? "text-red-600" : "text-green-600",
      bgColor: monthlyChange >= 0 ? "bg-red-100 dark:bg-red-900" : "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Top Category",
      value: topCategory?.[0] || "None",
  description: `₹${topCategory?.[1]?.toFixed(2) || "0.00"} total`,
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "This Week",
  value: `₹${thisWeekTotal.toFixed(2)}`,
      description: `${thisWeekExpenses.length} expenses`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Largest Expense",
  value: `₹${largestExpense?.amount?.toFixed(2) || "0.00"}`,
      description: largestExpense?.title || "None",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
  ]

  return (
    <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
      <CardHeader>
        <CardTitle>Spending Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
              <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                <insight.icon className={`h-4 w-4 ${insight.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">{insight.title}</p>
                <p className="font-semibold truncate">{insight.value}</p>
                <p className="text-xs text-muted-foreground truncate">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional insights */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average per expense</span>
            <span className="font-medium">
              ₹
              {expenses.length > 0
                ? (expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length).toFixed(2)
                : "0.00"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Most recent expense</span>
            <span className="font-medium">
              {expenses.length > 0 ? format(new Date(expenses[0].date), "MMM dd, yyyy") : "None"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total categories used</span>
            <Badge variant="secondary">{Object.keys(categoryTotals).length}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
