
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 bg-grid-pattern relative">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" />
      <div className="relative z-10 text-center space-y-6 max-w-md p-8 glass-card border-glow-amber/30">
        <h1 className="text-6xl font-bold font-[family-name:var(--font-cinzel-decorative)] text-glow-amber">404</h1>
        <h2 className="text-2xl font-[family-name:var(--font-cinzel)] text-stone-200">Realm Not Found</h2>
        <p className="text-stone-400">The path you are seeking has been lost to the fog of time.</p>
        <a href="/" className="inline-block px-6 py-2 bg-stone-800 border border-glow-amber text-glow-amber font-bold font-[family-name:var(--font-cinzel)] hover:bg-glow-amber/10 transition-colors">
          Return to Hub
        </a>
      </div>
    </div>
  )
}