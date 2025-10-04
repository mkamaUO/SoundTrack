"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { ClipboardList, Film, Music, Clock, Activity, ArrowRight } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 pt-20 pb-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Soundtrack to Your Life</h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Generate personalized soundtracks based on your daily activities, mood, and biometric data
          </p>
          <Button size="lg" onClick={() => router.push("/questionnaire")}>
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <Card
            className="p-6 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => router.push("/questionnaire")}
          >
            <ClipboardList className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Daily Check-In</h3>
            <p className="text-sm text-muted-foreground">
              Answer questions about your day, activities, and how you're feeling
            </p>
          </Card>

          <Card
            className="p-6 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => router.push("/video")}
          >
            <Film className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Video Playground</h3>
            <p className="text-sm text-muted-foreground">Create and edit videos with an intuitive timeline interface</p>
          </Card>

          <Card
            className="p-6 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => router.push("/playlist")}
          >
            <Music className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Your Playlist</h3>
            <p className="text-sm text-muted-foreground">Discover songs matched to your mood and daily activities</p>
          </Card>

          <Card
            className="p-6 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => router.push("/timeline")}
          >
            <Clock className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Daily Timeline</h3>
            <p className="text-sm text-muted-foreground">View your day hour by hour with songs and summaries</p>
          </Card>

          <Card
            className="p-6 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => router.push("/biometrics")}
          >
            <Activity className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Biometrics</h3>
            <p className="text-sm text-muted-foreground">Track your heart rate and mood data throughout the day</p>
          </Card>
        </div>
      </main>
    </div>
  )
}
