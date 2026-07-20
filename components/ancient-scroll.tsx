
/* A11Y NOTE: Ensure proper ARIA roles and tabIndex are maintained for screen readers */
"use client"

import { useState, useEffect } from "react"
import { GameButton } from "./game-button"
import { ScrollReader } from "./scroll-reader"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AncientScrollProps {
  title: string
  content: string[]
  analogy: {
    title: string
    text: string
  }
  nextUrl: string
}

export function AncientScroll({ title, content, analogy, nextUrl }: AncientScrollProps) {
  const [isUnfurled, setIsUnfurled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsUnfurled(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Scroll container */}
      <div
        className={cn(
          "relative bg-gradient-to-br from-[#f4e4c1] via-[#e8d4a8] to-[#d9c090]",
          "rounded-lg shadow-2xl border-4 border-[#8b7355]",
          "transform-gpu",
          isUnfurled ? "animate-scroll-unfurl" : "opacity-0",
        )}
        style={{
          transformOrigin: "top center",
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139, 115, 85, 0.1) 2px,
              rgba(139, 115, 85, 0.1) 4px
            )
          `,
        }}
      >
        {/* Burnt/aged edges effect */}
        <div
          className="absolute inset-0 rounded-lg shadow-inner pointer-events-none"
          style={{
            boxShadow: "inset 0 0 60px rgba(101, 67, 33, 0.5)",
          }}
        />

        {/* Scroll rod top */}
        <div className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-b from-[#8b7355] to-[#6b5843] rounded-t-lg border-b-2 border-[#5c4a35]" />

        {/* Scroll rod bottom */}
        <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-t from-[#8b7355] to-[#6b5843] rounded-b-lg border-t-2 border-[#5c4a35]" />

        {/* Content */}
        <div className="relative z-10 px-8 md:px-12 py-12 md:py-16">
          <ScrollReader title={title} content={content} analogy={analogy} />

          {/* Title */}
          <h2 
            className="text-4xl md:text-5xl font-black text-center mb-8 text-[#58493b] tracking-wide flex justify-center flex-wrap"
            style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
          >
            {title.split('').map((char, index) => (
              <span
                key={index}
                className="opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>

          {/* Decorative separator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#8b7355]" />
            <div className="text-2xl text-[#8b7355]">✦</div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#8b7355]" />
          </div>

          {/* Content paragraphs */}
          <div 
            className="space-y-6 text-[#e9ddd2] text-base md:text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            {content.map((paragraph, index) => (
              <p
                key={index}
                className="first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-[#8b7355]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 p-6 bg-[#8b7355]/10 border-2 border-[#8b7355] rounded-lg">
            <h3 
              className="text-2xl md:text-3xl font-bold text-[#8b7355] mb-4 text-center"
              style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
            >
              {analogy.title}
            </h3>
            <p 
              className="text-[#e9ddd2] text-base md:text-lg leading-relaxed italic"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              {analogy.text}
            </p>
          </div>

          {/* Bottom button */}
          <div className="mt-12 flex justify-center">
            <Link href={nextUrl}>
              <GameButton size="lg">Enter Quest Room</GameButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
