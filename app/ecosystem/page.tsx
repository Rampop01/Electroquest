import { Globe, Shield, Smartphone, Zap, Heart, Coins } from 'lucide-react'
import { GameButton } from '@/components/game-button'
import Link from 'next/link'

const projects = [
  {
    name: "AnyTask",
    category: "Freelance",
    description: "Zero-fee global freelance platform powered by ETN.",
    icon: Globe,
    color: "bg-primary/20 text-primary"
  },
  {
    name: "ETN App",
    category: "Wallet",
    description: "Mobile wallet for sending, receiving, and spending ETN.",
    icon: Smartphone,
    color: "bg-secondary/20 text-secondary"
  },
  {
    name: "Mobile Top-ups",
    category: "Utility",
    description: "Purchase mobile airtime and data across 160+ countries.",
    icon: Zap,
    color: "bg-primary/20 text-primary"
  },
  {
    name: "Everyday Utility",
    category: "Payments",
    description: "Pay for electricity and essential utilities with ETN.",
    icon: Shield,
    color: "bg-secondary/20 text-secondary"
  },
  {
    name: "Enterprise Validators",
    category: "Network",
    description: "Universities and NGOs securing the IBFT Smart Chain.",
    icon: Heart,
    color: "bg-primary/20 text-primary"
  },
  {
    name: "Smart Chain dApps",
    category: "Web3",
    description: "EVM compatible decentralized applications.",
    icon: Coins,
    color: "bg-secondary/20 text-secondary"
  }
]

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-[family-name:var(--font-cinzel-decorative)] text-4xl md:text-6xl font-bold text-primary mb-6">
            The Electroneum Ecosystem
          </h1>
          <p className="font-[family-name:var(--font-cinzel)] text-xl text-white/60 max-w-2xl mx-auto">
            Discover the builders and protocols creating a world of prosperity for all on the Electroneum network.
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
