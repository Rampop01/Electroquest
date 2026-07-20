/**
 * @file portal-animation.tsx
 * @description Core implementation module for Electroquest.
 */
"use client"

export function PortalAnimation() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-glow-cyan via-glow-purple to-glow-amber opacity-50 blur-xl animate-spin"
        style={{ animationDuration: "3s" }}
      />

      {/* Middle ring */}
      <div
        className="absolute inset-4 rounded-full bg-gradient-to-r from-glow-amber via-glow-cyan to-glow-purple opacity-75 blur-lg animate-spin"
        style={{ animationDuration: "2s", animationDirection: "reverse" }}
      />

      {/* Inner portal */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-glow-purple via-glow-cyan to-glow-amber animate-glow-pulse flex items-center justify-center">
        <div className="text-6xl animate-float">🌀</div>
      </div>

      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-glow-amber rounded-full animate-float"
          style={{
            left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
            top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: "2s",
          }}
        />
      ))}
    </div>
  )
}
