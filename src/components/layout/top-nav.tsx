"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Bell, Menu, ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useAuth } from "@/components/providers/AuthProvider"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface TopNavProps {
  onMenuClick?: () => void
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [avatarSeed, setAvatarSeed] = useState("Alex")

  useEffect(() => {
    async function fetchAvatar() {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists() && docSnap.data().avatarSeed) {
            setAvatarSeed(docSnap.data().avatarSeed)
          } else {
            setAvatarSeed(user.uid)
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchAvatar()
  }, [user])

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="mr-2 text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="VaultX Logo" className="h-6 w-auto object-contain" />
          <span className="font-heading text-xl font-bold">VaultX</span>
        </div>
      </div>

      <div className="hidden flex-1 items-center space-x-4 lg:flex">
        {/* Placeholder for left-aligned items on desktop if needed */}
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <form 
          className="relative hidden w-64 sm:block lg:w-96"
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const query = formData.get("search")
            if (query) {
              router.push(`/vault?q=${encodeURIComponent(query.toString())}`)
            }
          }}
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="search"
            type="search"
            placeholder="Search vault..."
            className="pl-9 bg-card border-border/50 focus-visible:ring-primary rounded-full h-9"
          />
        </form>
        <ThemeToggle />
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground rounded-full relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              align="end" 
              className="w-80 rounded-xl border border-border/50 bg-card/95 backdrop-blur-md p-2 shadow-xl animate-in slide-in-from-top-2 z-50"
            >
              <div className="px-2 py-1.5 font-semibold text-sm">Notifications</div>
              <DropdownMenu.Separator className="h-px bg-border/50 my-1" />
              
              <DropdownMenu.Item className="flex items-start gap-3 rounded-md px-2 py-2 outline-none hover:bg-accent cursor-pointer transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Welcome to VaultX!</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Your secure password manager is ready. Add your first item.</p>
                </div>
              </DropdownMenu.Item>
              
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <Link href="/profile" className="h-8 w-8 overflow-hidden rounded-full border border-border/50 ring-2 ring-transparent transition-all hover:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ml-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${avatarSeed}&backgroundColor=transparent`}
            alt="Profile Avatar"
            className="h-full w-full object-cover bg-accent"
          />
        </Link>
      </div>
    </header>
  )
}
