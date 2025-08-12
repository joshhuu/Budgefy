"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Calendar, PieChart } from "lucide-react"
import { useExpenses } from "@/hooks/use-expenses"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseTable } from "@/components/expense-table"
import { DashboardLayout } from "@/components/dashboard-layout"

// Added animation variants for staggered card animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { stats, loading: expensesLoading } = useExpenses()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <motion.div
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout>
      <motion.div className="p-6 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={cardVariants}>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.displayName || user.email?.split("@")[0]}</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
          <motion.div variants={cardVariants} whileHover={{ scale: 1.02, y: -2 }}>
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                >
                  {expensesLoading ? "..." : `$${stats.total.toFixed(2)}`}
                </motion.div>
                <p className="text-xs text-muted-foreground">All time spending</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ scale: 1.02, y: -2 }}>
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                >
                  {expensesLoading ? "..." : `$${stats.monthly.toFixed(2)}`}
                </motion.div>
                <p className="text-xs text-muted-foreground">Current month spending</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ scale: 1.02, y: -2 }}>
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                >
                  {expensesLoading ? "..." : stats.categories}
                </motion.div>
                <p className="text-xs text-muted-foreground">Expense categories</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ scale: 1.02, y: -2 }}>
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg/Month</CardTitle>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                >
                  {expensesLoading ? "..." : `$${stats.average.toFixed(2)}`}
                </motion.div>
                <p className="text-xs text-muted-foreground">Monthly average</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div className="grid grid-cols-1 xl:grid-cols-3 gap-6" variants={containerVariants}>
          <motion.div variants={cardVariants} className="xl:col-span-1">
            <ExpenseForm />
          </motion.div>
          <motion.div variants={cardVariants} className="xl:col-span-2">
            <ExpenseTable />
          </motion.div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
