import Link from "next/link"
import { Shield, EyeOff, Key, MonitorSmartphone, Activity, ArrowRight, ShieldCheck, Lock, Zap, Search, User, FolderLock, RefreshCw, Star, Clock, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border/50 bg-[rgba(255,255,255,0.82)] dark:bg-background/80 px-6 lg:px-12 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Lock className="h-6 w-6 text-foreground" />
          <span className="font-heading text-xl font-bold">VaultX</span>
        </div>
        <nav className="hidden items-center space-x-8 text-sm font-medium lg:flex text-muted-foreground uppercase tracking-widest text-[10px]">
          <Link href="/dashboard" className="hover:text-foreground transition-colors duration-200">Dashboard</Link>
          <a href="#product-preview" className="hover:text-foreground transition-colors duration-200">Preview</a>
          <a href="#features" className="hover:text-foreground transition-colors duration-200">Features</a>
          <Link href="/vault" className="hover:text-foreground transition-colors duration-200">Vaults</Link>
        </nav>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />
          <Button variant="ghost" asChild className="hidden sm:inline-flex text-xs font-bold tracking-widest text-muted-foreground uppercase">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="shadow-lg shadow-primary/20">
            <Link href="/login">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-28 pb-16 lg:pt-32 lg:pb-20 lg:px-12 flex flex-col items-center">
          {/* Ambient Lighting & Faint Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
          
          <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            {/* Left Content (45%) */}
            <div className="w-full lg:w-[45%] space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center rounded-full border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground shadow-sm">
                <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                Military-Grade Protection
              </div>
              
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-[650px] text-foreground">
                The safest place for your digital identity.
              </h1>
              
              <p className="text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-lg font-medium">
                VaultX employs absolute zero-knowledge, end-to-end encryption. We don't have the keys—only you do.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button size="lg" className="w-full sm:w-auto font-semibold shadow-[0_0_20px_rgba(255,59,48,0.2)]" asChild>
                  <Link href="/login">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold" asChild>
                  <a href="#product-preview">See Live Demo</a>
                </Button>
              </div>
              
              <div className="pt-8 flex flex-wrap items-center gap-x-0 gap-y-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                <span className="pr-4 flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-foreground" /> AES-256</span>
                <span className="px-4 flex items-center gap-2 border-l border-border"><EyeOff className="h-3.5 w-3.5 text-foreground" /> Zero-Knowledge</span>
                <span className="pl-4 flex items-center gap-2 border-l border-border"><MonitorSmartphone className="h-3.5 w-3.5 text-foreground" /> Cross-Platform</span>
              </div>
            </div>

            {/* Right 3D Composition (55%) */}
            <div className="relative w-full lg:w-[55%] h-[400px] lg:h-[500px] hidden md:block pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Invisible central anchor */}
                <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                  
                  {/* Floating Vault Cube */}
                  <div className="absolute -top-12 -left-8 animate-[bounce_8s_ease-in-out_infinite]">
                    <div className="bg-gradient-to-br from-card/80 to-background/50 border-[0.5px] border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] h-[140px] w-[140px] rounded-[32px] flex items-center justify-center rotate-[-8deg] backdrop-blur-2xl">
                      <div className="absolute inset-0 bg-primary/5 rounded-[32px] mix-blend-overlay" />
                      <Lock className="h-12 w-12 text-primary drop-shadow-[0_0_15px_rgba(255,59,48,0.6)]" />
                    </div>
                  </div>

                  {/* Metallic Security Key */}
                  <div className="absolute top-8 -right-16 animate-[bounce_10s_ease-in-out_infinite_reverse]">
                    <div className="bg-gradient-to-tr from-secondary/90 to-card/60 border border-white/5 shadow-[0_15px_30px_rgba(0,27,42,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] h-[110px] w-[110px] rounded-[24px] flex items-center justify-center rotate-[15deg] backdrop-blur-xl">
                      <Key className="h-10 w-10 text-foreground/90 drop-shadow-md" />
                    </div>
                  </div>

                  {/* Glass Shield */}
                  <div className="absolute -bottom-16 left-6 animate-[bounce_12s_ease-in-out_infinite]">
                    <div className="bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] h-[120px] w-[120px] rounded-[28px] flex items-center justify-center rotate-[-12deg] backdrop-blur-3xl">
                      <ShieldCheck className="h-11 w-11 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                    </div>
                  </div>

                  {/* Minimal Glowing Ring */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-white/5 animate-[spin_30s_linear_infinite_reverse]" />
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* ================================================================ */}
        {/* 1. PRODUCT PREVIEW                                               */}
        {/* ================================================================ */}
        <section id="product-preview" className="px-6 py-16 lg:py-20 lg:px-12 bg-background relative overflow-hidden scroll-mt-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
          
          <div className="mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-14 space-y-4">
              <div className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground shadow-sm">
                <MonitorSmartphone className="mr-2 h-3.5 w-3.5 text-primary" />
                Product Preview
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                See VaultX in action
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                A unified workspace for all your credentials. Organized, searchable, and always encrypted.
              </p>
            </div>

            {/* Realistic App Preview */}
            <div className="rounded-[20px] border border-border bg-card shadow-[0_4px_14px_rgba(15,23,42,0.05)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] overflow-hidden hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] transition-all duration-500">
              {/* Window Chrome */}
              <div className="h-11 border-b border-border/60 bg-muted/40 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                  <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="mx-auto flex h-7 w-72 items-center justify-center rounded-lg bg-card px-4 text-[11px] font-medium text-muted-foreground border border-border/50">
                  <Lock className="mr-2 h-3 w-3" /> app.vaultx.com
                </div>
              </div>
              
              {/* App Body */}
              <div className="flex min-h-[420px]">
                {/* Mini Sidebar */}
                <div className="hidden md:flex flex-col w-[220px] border-r border-border/50 bg-muted/20 p-5">
                  <div className="flex items-center gap-2 mb-6">
                    <Lock className="h-5 w-5 text-foreground" />
                    <span className="font-heading text-lg font-bold">VaultX</span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { label: "All Items", icon: Lock, active: true },
                      { label: "Favorites", icon: Star, active: false },
                      { label: "Recent", icon: Clock, active: false },
                      { label: "Categories", icon: FolderLock, active: false },
                      { label: "Settings", icon: Settings, active: false },
                    ].map((item) => (
                      <div key={item.label} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${item.active ? 'bg-accent text-foreground' : 'text-muted-foreground'}`}>
                        <item.icon className={`h-4 w-4 ${item.active ? 'text-primary' : ''}`} />
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-6">
                    <div className="flex items-center gap-3 px-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 border border-border flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Alex D.</p>
                        <p className="text-[10px] text-muted-foreground">Pro Plan</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 p-6 md:p-8 space-y-6">
                  {/* Search Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-3 h-11 rounded-xl border border-border bg-background px-4">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Search vault...</span>
                      <span className="ml-auto text-[10px] text-muted-foreground bg-muted rounded-md px-2 py-0.5 font-mono border border-border/50">⌘K</span>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                    {/* Vault List */}
                    <div className="space-y-2">
                      {[
                        { name: "Google Workspace", user: "alex@company.com", icon: "G", health: "strong" },
                        { name: "GitHub Enterprise", user: "alex.dev", icon: "GH", health: "strong" },
                        { name: "Stripe Dashboard", user: "alex@startup.io", icon: "S", health: "weak" },
                        { name: "AWS Production", user: "admin-root", icon: "AWS", health: "strong" },
                        { name: "Figma Pro", user: "alex.design@co.io", icon: "F", health: "strong" },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-3.5 rounded-xl border border-border/50 bg-background/60 hover:bg-accent/40 transition-all group/item cursor-pointer">
                          <div className="flex items-center gap-3.5">
                            <div className="h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center text-xs font-bold shadow-sm group-hover/item:scale-105 transition-transform">
                              {item.icon}
                            </div>
                            <div>
                              <p className="font-semibold text-sm flex items-center gap-2">
                                {item.name}
                                <span className={`h-1.5 w-1.5 rounded-full ${item.health === 'strong' ? 'bg-success' : 'bg-warning'}`} />
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">{item.user}</p>
                            </div>
                          </div>
                          <span className="text-muted-foreground/40 tracking-[0.2em] text-xs font-mono">••••••••</span>
                        </div>
                      ))}
                    </div>

                    {/* Side Widgets */}
                    <div className="hidden lg:flex flex-col gap-5">
                      {/* Security Score */}
                      <div className="rounded-2xl border border-border bg-background/60 p-6 flex flex-col items-center text-center">
                        <div className="relative h-20 w-20 flex items-center justify-center mb-4">
                          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                            <circle className="text-border stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
                            <circle className="text-success stroke-current" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="25" />
                          </svg>
                          <span className="font-heading text-2xl font-bold">90</span>
                        </div>
                        <h4 className="font-semibold text-sm">Security Score</h4>
                        <p className="text-xs text-muted-foreground mt-1">Excellent health</p>
                      </div>

                      {/* Password Generator Mini */}
                      <div className="rounded-2xl border border-border bg-background/60 p-5">
                        <h4 className="font-semibold text-sm mb-3">Generator</h4>
                        <div className="font-mono text-sm bg-card rounded-lg p-3 border border-border/50 text-center tracking-wider text-foreground select-all">
                          k$9Lm@xQ2!pW
                        </div>
                        <div className="mt-3 flex gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-success" />
                          <div className="flex-1 h-1.5 rounded-full bg-success" />
                          <div className="flex-1 h-1.5 rounded-full bg-success" />
                          <div className="flex-1 h-1.5 rounded-full bg-success/30" />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 font-semibold">Strong • 16 characters</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 2. TRUST & SECURITY STRIP                                        */}
        {/* ================================================================ */}
        <section className="px-6 py-16 lg:py-20 lg:px-12 bg-muted/30">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Lock,
                  title: "AES-256 Encryption",
                  description: "Military-grade encryption protecting every credential.",
                },
                {
                  icon: EyeOff,
                  title: "Zero-Knowledge",
                  description: "Only you can decrypt your vault.",
                },
                {
                  icon: MonitorSmartphone,
                  title: "Cross Platform",
                  description: "Access VaultX from desktop, mobile and tablet.",
                },
                {
                  icon: RefreshCw,
                  title: "Secure Sync",
                  description: "Encrypted synchronization across all your devices.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-[0_4px_14px_rgba(15,23,42,0.04)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-300">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 3. FEATURE CARDS                                                 */}
        {/* ================================================================ */}
        <section id="features" className="px-6 py-16 lg:py-24 lg:px-12 bg-background">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14 space-y-4">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Everything you need, nothing you don&apos;t
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                Three core tools designed to keep your digital life secure, organized, and effortless.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Key,
                  title: "Password Manager",
                  description: "Securely store, organize, search and manage all your passwords in one encrypted vault.",
                  gradient: "from-primary/10 to-primary/5",
                },
                {
                  icon: Zap,
                  title: "Password Generator",
                  description: "Generate strong, unique passwords instantly with customizable security settings.",
                  gradient: "from-warning/10 to-warning/5",
                },
                {
                  icon: ShieldCheck,
                  title: "Security Audit",
                  description: "Automatically detect weak, reused and compromised passwords while monitoring vault health.",
                  gradient: "from-success/10 to-success/5",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-border bg-card p-8 shadow-[0_4px_14px_rgba(15,23,42,0.04)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle gradient backdrop */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  
                  <div className="relative z-10">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                    <Link href="/login" className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-3 gap-2 transition-all">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 bg-background py-10 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between text-xs font-bold tracking-widest text-muted-foreground uppercase">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-foreground" />
            <span className="text-foreground">VaultX</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-foreground transition-colors duration-200">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors duration-200">Terms</Link>
            <a href="mailto:farhanharis100@gmail.com" className="hover:text-foreground transition-colors duration-200 text-primary">farhanharis100@gmail.com</a>
            <a href="https://instagram.com/_farhan.haris" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200 text-primary">IG: @_farhan.haris</a>
            <a href="https://github.com/farhan0haris" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200 text-primary">GH: @farhan0haris</a>
          </div>
          <div className="text-center sm:text-right">
            © 2025 VaultX Security.
          </div>
        </div>
      </footer>
    </div>
  )
}
