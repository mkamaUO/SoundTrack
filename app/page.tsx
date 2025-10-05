"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { ClipboardList, Film, Music, Clock, Activity, ArrowRight, Sparkles } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      icon: ClipboardList,
      title: "Daily Check-In",
      description: "Answer questions about your day, activities, and how you're feeling",
      href: "/questionnaire",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Film,
      title: "Video Playground",
      description: "Create and edit videos with an intuitive timeline interface",
      href: "/video",
      gradient: "from-secondary/20 to-secondary/5",
    },
    {
      icon: Music,
      title: "Your Playlist",
      description: "Discover songs matched to your mood and daily activities",
      href: "/playlist",
      gradient: "from-accent/20 to-accent/5",
    },
    {
      icon: Clock,
      title: "Daily Timeline",
      description: "View your day hour by hour with songs and summaries",
      href: "/timeline",
      gradient: "from-primary/20 to-secondary/5",
    },
    {
      icon: Activity,
      title: "Biometrics",
      description: "Track your heart rate and mood data throughout the day",
      href: "/biometrics",
      gradient: "from-secondary/20 to-accent/5",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <Navigation />

      <main className="relative container mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-20 mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 backdrop-blur-sm border border-border/50 mb-6 glow-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Music Discovery</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            <span className="text-gradient">Soundtrack</span>
            <br />
            <span className="text-foreground">to Your Life</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 text-pretty max-w-2xl mx-auto">
            Generate personalized soundtracks based on your daily activities, mood, and biometric data
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/questionnaire")}
            className="gradient-primary text-primary-foreground glow-md hover:glow-accent transition-all h-12 px-8 text-base font-semibold rounded-xl"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.href}
                className="group relative p-7 bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all cursor-pointer overflow-hidden rounded-2xl hover:glow-sm"
                onClick={() => router.push(feature.href)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl gradient-card border border-border/50 flex items-center justify-center mb-4 group-hover:glow-sm transition-all">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
