"use client"

import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Lock,
  Star,
  Clock,
  Trash2,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AddPasswordModal } from "@/components/vault/AddPasswordModal"
import { auth } from "@/lib/firebase"

const navItems = [
  { name: "All Items", href: "/vault", icon: Lock },
  { name: "Favorites", href: "/vault?filter=favorites", icon: Star },
  { name: "Recent", href: "/vault?filter=recent", icon: Clock },
  { name: "Trash", href: "/vault?filter=trash", icon: Trash2 },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const isModalOpen = searchParams.get("modal") === "new"

  const openModal = () => {
    const params = new URLSearchParams(searchParams)
    params.set("modal", "new")
    router.replace(`${pathname}?${params.toString()}`)
  }

  const closeModal = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("modal")
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div
      className={cn(
        "flex h-screen w-[260px] flex-col bg-card/80 backdrop-blur-xl border-r border-border transition-all duration-300 lg:m-4 lg:h-[calc(100vh-2rem)] lg:rounded-[24px] lg:border lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        className
      )}
    >
      <div className="flex flex-col p-6 space-y-8">
        <div className="flex flex-col space-y-1">
          <Link href="/dashboard" className="flex items-center space-x-2 text-foreground">
            <img src="/logo.png" alt="VaultX Logo" className="h-6 w-auto object-contain" />
            <span className="font-heading text-2xl font-bold tracking-tight">
              VaultX
            </span>
          </Link>
          <span className="text-xs text-muted-foreground font-medium">
            Secure Vault
          </span>
          <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase mt-1">
            High-Security Mode
          </span>
        </div>

        <Button className="w-full justify-start shadow-lg shadow-primary/20" onClick={openModal}>
          <div className="space-x-2 flex items-center">
            <Plus className="h-4 w-4" />
            <span>Add New Password</span>
          </div>
        </Button>
      </div>

      <AddPasswordModal isOpen={isModalOpen} onClose={closeModal} />

      <div className="flex-1 overflow-y-auto py-2">
        <nav className="flex flex-col space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-accent"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <div className="relative z-10 flex items-center space-x-3">
                  <item.icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span>{item.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border/50">
        <nav className="flex flex-col space-y-1">
          <Link
            href="/settings"
            className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <Link
            href="/help"
            className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </Link>
          <button 
            onClick={() => auth.signOut()} 
            className="flex w-full items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring mt-4"
          >
            <LogOut className="h-4 w-4" />
            <span>Lock Vault</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
