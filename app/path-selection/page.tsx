import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PathSelectionPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/ancient-library-dark-mystical.jpg')] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fog to-background/50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-cinzel-decorative)] text-4xl md:text-5xl font-black text-glow-amber text-glow mb-4 tracking-wider">
              CHOOSE YOUR PATH
            </h1>
            <div className="mt-6 w-48 h-1 mx-auto bg-gradient-to-r from-transparent via-glow-amber to-transparent animate-shimmer mb-8" />
            <p className="font-[family-name:var(--font-cinzel)] text-center max-w-md mx-auto text-foreground/80 text-lg md:text-xl leading-relaxed">
              Select your journey into the world of Electroneum. Your adventure begins here.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Ethereum Path - Recommended for New Users */}
            <div className="relative group bg-stone-900/70 border border-amber-500/30 rounded-xl p-8 backdrop-blur-sm hover:bg-stone-900/90 transition-all duration-300 hover:shadow-glow-amber">
              <div className="absolute -top-3 -right-3 bg-glow-amber text-stone-900 text-xs font-bold px-3 py-1 rounded-full tracking-widest">
                RECOMMENDED
              </div>
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-amber-300 mb-4 tracking-wider">Web3 Explorer</h3>
                <p className="font-[family-name:var(--font-cinzel)] text-foreground/80 mb-6">
                  New to blockchain? Start with the basics, the foundation of decentralized applications. 
                  Learn the fundamentals in a structured, beginner-friendly way.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-foreground/90">
                    <ArrowRight className="w-4 h-4 mr-2 text-amber-400" />
                    Perfect for beginners
                  </li>
                  <li className="flex items-center text-foreground/90">
                    <ArrowRight className="w-4 h-4 mr-2 text-amber-400" />
                    Learn core blockchain concepts
                  </li>
                  <li className="flex items-center text-foreground/90">
                    <ArrowRight className="w-4 h-4 mr-2 text-amber-400" />
                    Step-by-step guidance
                  </li>
                </ul>
              </div>
              <Link 
                href="/quests"
                className="inline-flex items-center justify-center w-full py-3 px-6 text-center font-medium bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-900 rounded-lg transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.5)] font-[family-name:var(--font-cinzel)] tracking-wider"
              >
                Begin Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Celo Path - For Advanced Users */}
            <div className="relative group bg-stone-900/70 border border-cyan-500/30 rounded-xl p-8 backdrop-blur-sm hover:bg-stone-900/90 transition-all duration-300 hover:shadow-glow-cyan">
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-glow-cyan mb-4 tracking-wider">Electroneum Adventurer</h3>
                <p className="font-[family-name:var(--font-cinzel)] text-foreground/80 mb-6">
                  Ready for the real deal? Dive into Electroneum's mobile-first ecosystem, integrations, 
                  and real-world impact projects.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-foreground/90">
                    <ArrowRight className="w-4 h-4 mr-2 text-cyan-400" />
                    Mobile-first design
                  </li>
                  <li className="flex items-center text-foreground/90">
                    <ArrowRight className="w-4 h-4 mr-2 text-cyan-400" />
                    Explore MiniPay integration
                  </li>
                  <li className="flex items-center text-foreground/90">
                    <ArrowRight className="w-4 h-4 mr-2 text-cyan-400" />
                    Advanced concepts and tools
                  </li>
                </ul>
              </div>
              <Link 
                href="/electro-quests"
                className="inline-flex items-center justify-center w-full py-3 px-6 text-center font-medium bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-stone-900 rounded-lg transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] font-[family-name:var(--font-cinzel)] tracking-wider"
              >
                Start Electroneum Adventure
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="font-[family-name:var(--font-cinzel)] text-foreground/60 text-sm tracking-wider">
              Not sure which to choose? Start with Web3 Explorer to learn the basics, 
              or switch paths anytime from the main menu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
