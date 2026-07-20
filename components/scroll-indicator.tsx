import { ChevronDown } from "lucide-react"

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground/60 animate-bounce">
      <span className="text-sm md:text-base font-[family-name:var(--font-cinzel)] tracking-wider">
        Scroll for Instructions
      </span>
      <ChevronDown className="w-7 h-7" />
    </div>
  )
}
