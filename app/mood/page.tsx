"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Heart, Zap, Smile, Meh, Sparkles } from "lucide-react"

type MoodState = "analyzing" | "complete"
type EmotionType = "happy" | "calm" | "energetic" | "focused" | "relaxed" | "neutral"

interface EmotionScore {
  emotion: EmotionType
  score: number
  color: string
}

interface BiomarkerData {
  label: string
  value: number
  unit: string
  status: "normal" | "elevated" | "low"
}

export default function MoodPage() {
  const [moodState, setMoodState] = useState<MoodState>("analyzing")
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [detectedMood, setDetectedMood] = useState<EmotionType>("neutral")

  const emotionScores: EmotionScore[] = [
    { emotion: "happy", score: 72, color: "bg-yellow-500" },
    { emotion: "calm", score: 85, color: "bg-blue-500" },
    { emotion: "energetic", score: 45, color: "bg-orange-500" },
    { emotion: "focused", score: 68, color: "bg-purple-500" },
    { emotion: "relaxed", score: 78, color: "bg-green-500" },
    { emotion: "neutral", score: 30, color: "bg-gray-500" },
  ]

  const biomarkers: BiomarkerData[] = [
    { label: "Heart Rate Variability", value: 65, unit: "ms", status: "normal" },
    { label: "Alpha Wave Activity", value: 82, unit: "%", status: "elevated" },
    { label: "Beta Wave Activity", value: 45, unit: "%", status: "normal" },
    { label: "Movement Intensity", value: 38, unit: "units", status: "low" },
  ]

  // Simulate analysis process
  useEffect(() => {
    if (moodState === "analyzing") {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            setMoodState("complete")
            setDetectedMood("calm")
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [moodState])

  const getMoodIcon = (mood: EmotionType) => {
    switch (mood) {
      case "happy":
        return <Smile className="w-8 h-8" />
      case "calm":
      case "relaxed":
        return <Heart className="w-8 h-8" />
      case "energetic":
        return <Zap className="w-8 h-8" />
      case "focused":
        return <Brain className="w-8 h-8" />
      default:
        return <Meh className="w-8 h-8" />
    }
  }

  const getMoodDescription = (mood: EmotionType) => {
    const descriptions = {
      happy: "Your biomedical data indicates a positive and uplifted emotional state",
      calm: "Your signals show a peaceful and tranquil state of mind",
      energetic: "High activity levels detected, you're feeling dynamic and active",
      focused: "Strong concentration patterns detected in your brain activity",
      relaxed: "Your body is in a restful and comfortable state",
      neutral: "Balanced emotional state with no strong indicators",
    }
    return descriptions[mood]
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <Navigation />

      <main className="relative container mx-auto px-4 sm:px-6 pt-24 pb-24 md:pt-32 md:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-gradient">Mood</span> <span className="text-foreground">Analysis</span>
            </h1>
            <p className="text-lg text-muted-foreground">AI-powered emotion detection from your biomedical data</p>
          </div>

          {moodState === "analyzing" && (
            <Card className="mb-8 bg-card/40 backdrop-blur-sm border-primary/50 glow-sm rounded-2xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground animate-pulse" />
                  </div>
                  <CardTitle className="text-xl">Analyzing Your Data</CardTitle>
                </div>
                <CardDescription className="text-base">Processing biomedical signals and environmental context...</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Progress value={analysisProgress} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground mt-3">{analysisProgress}% complete</p>
              </CardContent>
            </Card>
          )}

          {moodState === "complete" && (
            <>
              <Card className="mb-8 bg-card/40 backdrop-blur-sm border-primary/40 rounded-2xl overflow-hidden glow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                <CardHeader className="relative">
                  <CardTitle className="text-2xl">Detected Mood</CardTitle>
                  <CardDescription className="text-base">Based on your biomedical and environmental data</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground glow-md">
                        {getMoodIcon(detectedMood)}
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-3xl font-bold text-foreground capitalize mb-3">{detectedMood}</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">{getMoodDescription(detectedMood)}</p>
                    </div>
                    <Badge className="gradient-accent text-accent-foreground px-4 py-2 text-sm font-semibold rounded-xl">
                      {emotionScores.find((e) => e.emotion === detectedMood)?.score}% Confidence
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8 bg-card/40 backdrop-blur-sm border-border/50 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Emotion Breakdown</CardTitle>
                  <CardDescription className="text-base">Detailed analysis of all detected emotions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {emotionScores
                      .sort((a, b) => b.score - a.score)
                      .map((emotion) => (
                        <div key={emotion.emotion} className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-foreground capitalize">{emotion.emotion}</span>
                            <span className="text-sm font-medium text-muted-foreground">{emotion.score}%</span>
                          </div>
                          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${emotion.color} transition-all duration-500`}
                              style={{ width: `${emotion.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8 bg-card/40 backdrop-blur-sm border-border/50 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Biomarker Analysis</CardTitle>
                  <CardDescription className="text-base">Processed signals from your biomedical data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {biomarkers.map((marker) => (
                      <div key={marker.label} className="p-5 rounded-xl border border-border/50 gradient-card">
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-sm font-semibold text-foreground">{marker.label}</p>
                          <Badge
                            variant={marker.status === "normal" ? "secondary" : "default"}
                            className={
                              marker.status === "elevated"
                                ? "bg-orange-500/90 text-white"
                                : marker.status === "low"
                                  ? "bg-blue-500/90 text-white"
                                  : "bg-primary/20 text-primary"
                            }
                          >
                            {marker.status}
                          </Badge>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-bold text-foreground">{marker.value}</span>
                          <span className="text-base text-muted-foreground">{marker.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-primary/30 rounded-2xl glow-sm overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">Ready for Music</CardTitle>
                  <CardDescription className="text-base">Get personalized song recommendations based on your mood</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="gradient-primary text-primary-foreground glow-sm hover:glow-md transition-all h-11 px-6 rounded-xl font-semibold">
                    <a href="/music">Generate Playlist →</a>
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
