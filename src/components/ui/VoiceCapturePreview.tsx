import { motion } from 'framer-motion'
import { useMemo } from 'react'

const avatarColors = ['#7c8bff', '#ff9a7a', '#4fd1c5', '#f5a623']

function StaticBars({ count, className }: { count: number; className?: string }) {
  const heights = useMemo(() => Array.from({ length: count }, () => 0.15 + Math.random() * 0.85), [count])
  return (
    <div className={`flex items-center gap-[5px] ${className ?? ''}`}>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] shrink-0 rounded-full bg-line-strong"
          style={{ height: `${h * 100}%` }}
          animate={{ height: [`${h * 40}%`, `${h * 100}%`, `${h * 55}%`] }}
          transition={{ duration: 1.4 + (i % 5) * 0.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 0.03 }}
        />
      ))}
    </div>
  )
}

/** Replicates the reference's "Listening…" screen — the concrete moment MeetMind is capturing a call. */
export function VoiceCapturePreview() {
  return (
    <div className="flex h-full flex-col bg-white pt-14">
      {/* Top row — back arrow + recording timer */}
      <div className="flex items-center justify-between px-5 pb-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sunk text-ink-500">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L3 7l6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-coral-tint px-3 py-1 text-[11px] font-semibold text-coral">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
          00:48
        </span>
      </div>

      {/* Waveform field with the pulsing capture orb centered on top */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5">
        <StaticBars count={30} className="h-36 w-full justify-between" />
        <div className="absolute flex items-center justify-center">
          <span className="pulse-ring absolute h-16 w-16 rounded-full bg-accent/50" />
          <span className="pulse-ring absolute h-16 w-16 rounded-full bg-accent/30" style={{ animationDelay: '0.6s' }} />
          <span
            className="relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-bright))' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="7.5" y="2" width="5" height="9" rx="2.5" fill="white" />
              <path d="M4 9.5a6 6 0 0012 0M10 17v2" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>

      <div className="pb-4 text-center">
        <p className="font-display text-base font-semibold text-ink">Listening…</p>
        <p className="mt-1 text-xs text-ink-500">MeetMind is capturing key points</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 pb-5">
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">
          <span className="h-3 w-3 rounded-[3px] bg-white" />
        </button>
        <button className="surface flex h-14 w-14 items-center justify-center rounded-full">
          <div className="flex gap-1">
            <span className="h-4 w-1.5 rounded-full bg-ink" />
            <span className="h-4 w-1.5 rounded-full bg-ink" />
          </div>
        </button>
        <button className="surface flex h-11 w-11 items-center justify-center rounded-full text-ink-500">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M1 1h12v14l-6-4-6 4V1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Detecting speakers pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="surface mx-4 mb-6 flex items-center gap-2.5 rounded-2xl px-3 py-2.5"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm text-white"
          style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-coral))' }}
        >
          ✨
        </span>
        <p className="flex-1 text-[12px] font-semibold text-ink">Detecting speakers</p>
        <div className="flex -space-x-2">
          {avatarColors.map((c, i) => (
            <span
              key={i}
              className="h-6 w-6 rounded-full border-2 border-white"
              style={{ background: c, zIndex: avatarColors.length - i }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}