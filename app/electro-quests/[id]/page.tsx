import { AncientScroll } from "@/components/ancient-scroll"
import { celoScrollContent } from "@/lib/electro-quest-data"
import { notFound } from "next/navigation"

interface ScrollPageProps {
  params: Promise<{ id: string }>
}

export default async function CeloScrollPage({ params }: ScrollPageProps) {
  const { id } = await params
  const scrollData = celoScrollContent[id]

  if (!scrollData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-stone-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/ancient-library-dark-mystical.jpg')] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background/80" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-glow-amber/50 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <AncientScroll
          title={scrollData.title}
          content={scrollData.content}
          analogy={scrollData.analogy}
          nextUrl={`/electro-quests/${id}/room`}
        />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(celoScrollContent).map((id) => ({
    id,
  }))
}
