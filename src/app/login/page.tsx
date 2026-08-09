import Link from "next/link"
import { Shield, Mail, Lock, EyeOff, KeyRound } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 w-full max-w-md space-y-8 animate-in slide-in-from-bottom-4 duration-700 fade-in">
        <div className="text-center">
          <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground">
            VaultX
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">High-Security Mode</p>
        </div>

        <Card className="border-border/50 bg-card shadow-2xl">
          <CardContent className="pt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="agent@vaultx.dev"
                  className="pl-9 bg-background border-border/50 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                Master Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••••••••••"
                  className="pl-9 pr-9 bg-background border-border/50 h-12 tracking-widest text-lg placeholder:tracking-normal placeholder:text-sm"
                />
                <button type="button" aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <EyeOff className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button asChild className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20">
              <Link href="/dashboard" className="flex items-center justify-center space-x-2">
                <KeyRound className="h-5 w-5" />
                <span>Unlock Vault</span>
              </Link>
            </Button>
          </CardContent>
          <CardFooter className="flex justify-between pb-8 px-8">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot Password?
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Create Account
            </Link>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center space-x-2 text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-70">
          <Lock className="h-4 w-4" />
          <span>End-to-End Encrypted</span>
        </div>
      </div>
    </div>
  )
}
