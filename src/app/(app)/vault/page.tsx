"use client"

import { toast } from "sonner"
import { motion } from "framer-motion"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/components/providers/AuthProvider"
import {
  Star,
  Copy,
  Search,
  Code2,
  CreditCard,
  FileText,
  Lock,
  Trash2,
  Loader2,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { collection, onSnapshot, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface VaultItem {
  id: string
  userId?: string
  type: "login" | "card" | "note"
  title: string
  username?: string
  password?: string
  cardholder?: string
  cardNumber?: string
  exp?: string
  content?: string
  isFavorite: boolean
  isTrash: boolean
  createdAt: number
}

export default function VaultPage() {
  return (
    <Suspense fallback={
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <VaultPageContent />
    </Suspense>
  )
}

function VaultPageContent() {
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") || "all" // all, favorites, recent, trash
  const { user } = useAuth()

  const [items, setItems] = useState<VaultItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("All")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

  useEffect(() => {
    const q = searchParams.get("q")
    if (q !== null) {
      setSearchQuery(q)
    }
  }, [searchParams])

  useEffect(() => {
    if (!user) return;
    
    const q = query(collection(db, "vaultItems"), where("userId", "==", user.uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VaultItem))
      itemsData.sort((a, b) => b.createdAt - a.createdAt)
      setItems(itemsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  const toggleFavorite = async (id: string, current: boolean) => {
    await updateDoc(doc(db, "vaultItems", id), { isFavorite: !current })
  }

  const toggleTrash = async (id: string, current: boolean) => {
    await updateDoc(doc(db, "vaultItems", id), { isTrash: !current })
  }

  const deleteItemPermanently = async (id: string) => {
    await deleteDoc(doc(db, "vaultItems", id))
  }

  const copyToClipboard = (text?: string, label?: string) => {
    if (text) {
      navigator.clipboard.writeText(text)
      toast.success(`${label || 'Item'} copied to clipboard`)
    }
  }

  // Filter items
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now()
  const filteredItems = items.filter(item => {
    // 1. Sidebar filter
    if (filter === "favorites" && !item.isFavorite) return false
    if (filter === "recent" && (now - item.createdAt > 7 * 24 * 60 * 60 * 1000)) return false // Last 7 days
    if (filter === "trash" && !item.isTrash) return false
    if (filter !== "trash" && item.isTrash) return false // Don't show trash items in other views

    // 2. Tab filter
    if (activeTab === "Logins" && item.type !== "login") return false
    if (activeTab === "Cards" && item.type !== "card") return false
    if (activeTab === "Notes" && item.type !== "note") return false

    // 3. Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const titleMatch = item.title.toLowerCase().includes(q)
      const userMatch = (item.username || item.cardholder || "").toLowerCase().includes(q)
      if (!titleMatch && !userMatch) return false
    }

    return true
  })

  const getIcon = (type: string) => {
    if (type === "card") return CreditCard
    if (type === "note") return FileText
    return Code2 // default for login
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tight capitalize">
            {filter === "all" ? "All Items" : filter}
          </h1>
          <p className="mt-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
            {filteredItems.length} secure items
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border/50 h-10"
            />
          </div>
          <div className="flex bg-card border border-border/50 p-1 rounded-md">
            {["All", "Logins", "Cards", "Notes"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "bg-accent text-foreground" : "text-muted-foreground"}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-border bg-card/50 text-center">
          <div className="rounded-full bg-accent p-3">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold">No items found</h3>
            <p className="text-sm text-muted-foreground">Add a new password or try a different filter.</p>
          </div>
        </div>
      ) : (
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {filteredItems.map((item) => {
            const Icon = getIcon(item.type)
            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02 }}
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border/50 shadow-inner">
                        <Icon className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                        <span className="inline-flex items-center rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                          {item.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleFavorite(item.id, item.isFavorite)}
                        className={`h-8 w-8 ${item.isFavorite ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}
                      >
                        <Star className={`h-4 w-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                      {filter === "trash" ? (
                        <Button variant="ghost" size="icon" onClick={() => deleteItemPermanently(item.id)} className="h-8 w-8 text-red-500 hover:bg-red-500/10 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" onClick={() => toggleTrash(item.id, item.isTrash)} className="h-8 w-8 text-muted-foreground hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    {item.type === "login" && (
                      <>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Username</p>
                          <div className="flex items-center justify-between rounded-lg bg-background border border-border/50 px-3 py-2">
                            <span className="text-sm">{item.username || '-'}</span>
                            <Copy className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => copyToClipboard(item.username, "Username")} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Password</p>
                          <div className="flex items-center justify-between rounded-lg bg-background border border-border/50 px-3 py-2">
                            <span className="text-xs tracking-[0.2em] text-muted-foreground">••••••••••••••</span>
                            <Copy className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => copyToClipboard(item.password, "Password")} />
                          </div>
                        </div>
                      </>
                    )}
                    {item.type === "card" && (
                      <>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Cardholder</p>
                          <p className="text-sm">{item.cardholder || '-'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Number</p>
                          <div className="flex items-center justify-between rounded-lg bg-background border border-border/50 px-3 py-2">
                            <span className="font-mono text-sm tracking-widest">{item.cardNumber || '-'}</span>
                            <Copy className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => copyToClipboard(item.cardNumber, "Card Number")} />
                          </div>
                        </div>
                      </>
                    )}
                    {item.type === "note" && (
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Content</p>
                        <div className="rounded-lg bg-background border border-border/50 px-3 py-2 group-hover:bg-accent/50 transition-colors">
                          <pre className="text-xs text-muted-foreground font-mono overflow-hidden text-ellipsis whitespace-nowrap">
                            {item.content || 'Empty note'}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4 text-xs">
                  <div className="flex items-center space-x-2">
                    {item.type === "login" && (
                      <>
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="font-medium text-emerald-500">Strong</span>
                      </>
                    )}
                    {item.type === "card" && (
                      <span className="text-muted-foreground font-medium">Exp: {item.exp || 'N/A'}</span>
                    )}
                    {item.type === "note" && (
                      <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}
