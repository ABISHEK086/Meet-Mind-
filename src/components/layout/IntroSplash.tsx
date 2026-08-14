import { motion } from 'framer-motion'
import { TextRoll } from '@/components/ui/text-roll'

export function IntroSplash({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-void">
      <div className="relative flex flex-col items-center gap-4">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-display text-xs font-medium uppercase tracking-[0.3em] text-ink-faint"
        >
          Meetings, organized
        </motion.span>

        <h1 className="font-display text-6xl font-medium tracking-tight text-ink sm:text-7xl">
          <TextRoll
            duration={0.45}
            getEnterDelay={(i) => i * 0.055}
            getExitDelay={(i) => i * 0.055 + 0.18}
            // Fires once the last letter finishes settling — pause briefly, then hand off to the app
            onAnimationComplete={() => setTimeout(onComplete, 450)}
          >
            MeetMind
          </TextRoll>
        </h1>
      </div>
    </div>
  )
}