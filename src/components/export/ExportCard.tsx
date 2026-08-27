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
  /** Which brand color this format is themed around — drives the badge, button, and hover glow. */
  tone: 'accent' | 'coral' | 'teal'
  /** Short mono-font tag naming the literal output, e.g. ".md", ".pdf", "URL" */
  formatTag: string
  /** Stagger delay in seconds for the entrance animation */
  delay?: number
}

const toneVar: Record<ExportCardProps['tone'], string> = {
  accent: 'var(--color-accent)',
  coral: 'var(--color-coral)',
  teal: 'var(--color-teal)',
}

export function ExportCard({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  glow = 'violet',
  tone,
  formatTag,
  delay = 0,
}: ExportCardProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [hovered, setHovered] = useState(false)
  const color = toneVar[tone]

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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative"
    >
      <Card
        glow={glow}
        className="relative flex flex-col items-center gap-4 overflow-hidden p-8 text-center transition-shadow duration-300"
        style={{
          boxShadow: hovered ? `0 16px 36px -8px color-mix(in srgb, ${color} 38%, transparent)` : undefined,
        }}
      >
        {/* Format tag — the literal file type this card produces, not decoration */}
        <span
          className="absolute right-4 top-4 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide"
          style={{
            color,
            background: `color-mix(in srgb, ${color} 12%, transparent)`,
          }}
        >
          {formatTag}
        </span>

        <motion.div
          animate={{ rotate: hovered ? -6 : 0, scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, ${color} 16%, transparent), color-mix(in srgb, ${color} 8%, transparent))`,
            color,
          }}
        >
          {icon}
        </motion.div>

        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="text-sm text-ink-faint">{description}</p>

        <button
          onClick={handleClick}
          className="relative mt-2 w-full overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          style={{
            background: `linear-gradient(120deg, ${color}, color-mix(in srgb, ${color} 70%, white))`,
          }}
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
    </motion.div>
  )
}