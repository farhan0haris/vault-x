"use client"

import Link from "next/link"
import { ShieldCheck, Plus, MoreHorizontal, CreditCard, FileText, Loader2, Code2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CircularProgress } from "@/components/ui/circular-progress"
import { useState, useEffect } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/providers/AuthProvider"

interface VaultItem {
  id: string
  type: "login" | "card" | "note"
  title: string
  username?: string
  cardholder?: string
  createdAt: number
}

export default function Dashboard() {
  const { user } = useAuth()
  const [recentItems, setRecentItems] = useState<VaultItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "vaultItems"), 
      where("userId", "==", user.uid)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VaultItem))
      // Sort client-side to avoid composite index requirement
      itemsData.sort((a, b) => b.createdAt - a.createdAt)
      setRecentItems(itemsData.slice(0, 4))
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])



  const getIcon = (type: string) => {
    if (type === "card") return CreditCard
    if (type === "note") return FileText
    return Code2
  }

  return (
    <div className="flex flex-col space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight">
            Overview
          </h1>
          <p className="mt-2 text-sm font-medium tracking-wide text-muted-foreground">
            Welcome back. Your vault is currently <span className="text-emerald-500 font-bold">Optimal</span>.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="font-semibold shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
          <Button variant="default" className="font-semibold shadow-md">
            <ShieldCheck className="mr-2 h-4 w-4" /> Run Scan
          </Button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[140px]">
        
        {/* Main Health Widget (Spans 2 cols, 2 rows) */}
        <Card className="md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-card to-card/50 flex flex-col justify-between">
          <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-heading text-2xl font-semibold">Security Score</h2>
                <p className="text-muted-foreground text-sm mt-1 max-w-[200px]">
                  Based on password strength and 2FA usage.
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
            
            <div className="flex items-end gap-6 mt-8">
              <CircularProgress value={85} size={120} className="drop-shadow-[0_0_20px_rgba(34,197,94,0.2)]" />
              <div className="flex flex-col space-y-2 mb-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> 192 Strong
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> 53 Weak
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary" /> 3 Compromised
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Items (Spans 1 col, 1 row) */}
        <Card className="col-span-1 row-span-1 flex flex-col justify-center">
          <CardContent className="p-6">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-1">Total Items</p>
            <p className="font-heading text-4xl font-bold">248</p>
            {/* Mini Chart Mock */}
            <div className="mt-4 flex items-end gap-1 h-8 opacity-50">
              {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Device (Spans 1 col, 2 rows) */}
        <Card className="col-span-1 row-span-2 hidden lg:flex flex-col">
          <CardContent className="p-6 flex flex-col h-full">
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-6">Recent Logins</h3>
            <div className="flex-1 space-y-6">
              {[
                { device: "MacBook Pro 16\"", location: "San Francisco, CA", time: "2m ago", active: true },
                { device: "iPhone 15 Pro", location: "San Francisco, CA", time: "4h ago", active: false },
                { device: "Chrome / Windows", location: "New York, NY", time: "2d ago", active: false },
              ].map((login, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 h-2 w-2 rounded-full ${login.active ? 'bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-muted-foreground/30'}`} />
                  <div>
                    <p className="text-sm font-semibold">{login.device}</p>
                    <p className="text-xs text-muted-foreground">{login.location}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{login.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Indicators (Spans 1 col, 1 row) */}
        <Card className="col-span-1 row-span-1 flex flex-col justify-center bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">Risk Alerts</p>
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <p className="font-heading text-4xl font-bold text-foreground mt-1">3</p>
            <p className="text-sm font-medium text-muted-foreground mt-2">Passwords found in recent data breaches.</p>
          </CardContent>
        </Card>

      </div>

      {/* Recent Items List */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-semibold">Recently Added</h2>
          <Button variant="link" className="text-sm font-semibold text-muted-foreground hover:text-foreground" asChild>
            <Link href="/vault">View All</Link>
          </Button>
        </div>

        <div className="rounded-[20px] bg-card border border-border/50 shadow-sm overflow-hidden">
          <div className="grid grid-cols-[1fr_2fr_1fr_auto] gap-4 p-5 text-xs font-semibold tracking-wider text-muted-foreground uppercase border-b border-border/50 bg-card/50">
            <div>Name</div>
            <div>Username</div>
            <div>Password</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y divide-border/50 min-h-[200px]">
            {loading ? (
              <div className="flex h-32 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : recentItems.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center text-center">
                <p className="text-sm text-muted-foreground">No items in your vault yet.</p>
              </div>
            ) : (
              recentItems.map((item) => {
                const Icon = getIcon(item.type)
                return (
                  <div key={item.id} className="grid grid-cols-[1fr_2fr_1fr_auto] gap-4 p-5 items-center hover:bg-accent/30 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-background border border-border/50 text-xs font-bold shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-semibold flex items-center gap-2">
                        {item.title}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {item.username || item.cardholder || '-'}
                    </div>
                    <div className="flex items-center text-muted-foreground tracking-[0.2em] text-xs">
                      ••••••••••••
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-[10px] bg-background border border-border/50 shadow-sm hover:bg-accent">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
