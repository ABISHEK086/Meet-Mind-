import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { TranscriptPanel } from '@/components/transcript/TranscriptPanel'
import { ActionsPanel } from '@/components/actions/ActionsPanel'
import { SummaryPanel } from '@/components/export/SummaryPanel'
import { MobileNav, type MobilePanel } from '@/components/layout/MobileNav'
import { useMeeting } from '@/store/MeetingContext'
import { decodeShareLink } from '@/lib/export'

export function Results() {
  const { result, loading } = useMeeting()
  const [params] = useSearchParams()
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('actions')
  const navigate = useNavigate()

  const sharedData = params.get('data')

  useEffect(() => {
    if (!result && !loading && !sharedData) {
      navigate('/analyze')
    }
  }, [result, loading, sharedData, navigate])

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center gap-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-3 w-3 rounded-full"
              style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-magenta))' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        <p className="text-sm text-ink-faint">Reading between the lines…</p>
      </div>
    )
  }

  const shared = sharedData ? decodeShareLink(sharedData) : null
  const data = result ?? shared
  if (!data) return null

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-8 pb-24 md:pb-8">
        {/* Desktop 3-panel layout */}
        <div className="hidden gap-6 md:grid md:grid-cols-[1.1fr_1.3fr_1fr] md:items-start">
          <Card glow="cyan" className="max-h-[calc(100vh-140px)] overflow-y-auto p-6">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-ink-faint">Transcript</h2>
            <TranscriptPanel lines={data.transcript} />
          </Card>

          <Card glow="violet" className="max-h-[calc(100vh-140px)] overflow-y-auto p-6">
            <ActionsPanel />
          </Card>

          <Card glow="magenta" className="max-h-[calc(100vh-140px)] overflow-y-auto p-6">
            <SummaryPanel />
          </Card>
        </div>

        {/* Mobile swipeable layout */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobilePanel}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              <Card glow="violet" className="min-h-[60vh] p-5">
                {mobilePanel === 'transcript' && <TranscriptPanel lines={data.transcript} />}
                {mobilePanel === 'actions' && <ActionsPanel />}
                {mobilePanel === 'summary' && <SummaryPanel />}
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <MobileNav active={mobilePanel} onChange={setMobilePanel} />
    </div>
  )
}