import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

interface EmptyStateAction {
  label: string
  onClick: () => void
  icon?: ReactNode
}

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  /** 'error' tints the icon badge red; 'neutral' keeps it a quiet ink-gray. */
  tone?: 'error' | 'neutral'
  primaryAction?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  tone = 'neutral',
  primaryAction,
  secondaryAction,
  className = '',
}: EmptyStateProps) {
  const color = tone === 'error' ? 'var(--color-high)' : 'var(--color-ink-500)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`surface flex flex-col items-center gap-3 rounded-2xl p-8 text-center ${className}`}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{ color, background: `color-mix(in srgb, ${color} 12%, transparent)` }}
      >
        {icon}
      </span>

      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-ink-500">{description}</p>

      {(primaryAction || secondaryAction) && (
        <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row">
          {primaryAction && (
            <Button onClick={primaryAction.onClick}>
              {primaryAction.icon}
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.icon}
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  )
}