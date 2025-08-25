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
  
  Star,
  Github,
  Linkedin,
  UserPlus,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/auth-modal"
import GlowBackground from "@/components/glow-background"
import Prism from "@/components/Prism"
// ...existing imports

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
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="min-h-screen bg-slate-900 text-slate-200 relative overflow-hidden"
    >
      <GlowBackground />
      <div className="relative z-10">
        <section id="home" className="relative h-screen w-full px-0 m-0 flex items-start">
          {/* Navbar */}
          <header className="w-full absolute top-0 left-0 z-40">
            <div className="container mx-auto px-6 py-4">
              <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">Budgefy</span>
                </div>
                <div className="hidden md:flex items-center space-x-6 text-sm text-slate-300">
                  <button onClick={() => scrollToSection('home')} className="hover:text-white">Home</button>
                  <button onClick={() => scrollToSection('features')} className="hover:text-white">Features</button>
                  <a href="/analytics" className="hover:text-white">Analytics</a>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => openAuthModal('login')} className="text-sm text-slate-300 hover:text-foreground">Log in</button>
                  <Button size="sm" onClick={() => openAuthModal('signup')} className="bg-gradient-to-r from-green-500 to-purple-500 text-white px-3 py-1.5">Sign up</Button>
                </div>
              </nav>
            </div>
          </header>

          {/* Prism background with overlay text */}
          <div style={{ width: '100%', height: '100vh', position: 'relative' }} className="w-full max-w-full mx-auto">
            <Prism
              animationType="rotate"
              timeScale={0.5}
              height={3.5}
              baseWidth={5.5}
              scale={3.6}
              hueShift={0}
              colorFrequency={1}
              noise={0.5}
              glow={1}
            />

            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white">
                Track smart, spend smarter with{' '}
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Budgefy</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-6">
                A modern, intuitive expense tracker that helps you analyze patterns, control spending, and build smarter financial habits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={() => openAuthModal('signup')}
                  className="bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-600 hover:to-purple-600 text-white shadow-lg px-8 py-3 text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-sm text-slate-300 hover:text-foreground"
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </section>

      {/* Features Section */}
  <section id="features" className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Powerful Features for Smart Money Management
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
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
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border border-slate-700 bg-slate-800/50 backdrop-blur-sm group-hover:bg-slate-800">
                  <CardContent className="p-8 text-slate-100">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {feature.points.map((point, idx) => (
                        <li key={idx} className="flex items-start text-slate-300 group-hover:text-white transition-colors duration-300">
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
  <section className="py-20 px-4 bg-slate-900">
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
    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
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
            <p className="text-slate-300 text-lg">
              And many more categories with automatic smart detection! 🤖
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-slate-700 bg-slate-900">
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
              <p className="text-slate-300 max-w-xs">
                Making personal finance management simple, intuitive, and powerful for everyone.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Quick Links</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => scrollToSection("home")}
                  className="block text-slate-300 hover:text-white transition-colors text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection("features")}
                  className="block text-slate-300 hover:text-white transition-colors text-left"
                >
                  Features
                </button>
                <a 
                  href="/analytics"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Analytics
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Connect</h4>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors p-2 rounded-lg"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors p-2 rounded-lg"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-300 mb-4 md:mb-0">
                © 2025 Budgefy. Built with ❤️ by{" "}
                <span className="font-medium text-white">Joshh</span>. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Terms of Service</a>
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
    </motion.div>
  )
}

export default LandingPage
