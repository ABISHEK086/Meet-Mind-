import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'

interface ExportCardProps {
  icon: ReactNode
  title: string
  description: string
  actionLabel: string
  onAction: () => void | Promise<void>
  tint?: 'lavender' | 'mint'
}

export function ExportCard({ icon, title, description, actionLabel, onAction, tint = 'lavender' }: ExportCardProps) {
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
    <Card className="flex flex-col items-center gap-4 p-8 text-center">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
          tint === 'lavender' ? 'bg-accent-tint' : 'bg-teal-tint'
        }`}
      >
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm text-ink-500">{description}</p>

      <button
        onClick={handleClick}
        className="relative mt-2 w-full overflow-hidden rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
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