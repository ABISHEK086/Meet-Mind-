import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  tint?: 'none' | 'lavender' | 'mint'
}

const tints: Record<string, string> = {
  none: 'surface',
  lavender: 'bg-accent-tint border border-accent/10',
  mint: 'bg-teal-tint border border-teal/10',
}

export function Card({ children, className = '', tint = 'none', ...props }: CardProps) {
  return (
    <div className={`${tints[tint]} rounded-2xl ${className}`} {...props}>
      {children}
    </div>
  )
}