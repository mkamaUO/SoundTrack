"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClipboardList, Film, Music, Clock, Activity } from "lucide-react"
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">Soundtrack</span>
          </div>
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
