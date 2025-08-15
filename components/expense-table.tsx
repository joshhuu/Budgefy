"use client"

import { useState } from "react"
import * as XLSX from "xlsx"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useExpenses } from "@/hooks/use-expenses"
import { EXPENSE_CATEGORIES } from "@/types/expense"
import { AdvancedFilters, type FilterOptions } from "@/components/advanced-filters"
import { Edit, Trash2, Search } from "lucide-react"

const categoryColors: Record<string, string> = {
  "Food & Dining": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Transportation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Shopping: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Entertainment: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "Bills & Utilities": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Healthcare: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Travel: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  Education: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  "Personal Care": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
}

// Added animation variants for table rows and interactions
const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
}

export function ExpenseTable() {
  const { expenses, loading, deleteExpense, updateExpense } = useExpenses()
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    categories: [],
    dateRange: { from: null, to: null },
    amountRange: { min: null, max: null },
  })

  // Excel download handler
  const handleDownloadExcel = () => {
    if (filteredExpenses.length === 0) return;
    // Prepare data for Excel
    const data = filteredExpenses.map(exp => ({
      Date: format(new Date(exp.date), "yyyy-MM-dd"),
      Category: exp.category,
      Title: exp.title,
      Amount: exp.amount,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "expenses.xlsx");
  }

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      categories: [],
      dateRange: { from: null, to: null },
      amountRange: { min: null, max: null },
    })
  }

  const filteredExpenses = expenses.filter((expense) => {
    // Search term filter
    if (filters.searchTerm && !expense.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(expense.category)) {
      return false
    }

    // Date range filter
    const expenseDate = new Date(expense.date)
    if (filters.dateRange.from && expenseDate < filters.dateRange.from) {
      return false
    }
    if (filters.dateRange.to && expenseDate > filters.dateRange.to) {
      return false
    }

    // Amount range filter
    if (filters.amountRange.min !== null && expense.amount < filters.amountRange.min) {
      return false
    }
    if (filters.amountRange.max !== null && expense.amount > filters.amountRange.max) {
      return false
    }

    return true
  })

  // State for editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const handleEditExpense = (expense: any) => {
    setEditingId(expense.id);
    setEditData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.split("T")[0] || expense.date,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prev: any) => ({ ...prev, [name]: name === "amount" ? parseFloat(value) : value }));
  };

  const handleEditSave = async (id: string) => {
    try {
      await updateExpense(id, editData);
      setEditingId(null);
    } catch (err) {
      alert("Failed to update expense");
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id)
      } catch (error) {
        console.error("Error deleting expense:", error)
      }
    }
  }

  if (loading) {
    return (
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <CardContent className="flex items-center justify-center p-8">
          <motion.div
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Expenses ({filteredExpenses.length})
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleDownloadExcel} disabled={filteredExpenses.length === 0}>
              Download Excel
            </Button>
          </div>
          <AdvancedFilters filters={filters} onFiltersChange={setFilters} onReset={resetFilters} />
        </CardHeader>

        <CardContent>
          {filteredExpenses.length === 0 ? (
            <motion.div
              className="text-center py-8 text-muted-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No expenses found</p>
              <p className="text-sm">
                {expenses.length === 0 ? "Add your first expense to get started!" : "Try adjusting your filters"}
              </p>
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredExpenses.map((expense, index) => (
                      <motion.tr
                        key={expense.id}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        custom={index}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        {editingId === expense.id ? (
                          <>
                            <TableCell className="font-medium">
                              <input
                                type="text"
                                name="title"
                                value={editData.title}
                                onChange={handleEditChange}
                                className="border rounded px-2 py-1 w-full bg-background"
                              />
                            </TableCell>
                            <TableCell>
                              <select
                                name="category"
                                value={editData.category}
                                onChange={handleEditChange}
                                className="border rounded px-2 py-1 w-full bg-background"
                              >
                                <option value="">Select</option>
                                {EXPENSE_CATEGORIES.map((cat) => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            </TableCell>
                            <TableCell>
                              <input
                                type="number"
                                name="amount"
                                value={editData.amount}
                                onChange={handleEditChange}
                                className="border rounded px-2 py-1 w-full bg-background"
                                min="0"
                                step="0.01"
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                type="date"
                                name="date"
                                value={editData.date}
                                onChange={handleEditChange}
                                className="border rounded px-2 py-1 w-full bg-background"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEditSave(expense.id)}>
                                  Save
                                </Button>
                                <Button variant="ghost" size="sm" onClick={handleEditCancel}>
                                  Cancel
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell className="font-medium">{expense.title}</TableCell>
                            <TableCell>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className={categoryColors[expense.category] || categoryColors["Other"]}
                                >
                                  {expense.category}
                                </Badge>
                              </motion.div>
                            </TableCell>
                            <TableCell className="font-mono">₹{expense.amount.toFixed(2)}</TableCell>
                            <TableCell>{format(new Date(expense.date), "MMM dd, yyyy")}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" onClick={() => handleEditExpense(expense)} title="Edit">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(expense.id)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
