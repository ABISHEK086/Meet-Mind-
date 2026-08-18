import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Waveform } from '@/components/ui/Waveform'
import { PhoneFrame } from '@/components/ui/PhoneFrame'
import { VoiceCapturePreview } from '@/components/ui/VoiceCapturePreview'
import { FileText, Mic } from 'lucide-react'

export function Home() {
  return (
    <div className="relative">
      <section className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-28 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
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

        {/* Right — a real phone mockup of MeetMind capturing a live call */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <PhoneFrame>
            <VoiceCapturePreview />
          </PhoneFrame>
        </motion.div>
      </section>
    </div>
  )
}