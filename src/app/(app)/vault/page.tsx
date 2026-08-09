import {
  MoreVertical,
  Star,
  Copy,
  Search,
  Code2,
  MessageSquare,
  CreditCard,
  FileText,
  Lock,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function VaultPage() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tight">
            All Items
          </h1>
          <p className="mt-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
            142 secure items stored
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vault..."
              className="pl-9 bg-card border-border/50 h-10"
            />
          </div>
          <div className="flex bg-card border border-border/50 p-1 rounded-md">
            {["All", "Logins", "Cards", "Notes"].map((tab, i) => (
              <Button
                key={tab}
                variant={i === 0 ? "secondary" : "ghost"}
                size="sm"
                className={i === 0 ? "bg-accent text-foreground" : "text-muted-foreground"}
              >
                {tab}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="bg-card border-border/50">
            A-Z
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            type: "login",
            title: "GitHub",
            user: "dev_master_99@gmail.com",
            icon: Code2,
            updated: "Updated 2d ago",
            status: "Strong",
            statusColor: "text-emerald-500",
            bgStatus: "bg-emerald-500",
          },
          {
            type: "login",
            title: "Twitter",
            user: "@cyber_ninja",
            icon: MessageSquare,
            updated: "Updated 1yr ago",
            status: "Weak",
            statusColor: "text-amber-500",
            bgStatus: "bg-amber-500",
          },
          {
            type: "card",
            title: "Chase Corp",
            user: "John D. Doe",
            number: "•••• •••• •••• 4242",
            exp: "12/26",
            icon: CreditCard,
            updated: "Added 3mo ago",
          },
          {
            type: "note",
            title: "Server Keys",
            content: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC...\nProduction DB: 192.168.1.108",
            icon: FileText,
            updated: "Updated just now",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border/50 shadow-inner">
                    <item.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                    <span className="inline-flex items-center rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                      {item.type}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {item.type === "login" && (
                  <>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Username</p>
                      <p className="text-sm">{item.user}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Password</p>
                      <div className="flex items-center justify-between rounded-lg bg-background border border-border/50 px-3 py-2">
                        <span className="text-xs tracking-[0.2em] text-muted-foreground">••••••••••••••</span>
                        <Copy className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                      </div>
                    </div>
                  </>
                )}
                {item.type === "card" && (
                  <>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Cardholder</p>
                      <p className="text-sm">{item.user}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Number</p>
                      <div className="flex items-center justify-between rounded-lg bg-background border border-border/50 px-3 py-2">
                        <span className="font-mono text-sm tracking-widest">{item.number}</span>
                        <Copy className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                      </div>
                    </div>
                  </>
                )}
                {item.type === "note" && (
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Content</p>
                    <div className="rounded-lg bg-background border border-border/50 px-3 py-2">
                      <pre className="text-xs text-muted-foreground font-mono overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.content}
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
                    <span className={`h-2 w-2 rounded-full ${item.bgStatus}`} />
                    <span className={`font-medium ${item.statusColor}`}>{item.status}</span>
                  </>
                )}
                {item.type === "card" && (
                  <span className="text-muted-foreground font-medium">Exp: {item.exp}</span>
                )}
                {item.type === "note" && (
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </div>
              <span className="text-muted-foreground">{item.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
