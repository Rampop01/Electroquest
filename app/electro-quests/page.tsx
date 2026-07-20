"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSound } from "@/components/audio-player"
import { 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Globe, 
  Zap, 
  Coins, 
  Code, 
  Globe2, 
  HardDrive, 
  Shield, 
  GitBranch,
  Map,
  Link2
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuestProgress {
  [key: string]: "locked" | "unlocked" | "completed"
}

export default function ElectroquestsPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<QuestProgress>({})
  const [hoveredQuest, setHoveredQuest] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { playSound } = useSound()

  useEffect(() => {
    const savedProgress = localStorage.getItem("electroQuestProgress")
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    } else {
      const initialProgress: QuestProgress = {}
      for (let i = 1; i <= 10; i++) {
        initialProgress[i] = i === 1 ? "unlocked" : "locked"
      }
      localStorage.setItem("electroQuestProgress", JSON.stringify(initialProgress))
      setProgress(initialProgress)
    }
    setIsLoading(false)
  }, [])

  const handleQuestClick = (questId: string) => {
    const status = progress[questId]
    if (status === "locked") {
      return
    }
    if (status === "completed") {
      playSound('click')
    } else {
      playSound('collect')
    }
    router.push(`/electro-quests/${questId}`)
  }

  const quests = [
    { 
      id: "1", 
      title: "Electroneum Foundations", 
      description: "Discover the foundations of Electroneum's mission for financial inclusion",
      icon: Globe
    },
    { 
      id: "2", 
      title: "The ETN Token", 
      description: "Explore the utility of the ETN token in everyday transactions",
      icon: Coins
    },
    { 
      id: "3", 
      title: "The AnyTask Platform", 
      description: "Learn how the zero-fee freelance platform empowers digital workers",
      icon: Code
    },
    { 
      id: "4", 
      title: "The IBFT Smart Chain", 
      description: "Discover how the fast, energy-efficient consensus mechanism secures the network",
      icon: Zap
    },
    { 
      id: "5", 
      title: "EVM Compatibility", 
      description: "Explore how developers easily deploy Ethereum dApps on Electroneum",
      icon: HardDrive
    },
    { 
      id: "6", 
      title: "Enterprise Validators", 
      description: "Learn about the trusted NGOs and universities securing the network",
      icon: Shield
    },
    { 
      id: "7", 
      title: "Micro-transactions", 
      description: "Discover how near-zero fees enable everyday commerce globally",
      icon: Coins
    },
    { 
      id: "8", 
      title: "Real-World Utility", 
      description: "Explore mobile airtime, utility payments, and more with ETN",
      icon: Globe2
    },
    { 
      id: "9", 
      title: "Sustainability", 
      description: "Learn about Electroneum's green and eco-friendly blockchain",
      icon: GitBranch
    },
    { 
      id: "10", 
      title: "Global Ecosystem", 
      description: "See how the ecosystem spans across emerging markets and beyond",
      icon: Link2
    },
  ]

  const getQuestStatus = (questId: string) => {
    return progress[questId] || "locked"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-400">Loading your Electroneum journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(53,208,127,0.1),transparent_50%)] animate-glow-pulse" />
      <div className="absolute inset-0 bg-[url('/dark-mystical-map-with-ancient-paths.jpg')] bg-cover bg-center opacity-10" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-(family-name:--font-cinzel-decorative) text-4xl md:text-6xl font-bold text-primary mb-4 text-glow-md">
           Electroneum Quest Map
          </h1>
          <p className="font-(family-name:--font-cinzel) text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Journey through the ancient knowledge of Electroneum Network
          </p>
        </div>

        {/* Quest path */}
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
          {quests.map((quest, index) => {
            const status = progress[quest.id] || "locked"
            const isLocked = status === "locked"
            const isCompleted = status === "completed"

            return (
              <div key={quest.id}>
                {/* Connecting path */}
                {index > 0 && (
                  <div className="flex justify-center my-3">
                    <div
                      className={`w-1 h-12 ${
                        progress[quests[index - 1].id] === "completed"
                          ? "bg-linear-to-b from-primary to-secondary"
                          : "bg-white/10"
                      }`}
                    />
                  </div>
                )}

                {/* Quest card */}
                <div
                  className={`relative group ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
                  onMouseEnter={() => setHoveredQuest(quest.id)}
                  onMouseLeave={() => setHoveredQuest(null)}
                  onClick={() => handleQuestClick(quest.id)}
                >
                  <div
                    className={`relative glass-card holographic rounded-xl p-4 md:p-6 transition-all duration-300 ${
                      isLocked
                        ? "opacity-40 grayscale"
                        : isCompleted
                          ? "border-primary shadow-glow-primary"
                          : "border-secondary shadow-glow-secondary hover:scale-[1.02]"
                    }`}
                  >
                    {/* Glow effect on hover */}
                    {!isLocked && hoveredQuest === quest.id && (
                      <div className="absolute inset-0 bg-linear-to-r from-glow-cyan/20 via-glow-purple/20 to-glow-amber/20 rounded-xl animate-glow-pulse" />
                    )}

                    <div className="relative flex items-center gap-4 md:gap-6">
                      {/* Status icon */}
                      <div className="shrink-0">
                        {isLocked ? (
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            <Lock className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                          </div>
                        ) : isCompleted ? (
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-glow-pulse">
                            <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center animate-glow-pulse">
                            <quest.icon className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
                          </div>
                        )}
                      </div>

                      {/* Quest info */}
                      <div className="flex-1 min-w-0">
                        <h2 className="font-(family-name:--font-cinzel-decorative) text-lg md:text-2xl font-bold mb-1 truncate">
                          {isCompleted ? (
                            <span className="text-primary">
                              Quest {quest.id}: {quest.title}
                            </span>
                          ) : isLocked ? (
                            <span className="text-muted-foreground">Quest {quest.id}: {quest.title}</span>
                          ) : (
                            <span className="text-secondary font-bold">
                              Quest {quest.id}: {quest.title}
                            </span>
                          )}
                        </h2>
                        <p className="font-(family-name:--font-cinzel) text-sm md:text-base text-muted-foreground">
                          {quest.description}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      {!isLocked && (
                        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-6 h-6 md:w-8 md:h-8 text-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Completion status badge */}
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 bg-primary text-background font-(family-name:--font-cinzel) text-xs font-bold px-2 py-1 rounded-full border-2 border-background shadow-lg">
                        COMPLETED
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Back to home button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="font-(family-name:--font-cinzel) border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
