"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@radix-ui/react-switch"
import { Shield, Moon, Bell, Key, Smartphone, Mail } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [twoFactor, setTwoFactor] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [autoLock, setAutoLock] = useState(true)

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage your vault preferences and security.</p>
      </div>

      <div className="grid gap-6">
        
        {/* Security Settings */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> Security
            </CardTitle>
            <CardDescription>Advanced security features to protect your vault.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Two-Factor Authentication (2FA)</label>
                </div>
                <p className="text-xs text-muted-foreground">Require an extra code when logging in.</p>
              </div>
              <Switch 
                checked={twoFactor} 
                onCheckedChange={setTwoFactor}
                className="w-11 h-6 bg-muted-foreground/30 rounded-full relative data-[state=checked]:bg-primary transition-colors cursor-pointer"
              >
                <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${twoFactor ? 'translate-x-5' : 'translate-x-1'}`} />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Auto-Lock Vault</label>
                </div>
                <p className="text-xs text-muted-foreground">Lock the vault automatically after 15 minutes of inactivity.</p>
              </div>
              <Switch 
                checked={autoLock} 
                onCheckedChange={setAutoLock}
                className="w-11 h-6 bg-muted-foreground/30 rounded-full relative data-[state=checked]:bg-primary transition-colors cursor-pointer"
              >
                <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${autoLock ? 'translate-x-5' : 'translate-x-1'}`} />
              </Switch>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" /> Appearance
            </CardTitle>
            <CardDescription>Customize how VaultX looks.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Dark Mode</label>
                <p className="text-xs text-muted-foreground">Switch between light and dark themes.</p>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={(c) => setTheme(c ? 'dark' : 'light')}
                className="w-11 h-6 bg-muted-foreground/30 rounded-full relative data-[state=checked]:bg-primary transition-colors cursor-pointer"
              >
                <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-5' : 'translate-x-1'}`} />
              </Switch>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> Notifications
            </CardTitle>
            <CardDescription>Manage how we communicate with you.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Security Alerts</label>
                </div>
                <p className="text-xs text-muted-foreground">Receive emails about new logins from unrecognized devices.</p>
              </div>
              <Switch 
                checked={emailAlerts} 
                onCheckedChange={setEmailAlerts}
                className="w-11 h-6 bg-muted-foreground/30 rounded-full relative data-[state=checked]:bg-primary transition-colors cursor-pointer"
              >
                <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${emailAlerts ? 'translate-x-5' : 'translate-x-1'}`} />
              </Switch>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
