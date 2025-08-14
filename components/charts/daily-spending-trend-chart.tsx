"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useExpenses } from "@/hooks/use-expenses"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { format } from "date-fns"

export function DailySpendingTrendChart() {
  const { expenses, loading } = useExpenses()
  const [yMax, setYMax] = useState(5000)
  const [custom, setCustom] = useState("")

  // Group expenses by day for the last 30 days
  const today = new Date()
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (29 - i))
    return d
  })

  const dailyData = days.map((day) => {
    const dayStr = format(day, "dd MMM")
    const dayExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getFullYear() === day.getFullYear() &&
        expenseDate.getMonth() === day.getMonth() &&
        expenseDate.getDate() === day.getDate()
      )
    })
    const total = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    return {
      day: dayStr,
      total,
    }
  })

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-blue-600">Total: ₹{data.total.toLocaleString()}</p>
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
            Day Spending Trend
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm">Y-Axis Max:</span>
            <Select value={custom ? "custom" : yMax.toString()} onValueChange={v => {
              if (v === "custom") {
                setCustom("5000")
                setYMax(5000)
              } else {
                setCustom("")
                setYMax(Number(v))
              }
            }}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500">₹500</SelectItem>
                <SelectItem value="1000">₹1,000</SelectItem>
                <SelectItem value="3000">₹3,000</SelectItem>
                <SelectItem value="5000">₹5,000</SelectItem>
                <SelectItem value="10000">₹10,000</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            {custom !== "" && (
              <Input
                type="number"
                min={1}
                step={100}
                value={custom}
                onChange={e => {
                  setCustom(e.target.value)
                  setYMax(Number(e.target.value) || 100)
                }}
                className="w-24 ml-2"
                placeholder="Custom"
              />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" minTickGap={4} />
              <YAxis domain={[0, yMax]} tickFormatter={(value) => `₹${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ fill: "#16a34a", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#16a34a", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
