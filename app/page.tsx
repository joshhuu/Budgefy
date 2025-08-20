
"use client"
import React from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import LandingPage from "@/components/landing-page"
import Preloader from "@/components/preloader"

export default function HomePage() {
  const { user, loading, isConfigured } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground variant="particles" />
        <Preloader />
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

  // Show landing page for non-authenticated users
  return <LandingPage />
}
