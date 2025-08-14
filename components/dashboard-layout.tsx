"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { AnimatedBackground } from "@/components/animated-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { LayoutDashboard, PieChart, Settings, LogOut, Menu, DollarSign, TrendingUp } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: PieChart,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
    },
  },
}

const navItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const SidebarContent = () => (
    <motion.div className="flex h-full flex-col" variants={sidebarVariants} initial="hidden" animate="visible">
      {/* Logo/Brand */}
      <motion.div className="flex h-16 items-center border-b border-white/20 px-6" variants={navItemVariants}>
        <div className="flex items-center gap-2">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <DollarSign className="h-4 w-4 text-white" />
          </motion.div>
          <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ExpenseTracker
          </span>
        </div>
      </motion.div>


      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <motion.div key={item.name} variants={navItemVariants} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400"
                    : "text-muted-foreground hover:bg-white/10 hover:text-foreground",
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </motion.div>
          )
        })}
      </nav>

    </motion.div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground variant="geometric" />

      <div className="relative z-10 flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-r border-white/20">
            <SidebarContent />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden fixed top-4 left-4 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
            {/* Visually hidden title for accessibility */}
            <span className="sr-only">
              <span role="heading" aria-level={1}>Sidebar Navigation</span>
            </span>
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar with user info and actions */}
          <div className="flex items-center justify-end gap-4 px-6 py-4 border-b border-white/20 bg-white/90 dark:bg-gray-900/90">
            <ThemeToggle />
            {/* User Avatar with Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none">
                  <Avatar name={user?.displayName || user?.email || "User"} size={32} />
                  <span className="font-medium text-sm">{user?.displayName || "User"}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-48 p-2">
                <div className="flex flex-col gap-1">
                  <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted transition-colors">
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2 justify-start px-3 py-2 rounded text-muted-foreground hover:text-foreground hover:bg-muted">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {/* Page Content with animations */}
          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
