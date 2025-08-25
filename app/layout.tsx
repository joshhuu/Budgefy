import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { RouteChangeIndicator } from "@/components/route-change-indicator"
import GlowBackground from "@/components/glow-background"

export const metadata: Metadata = {
  title: "Budgefy - Personal Expense Tracker",
  description: "Track your expenses effortlessly with smart categorization and insightful analytics",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
  {/* Inter font for the whole project */}
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>{`
html {
  font-family: 'Poppins', ui-sans-serif, system-ui, sans-serif;
}
  `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <RouteChangeIndicator />
          <div className="relative min-h-screen">
            <GlowBackground />
            <AuthProvider>{children}</AuthProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
