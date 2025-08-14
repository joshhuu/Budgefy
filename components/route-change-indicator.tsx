"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function RouteChangeIndicator() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 600) // show at least 600ms
    return () => clearTimeout(timeout)
  }, [pathname])

  return loading ? (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: 3,
      zIndex: 9999,
      background: "linear-gradient(90deg, #6366f1 0%, #a21caf 100%)",
      animation: "route-progress 0.6s linear infinite alternate"
    }} />
  ) : null
}

// Add a simple keyframes animation for shimmer effect
// Add this to your global CSS:
// @keyframes route-progress { 0% { opacity: 0.7; } 100% { opacity: 1; } }
