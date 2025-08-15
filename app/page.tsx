
"use client"
import React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, LogIn, UserPlus } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export default function HomePage() {
  const { user, loading, isConfigured } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground variant="particles" />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <Card className="w-96 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
            <CardContent className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground variant="starfield" />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Firebase Setup Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Firebase is not properly configured. Please set up your environment variables to use this app.
                </AlertDescription>
              </Alert>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-2">Required environment variables:</p>
                <ul className="space-y-1 text-xs">
                  <li>• NEXT_PUBLIC_FIREBASE_API_KEY</li>
                  <li>• NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
                  <li>• NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
                  <li>• NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</li>
                  <li>• NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</li>
                  <li>• NEXT_PUBLIC_FIREBASE_APP_ID</li>
                </ul>
              </div>
              <p className="text-xs text-muted-foreground">
                Create a Firebase project and add these variables to your Project Settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Redirect to dashboard if user is logged in
  React.useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground variant="waves" />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expense Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Track your expenses effortlessly with smart categorization and insightful analytics.
            </p>
            <div className="space-y-3">
              <Button onClick={() => router.push("/login")} className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              <Button onClick={() => router.push("/signup")} variant="outline" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
