"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"



export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  const toggleTheme = () => setTheme(isDark ? "light" : "dark")
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative flex items-center w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-200 border-gray-300"}`}
    >
      {/* Track */}
      <span className="absolute left-2 text-yellow-400">
        <Sun className="h-4 w-4" />
      </span>
      <span className="absolute right-2 text-blue-600">
        <Moon className="h-4 w-4" />
      </span>
      {/* Thumb */}
      <motion.span
        className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full shadow-md flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-white"}`}
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-blue-400" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-400" />
        )}
      </motion.span>
    </button>
  )
}
