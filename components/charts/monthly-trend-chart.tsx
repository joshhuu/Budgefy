"use client"

import { useState } from "react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useExpenses } from "@/hooks/use-expenses"
import { TrendingUp, BarChart3, LineChartIcon } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from "date-fns"

type ChartType = "line" | "bar"

export function MonthlyTrendChart() {
  const { expenses, loading } = useExpenses()
  const [chartType, setChartType] = useState<ChartType>("line")

  if (loading) {
    return (
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly Spending Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-80">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  // Generate last 12 months
  const endDate = new Date()
  const startDate = subMonths(endDate, 11)
  const months = eachMonthOfInterval({ start: startDate, end: endDate })

  // Group expenses by month
  const monthlyData = months.map((month) => {
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)

    const monthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate >= monthStart && expenseDate <= monthEnd
    })

    const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const count = monthExpenses.length

    return {
      month: format(month, "MMM yyyy"),
      shortMonth: format(month, "MMM"),
      total,
      count,
      average: count > 0 ? total / count : 0,
    }
  })

  if (expenses.length === 0) {
    return (
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly Spending Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-80">
          <div className="text-center text-muted-foreground">
            <TrendingUp className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No expense data available</p>
            <p className="text-sm">Add some expenses to see trends</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-blue-600">Total: ₹{data.total.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">{data.count} expenses</p>
          {data.count > 0 && <p className="text-sm text-muted-foreground">Avg: ₹{data.average.toLocaleString(undefined, {maximumFractionDigits:0})}</p>}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly Spending Trend
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
            <Button variant={chartType === "bar" ? "default" : "outline"} size="sm" onClick={() => setChartType("bar")}>
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="shortMonth" />
                <YAxis domain={[0, 5000]} tickFormatter={(value) => `₹${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="shortMonth" />
                <YAxis domain={[0, 5000]} tickFormatter={(value) => `₹${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
