"use client"

import { useState, useEffect } from "react"
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import type { Expense, ExpenseFormData } from "@/types/expense"

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // Real-time listener for expenses
  useEffect(() => {
    if (!user) {
      setExpenses([])
      setLoading(false)
      return
    }

    try {
      const expensesRef = collection(db, "expenses")
      const q = query(expensesRef, where("userId", "==", user.uid), orderBy("date", "desc"))

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const expenseData: Expense[] = []
          snapshot.forEach((doc) => {
            const data = doc.data()
            expenseData.push({
              id: doc.id,
              title: data.title,
              amount: data.amount,
              category: data.category,
              date: data.date,
              userId: data.userId,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
            })
          })
          setExpenses(expenseData)
          setLoading(false)
          setError(null)
        },
        (err) => {
          console.error("Error fetching expenses:", err)
          setError("Failed to load expenses")
          setLoading(false)
        },
      )

      return () => unsubscribe()
    } catch (err) {
      console.error("Error setting up expenses listener:", err)
      setError("Failed to connect to database")
      setLoading(false)
    }
  }, [user])

  const addExpense = async (expenseData: ExpenseFormData) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const now = Timestamp.now()
      await addDoc(collection(db, "expenses"), {
        ...expenseData,
        userId: user.uid,
        createdAt: now,
        updatedAt: now,
      })
    } catch (err) {
      console.error("Error adding expense:", err)
      throw new Error("Failed to add expense")
    }
  }

  const updateExpense = async (id: string, expenseData: Partial<ExpenseFormData>) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const expenseRef = doc(db, "expenses", id)
      await updateDoc(expenseRef, {
        ...expenseData,
        updatedAt: Timestamp.now(),
      })
    } catch (err) {
      console.error("Error updating expense:", err)
      throw new Error("Failed to update expense")
    }
  }

  const deleteExpense = async (id: string) => {
    if (!user) throw new Error("User not authenticated")

    try {
      await deleteDoc(doc(db, "expenses", id))
    } catch (err) {
      console.error("Error deleting expense:", err)
      throw new Error("Failed to delete expense")
    }
  }

  // Calculate statistics
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
  })
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  const categories = [...new Set(expenses.map((expense) => expense.category))]

  const averageMonthly =
    expenses.length > 0
      ? totalExpenses /
        Math.max(
          1,
          Math.ceil(
            (Date.now() - new Date(expenses[expenses.length - 1]?.date || Date.now()).getTime()) /
              (1000 * 60 * 60 * 24 * 30),
          ),
        )
      : 0

  return {
    expenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    stats: {
      total: totalExpenses,
      monthly: monthlyTotal,
      categories: categories.length,
      average: averageMonthly,
    },
  }
}
