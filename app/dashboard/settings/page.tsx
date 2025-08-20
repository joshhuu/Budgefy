"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AUTH_REDIRECT_PATH } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { updateProfile } from "firebase/auth"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function SettingsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
  router.push(AUTH_REDIRECT_PATH)
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }


  const [name, setName] = useState(user?.displayName || "")
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess(false)
    try {
      if (!user) throw new Error("No user found")
      await updateProfile(user, { displayName: name })
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-6">
              <Avatar name={name || user.email || "User"} size={64} />
              <div>
                <div className="font-semibold">Avatar Preview</div>
                <div className="text-xs text-muted-foreground">(Based on your name)</div>
              </div>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4 max-w-xs">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Display Name</label>
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={saving}
                />
              </div>
              <Button type="submit" disabled={saving || !name.trim()}>
                {saving ? "Saving..." : "Update Name"}
              </Button>
              {success && <p className="text-green-600 text-sm">Name updated!</p>}
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
