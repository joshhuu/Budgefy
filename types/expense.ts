export interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface ExpenseFormData {
  title: string
  amount: number
  category: string
  date: string
}

export const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Education",
  "Personal Care",
  "Other",
] as const

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]
