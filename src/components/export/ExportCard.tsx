import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'

interface ExportCardProps { 
  icon: ReactNode
  title: string
  description: string
  actionLabel: string
  onAction: () => void | Promise<void>
  glow?: 'violet' | 'magenta' | 'cyan'
}

export function ExportCard({ icon, title, description, actionLabel, onAction, glow = 'violet' }: ExportCardProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  async function handleClick() {
    setStatus('loading')
    try {
      await onAction()
      setStatus('done')
      setTimeout(() => setStatus('idle'), 1800)
    } catch {
      setStatus('idle')
    }
  }

  return (
    <Card glow={glow} className="flex flex-col items-center gap-4 p-8 text-center">
      <div className="surface-sunk flex h-14 w-14 items-center justify-center rounded-2xl">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm text-ink-faint">{description}</p>

      <button
        onClick={handleClick}
        className="relative mt-2 w-full overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        style={{ background: 'linear-gradient(120deg, #c8102e, #e8384f)' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === 'done' ? (
            <motion.span
              key="done"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <motion.path
                  d="M4 12.5L9.5 18L20 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </svg>
              Done
            </motion.span>
          ) : status === 'loading' ? (
            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Working…
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {actionLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </Card>
  )
}
