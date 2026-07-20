// @ts-check
"use client"
import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { useGameSound } from "@/hooks/useGameSound"

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary"
}

export const GameButton = forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, size = "md", variant = "primary", children, onClick, ...props }, ref) => {
    const { playSound } = useGameSound()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playSound('click')
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "font-[family-name:var(--font-cinzel-decorative)] font-bold uppercase tracking-wider",
          "relative overflow-hidden transition-all duration-300",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transform hover:scale-105 active:scale-95",
          variant === "primary" && [
            "bg-gradient-to-r from-primary via-secondary to-primary",
            "text-primary-foreground",
            "shadow-md shadow-primary/30",
            "hover:shadow-xl hover:shadow-primary/50",
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
            "before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
            "animate-glow-pulse",
          ],
          variant === "secondary" && [
            "bg-secondary/10 border-2 border-secondary/50 backdrop-blur-md",
            "text-secondary",
            "hover:bg-secondary/20 hover:border-secondary transition-all",
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
            "before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
          ],
          size === "sm" && "px-4 py-2 text-sm rounded-md",
          size === "md" && "px-6 py-3 text-base rounded-lg",
          size === "lg" && "px-8 py-4 text-lg rounded-xl",
          className,
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)

GameButton.displayName = "GameButton"
