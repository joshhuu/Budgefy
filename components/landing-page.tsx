"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Wallet, 
  Shield, 
  Smartphone,
  Users,
  Star,
  Github,
  Linkedin,
  LogIn,
  UserPlus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/auth-modal"
import { ParticleBackground } from "@/components/particle-background"
import { ThemeToggle } from "@/components/theme-toggle"

const LandingPage = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const features = [
    {
      icon: BarChart3,
      title: "Smart Analytics",
      points: [
        "Real-time spending insights",
        "Monthly trend analysis",
        "Budget variance tracking"
      ]
    },
    {
      icon: PieChart,
      title: "Visual Reports",
      points: [
        "Interactive pie charts",
        "Category breakdowns",
        "Spending distribution"
      ]
    },
    {
      icon: TrendingUp,
      title: "Trend Analysis",
      points: [
        "Historical data comparison",
        "Predictive insights",
        "Growth tracking"
      ]
    },
    {
      icon: Wallet,
      title: "Expense Tracking",
      points: [
        "Automatic categorization",
        "Receipt scanning",
        "Multi-account support"
      ]
    },
    {
      icon: Shield,
      title: "Secure & Private",
      points: [
        "Bank-level encryption",
        "Data privacy protection",
        "Secure cloud backup"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      points: [
        "Responsive design",
        "Touch-optimized interface",
        "Offline capability"
      ]
    }
  ]

  const categories = [
    { name: "Food", emoji: "🍕", color: "bg-red-500" },
    { name: "Transport", emoji: "🚗", color: "bg-blue-500" },
    { name: "Shopping", emoji: "🛍️", color: "bg-purple-500" },
    { name: "Entertainment", emoji: "🎬", color: "bg-pink-500" },
    { name: "Healthcare", emoji: "🏥", color: "bg-green-500" },
    { name: "Education", emoji: "📚", color: "bg-yellow-500" },
    { name: "Bills", emoji: "📄", color: "bg-indigo-500" },
    { name: "Travel", emoji: "✈️", color: "bg-teal-500" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
              Budgefy
            </span>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("features")} 
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              Features
            </button>
            <a 
              href="/analytics" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Analytics
            </a>
          </motion.div>

          {/* Auth Buttons */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => openAuthModal("login")}
              className="hidden sm:flex"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button 
              size="sm"
              onClick={() => openAuthModal("signup")}
              className="bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-600 hover:to-purple-600 text-white"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Signup</span>
              <span className="sm:hidden">Join</span>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Track smart, spend smarter with{" "}
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Budgefy
              </span>{" "}
              💰
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              A modern, intuitive expense tracker that helps you analyze patterns, 
              control spending, and build smarter financial habits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={() => openAuthModal("signup")}
                className="bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.location.href = "/analytics"}
                className="border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-3 text-lg"
              >
                See Analytics
                <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span>10k+ Happy Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Powerful Features for Smart Money Management
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Visualize your money like never before – real-time analytics at your fingertips.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm group-hover:bg-card">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {feature.points.map((point, idx) => (
                        <li key={idx} className="flex items-start text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <Star className="h-4 w-4 mr-3 mt-0.5 text-yellow-500 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Smart Category Management
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Organize your expenses with intelligent categorization and colorful visual indicators.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 3 }}
                className="cursor-pointer group"
              >
                <div 
                  className={`${category.color} text-white hover:shadow-2xl transition-all duration-300 p-6 rounded-3xl flex flex-col items-center space-y-3 h-28 md:h-32 justify-center group-hover:brightness-110`}
                >
                  <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                    {category.emoji}
                  </span>
                  <span className="text-sm md:text-base font-semibold text-center">
                    {category.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground text-lg">
              And many more categories with automatic smart detection! 🤖
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                  Budgefy
                </span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Making personal finance management simple, intuitive, and powerful for everyone.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => scrollToSection("home")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection("features")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Features
                </button>
                <a 
                  href="/analytics"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Analytics
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold">Connect</h4>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                © 2025 Budgefy. Built with ❤️ by{" "}
                <span className="font-medium text-foreground">Joshh</span>. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={authMode}
      />
    </div>
  )
}

export default LandingPage
