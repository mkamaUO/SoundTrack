"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, Heart, MoveVertical as MoreVertical } from "lucide-react"

const songs = [
  {
    id: 1,
    title: "Peaceful Morning",
    artist: "Ambient Collective",
    duration: "3:45",
    mood: "Calm",
    image: "/calm-music-album.jpg",
  },
  {
    id: 2,
    title: "Focus Flow",
    artist: "Study Beats",
    duration: "4:12",
    mood: "Focused",
    image: "/classical-piano-album.jpg",
  },
  {
    id: 3,
    title: "Evening Unwind",
    artist: "Chill Vibes",
    duration: "3:28",
    mood: "Relaxed",
    image: "/electronic-chill-album.jpg",
  },
  {
    id: 4,
    title: "Sunset Dreams",
    artist: "Lo-Fi Collective",
    duration: "4:01",
    mood: "Peaceful",
    image: "/sunset-music-album.jpg",
  },
  {
    id: 5,
    title: "Night Reflection",
    artist: "Piano Serenity",
    duration: "5:15",
    mood: "Contemplative",
    image: "/piano-peaceful-album.jpg",
  },
]

export default function PlaylistPage() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set())

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <Navigation />
      <main className="relative container mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-foreground">Your </span>
            <span className="text-gradient">Playlist</span>
          </h1>
          <p className="text-lg text-muted-foreground">Songs matched to your mood and activities</p>
        </div>

        <div className="space-y-3 max-w-4xl">
          {songs.map((song, index) => (
            <Card
              key={song.id}
              className="group p-5 bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:glow-sm rounded-xl"
            >
              <div className="flex items-center gap-5">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-border/50">
                  <img src={song.image || "/placeholder.svg"} alt={song.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate text-lg">{song.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1.5 rounded-full gradient-primary text-primary-foreground font-medium">
                    {song.mood}
                  </span>
                  <span className="text-sm text-muted-foreground tabular-nums font-medium">{song.duration}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-card/60 rounded-lg"
                    onClick={() =>
                      setLikedSongs((prev) => {
                        const next = new Set(prev)
                        if (next.has(song.id)) {
                          next.delete(song.id)
                        } else {
                          next.add(song.id)
                        }
                        return next
                      })
                    }
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${likedSongs.has(song.id) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-card/60 rounded-lg"
                    onClick={() => setPlayingId(playingId === song.id ? null : song.id)}
                  >
                    {playingId === song.id ? (
                      <Pause className="w-5 h-5 text-primary" />
                    ) : (
                      <Play className="w-5 h-5 text-foreground" />
                    )}
                  </Button>
                  <Button size="sm" variant="ghost" className="hover:bg-card/60 rounded-lg">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
