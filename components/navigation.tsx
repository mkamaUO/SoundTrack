"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClipboardList, Film, Music, Clock, Activity, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/questionnaire", label: "Questionnaire", icon: ClipboardList },
  { href: "/video", label: "Video Playground", icon: Film },
  { href: "/playlist", label: "Playlist", icon: Music },
  { href: "/timeline", label: "Timeline", icon: Clock },
  { href: "/biometrics", label: "Biometrics", icon: Activity },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center glow-sm transition-all group-hover:glow-md">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Soundtrack
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all text-sm font-medium overflow-hidden",
                    isActive
                      ? "text-primary-foreground bg-primary/90 glow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/60",
                  )}
                >
                  {isActive && (
                    <div className="absolute inset-0 gradient-primary opacity-100" />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="hidden md:inline relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
