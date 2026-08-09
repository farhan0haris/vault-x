"use client"

import { Search, Bell, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface TopNavProps {
  onMenuClick?: () => void
}

export function TopNav({ onMenuClick }: TopNavProps) {
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
        <span className="font-heading text-xl font-bold">VaultX</span>
      </div>

      <div className="hidden flex-1 items-center space-x-4 lg:flex">
        {/* Placeholder for left-aligned items on desktop if needed */}
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative hidden w-64 sm:block lg:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search vault..."
            className="pl-9 bg-card border-border/50 focus-visible:ring-primary rounded-full h-9"
          />
        </div>
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground rounded-full"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <button className="h-8 w-8 overflow-hidden rounded-full border border-border/50 ring-2 ring-transparent transition-all hover:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ml-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=001B2A"
            alt="Profile Avatar"
            className="h-full w-full object-cover bg-card"
          />
        </button>
      </div>
    </header>
  )
}
