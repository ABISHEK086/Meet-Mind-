import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  glow?: 'none' | 'violet' | 'magenta' | 'cyan'
}

const glows: Record<string, string> = {
  none: '',
  violet: 'shadow-[0_0_0_1px_rgba(167,139,250,0.18),0_20px_50px_rgba(124,92,255,0.18)]',
  magenta: 'shadow-[0_0_0_1px_rgba(244,114,182,0.18),0_20px_50px_rgba(244,114,182,0.16)]',
  cyan: 'shadow-[0_0_0_1px_rgba(103,232,249,0.18),0_20px_50px_rgba(103,232,249,0.14)]',
}

export function Card({ children, className = '', glow = 'none', ...props }: CardProps) {
  return (
    <div className={`glass rounded-3xl ${glows[glow]} ${className}`} {...props}>
      {children}
    </div>
  )
}