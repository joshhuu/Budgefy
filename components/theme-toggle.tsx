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
      aria-pressed={isDark}
      type="button"
      className={`relative inline-flex items-center px-0.5 py-0.5 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-200 border-gray-300"}`}
    >
      {/* Track icons: small and aligned vertically centered */}
      <span className="absolute left-1 top-1/2 -translate-y-1/2 text-yellow-400 pointer-events-none">
        <Sun className="h-3.5 w-3.5" />
      </span>
      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
        <Moon className="h-3.5 w-3.5" />
      </span>
      {/* Thumb */}
      <motion.span
        className={`absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-sm flex items-center justify-center transition-colors duration-200 ${isDark ? "bg-gray-900" : "bg-white"}`}
        animate={{ x: isDark ? 14 : 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 26 }}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-blue-400" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-yellow-400" />
        )}
      </motion.span>
    </button>
  )
}
