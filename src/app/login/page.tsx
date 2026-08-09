"use client"

import { useState } from "react"
import { Lock, Loader2, ArrowRight } from "lucide-react"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      router.push("/dashboard")
    } catch (error) {
      console.error("Authentication failed", error)
      alert("Failed to authenticate with Google. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 w-full max-w-md space-y-8 animate-in slide-in-from-bottom-4 duration-700 fade-in">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-primary/10 text-primary mb-4 ring-1 ring-primary/20 shadow-2xl shadow-primary/20">
            <img src="/logo.png" alt="VaultX Logo" className="h-12 w-auto object-contain drop-shadow-md" />
          </div>
          <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground">
            VaultX
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">High-Security Mode</p>
        </div>

        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-primary"></div>
          <CardContent className="pt-10 pb-6 space-y-8 flex flex-col items-center">
            
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Welcome Back, Agent</h2>
              <p className="text-sm text-muted-foreground">Authenticate to unlock your encrypted vault.</p>
            </div>

            <Button 
              onClick={handleGoogleSignIn} 
              disabled={loading}
              className="w-full h-14 text-base font-semibold shadow-lg shadow-primary/20 flex items-center justify-center space-x-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Sign in with Google</span>
                  <ArrowRight className="h-4 w-4 ml-2 opacity-50" />
                </>
              )}
            </Button>
            
          </CardContent>
          <CardFooter className="flex justify-center pb-8 bg-black/10 border-t border-border/50 pt-4">
            <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase opacity-70">
              <Lock className="h-3 w-3" />
              <span>End-to-End Encrypted</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
