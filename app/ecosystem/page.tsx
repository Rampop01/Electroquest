import { Globe, Shield, Smartphone, Zap, Heart, Coins } from 'lucide-react'
import { GameButton } from '@/components/game-button'
import Link from 'next/link'

const projects = [
  {
    name: "Valora",
    category: "Wallet",
    description: "Mobile-first wallet for sending, saving, and spending Celo assets.",
    icon: Smartphone,
    color: "bg-primary/20 text-primary"
  },
  {
    name: "Mento",
    category: "Stability",
    description: "The protocol behind Celo's algorithmic stablecoins like cUSD.",
    icon: Shield,
    color: "bg-secondary/20 text-secondary"
  },
  {
    name: "EthicHub",
    category: "ReFi",
    description: "Crowdlending platform for unbanked small farmers.",
    icon: Heart,
    color: "bg-primary/20 text-primary"
  },
  {
    name: "UbeSwap",
    category: "DeFi",
    description: "Mobile-first decentralized exchange on Celo.",
    icon: Zap,
    color: "bg-secondary/20 text-secondary"
  },
  {
    name: "GoodDollar",
    category: "Impact",
    description: "Universal Basic Income protocol on Celo.",
    icon: Coins,
    color: "bg-primary/20 text-primary"
  },
  {
    name: "ImpactMarket",
    category: "Social",
    description: "Human empowerment protocol on Celo.",
    icon: Globe,
    color: "bg-secondary/20 text-secondary"
  }
]

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-[family-name:var(--font-cinzel-decorative)] text-4xl md:text-6xl font-bold text-primary mb-6">
            The Celo Ecosystem
          </h1>
          <p className="font-[family-name:var(--font-cinzel)] text-xl text-white/60 max-w-2xl mx-auto">
            Discover the builders and protocols creating a world of prosperity for all on the Celo network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="glass-card holographic rounded-2xl p-8 border border-white/5 group hover:scale-[1.03] transition-all">
              <div className={`${project.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <project.icon className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{project.category}</span>
                <h3 className="text-2xl font-black text-white">{project.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <Link href="#" className="text-primary text-xs font-bold hover:underline flex items-center gap-2">
                  LEARN MORE <span className="text-white/20">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/path-selection">
            <GameButton className="px-12 py-4">Start Your Journey</GameButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
