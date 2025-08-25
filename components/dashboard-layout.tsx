"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SheetTitle } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { AnimatedBackground } from "@/components/animated-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { LayoutDashboard, PieChart, Settings, LogOut, Menu, DollarSign, TrendingUp } from "lucide-react"
import { AUTH_REDIRECT_PATH } from "@/lib/constants"
// import ChatbotSidebar from "@/components/chatbot-sidebar"
import { useExpenses } from "@/hooks/use-expenses"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Transition } from "framer-motion"
import Image from "next/image"

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
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

const sidebarVariants: Variants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
    },
  },
}

const navItemVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
}

const pageTransition: Transition = {
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
  router.push(AUTH_REDIRECT_PATH)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const SidebarContent = () => {
  // const showChatbot = pathname?.startsWith("/dashboard")
    return (
  <motion.div className="flex h-full flex-col " variants={sidebarVariants} initial="hidden" animate="visible">
        {/* Logo/Brand */}
  <motion.div className="flex h-16 items-center border-b border-white/20 px-6 " variants={navItemVariants}>
          <div className="flex items-center gap-2">
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 p-1"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src="/favicon.png" 
                alt="Budgefy Logo" 
                width={24} 
                height={24} 
                className="rounded-sm"
              />
            </motion.div>
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Budgefy
            </span>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href
            // Prefetch analytics page for faster navigation
            const prefetch = item.href === "/dashboard/analytics" ? true : undefined
            return (
              <motion.div key={item.name} variants={navItemVariants} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={item.href}
                  prefetch={prefetch}
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
          {/* AI Assistant styled like other nav items */}
          {(() => {
            const isActive = pathname === "/dashboard/chatbot";
            return (
              <motion.div key="AI Assistant" variants={navItemVariants} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/dashboard/chatbot"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400"
                      : "text-muted-foreground hover:bg-white/10 hover:text-foreground",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Image src="/chatbot.png" alt="AI Assistant" width={20} height={20} className="h-4 w-4 rounded-full" />
                  AI Assistant
                </Link>
              </motion.div>
            );
          })()}
        </nav>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
  <AnimatedBackground variant="particles" />

      <div className="relative z-10 flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col ">
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
                className="lg:hidden fixed top-4 left-4 z-50 "
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 ">
            {/* Visually hidden title for accessibility */}
            <SheetTitle className="sr-only">Sidebar Navigation</SheetTitle>
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar with user info and actions */}
          <div className="flex items-center justify-end gap-4 px-6 py-4 ">
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
