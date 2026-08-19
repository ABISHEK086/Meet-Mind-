import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FileText, Mic, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Waveform } from '@/components/ui/Waveform'
import { PhoneFrame } from '@/components/ui/PhoneFrame'
import { VoiceCapturePreview } from '@/components/ui/VoiceCapturePreview'

export function Home() {
  return (
    <div className="relative">
      <section className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* Left — headline */}
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="surface mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-ink-500"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Plugs into Zoom & Google Meet, or any transcript you paste
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            Your meetings.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(100deg, var(--color-accent), var(--color-coral), var(--color-teal), var(--color-accent))',
                backgroundSize: '300% auto',
                animation: 'shimmer-text 8s linear infinite',
              }}
            >
              Organized. Instantly.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 max-w-md text-ink-500"
          >
            MeetMind listens in on your call and pulls out decisions, owners,
            and next steps - so nothing said in the room gets lost after it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link to="/analyze?tab=text">
              <Button size="lg">
                <FileText className="h-4 w-4" /> Paste transcript
              </Button>
            </Link>
            <Link to="/analyze?tab=audio">
              <Button size="lg" variant="ghost">
                <Mic className="h-4 w-4" /> Upload audio
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 opacity-60"
          >
            <Waveform bars={36} className="h-10" />
          </motion.div>
        </div>

        {/* Right — the phone as hero object, with floating accent cards giving it context */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center py-10 lg:justify-end lg:py-4"
        >
          <div className="relative">
            {/* Floating card — action item just captured */}
            <motion.div
              initial={{ opacity: 0, x: -12, y: 8 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{ opacity: { duration: 0.6, delay: 0.6 }, x: { duration: 0.6, delay: 0.6 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 } }}
              className="surface absolute -left-8 top-10 z-20 hidden w-48 rounded-2xl p-3.5 sm:block lg:-left-14"
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-low text-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium leading-snug text-ink">Send contract to Acme</p>
                  <p className="mt-1 text-[10px] text-ink-300">Marcus · High priority</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card — AI note */}
            <motion.div
              initial={{ opacity: 0, x: 12, y: -8 }}
              animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
              transition={{ opacity: { duration: 0.6, delay: 0.8 }, x: { duration: 0.6, delay: 0.8 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 } }}
              className="surface absolute -right-6 bottom-16 z-20 hidden w-52 rounded-2xl p-3.5 sm:block lg:-right-12"
            >
              <div className="flex items-start gap-2">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-coral))' }}
                >
                  <Sparkles className="h-3 w-3" />
                </span>
                <p className="text-[11px] leading-snug text-ink-700">
                  <span className="font-semibold text-ink">MeetMind noted:</span> 3 decisions made this week
                </p>
              </div>
            </motion.div>

            <PhoneFrame>
              <VoiceCapturePreview />
            </PhoneFrame>
          </div>
        </motion.div>
      </section>
    </div>
  )
}