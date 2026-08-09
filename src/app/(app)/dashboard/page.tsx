"use client"

import { motion } from "framer-motion"

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

  const [isScanning, setIsScanning] = useState(false)

  const handleRunScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
    }, 2000)
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
          <Button variant="secondary" className="font-semibold shadow-sm" asChild>
            <Link href="?modal=new">
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Link>
          </Button>
          <Button variant="default" className="font-semibold shadow-md" onClick={handleRunScan} disabled={isScanning}>
            {isScanning ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ShieldCheck className="mr-2 h-4 w-4" />
            )}
            {isScanning ? "Scanning..." : "Run Scan"}
          </Button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Main Health Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="col-span-1 md:col-span-2 flex"
        >
        <Card className="flex-1 bg-gradient-to-br from-card to-card/50 flex flex-col justify-between shadow-lg shadow-emerald-500/5 border-emerald-500/20">
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
        </motion.div>
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
