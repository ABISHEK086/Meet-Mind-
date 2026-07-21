import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface WaveformProps {
  bars?: number
  active?: boolean
  className?: string
  color?: string
}

/**
 * Signature motif: a waveform whose bars settle into a checklist rhythm —
 * literalizing "voice becomes structure." Used on the landing hero and the
 * audio drop zone. Colored with the accent gradient rather than a flat tone.
 */
export function Waveform({ bars = 40, active = true, className = '', color }: WaveformProps) {
  const heights = useMemo(() => Array.from({ length: bars }, () => 0.15 + Math.random() * 0.85), [bars])

  return (
    <div className={`flex items-center gap-[3px] ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full"
          style={{
            background: color ?? `linear-gradient(180deg, var(--color-accent-bright), var(--color-teal))`,
          }}
          initial={{ height: '10%' }}
          animate={
            active
              ? { height: [`${h * 30}%`, `${h * 100}%`, `${h * 40}%`] }
              : { height: `${h * 60}%` }
          }
          transition={
            active
              ? { duration: 1.2 + (i % 5) * 0.15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 0.02 }
              : {}
          }
        />
      ))}
    </div>
  )
}