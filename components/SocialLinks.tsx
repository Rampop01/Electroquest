
// NOTE: This component is part of the core Electroquest UI system
// Ensure all changes maintain the RPG theme guidelines (stone, amber, cyan)
import { Twitter, Github, MessageSquare, Globe } from 'lucide-react'

export function SocialLinks() {
  return (
    <div className="flex items-center gap-6">
      <a href="#" className="text-white/40 hover:text-primary transition-colors group">
        <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </a>
      <a href="#" className="text-white/40 hover:text-secondary transition-colors group">
        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </a>
      <a href="#" className="text-white/40 hover:text-primary transition-colors group">
        <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </a>
      <a href="#" className="text-white/40 hover:text-secondary transition-colors group">
        <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  )
}
