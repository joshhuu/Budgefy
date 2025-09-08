"use client"

import React from "react"
import { motion } from "framer-motion"
import { Wallet } from "lucide-react"

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="flex items-center space-x-3 bg-card/70 border border-muted rounded-xl px-5 py-3 shadow-lg"
        role="status"
        aria-live="polite"
      >
        <div className="animate-spin rounded-full p-1">
          <Wallet className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="text-sm font-medium">Budgefy</div>
          <div className="text-xs text-muted-foreground">Loading…</div>
        </div>
      </motion.div>
    </div>
  )
}
