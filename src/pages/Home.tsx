import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Waveform } from '@/components/ui/Waveform'
import { Card } from '@/components/ui/Card'
import { PriorityBadge } from '@/components/ui/Badge'

const steps = [
  { n: '01', title: 'Paste or upload', body: 'Drop in a transcript or an audio recording — no setup required.', glow: 'violet' as const },
  { n: '02', title: 'MeetMind listens', body: 'Whisper transcribes, then a language model reads for intent.', glow: 'magenta' as const },
  { n: '03', title: 'Leave with a plan', body: 'Owners, priorities, and due dates land in one shareable board.', glow: 'cyan' as const },
]

const features = [
  { icon: '🎙️', title: 'Any input', body: 'Paste text or drop an audio file — same result either way.', glow: 'violet' as const },
  { icon: '⚡', title: 'Instant structure', body: 'Action items, owners and priorities extracted in seconds.', glow: 'magenta' as const },
  { icon: '📤', title: 'Export anywhere', body: 'Markdown, PDF, or a shareable link — pick what fits your workflow.', glow: 'cyan' as const },
]

const previewRows = [
  { task: 'Send updated contract to Acme', owner: 'Marcus', priority: 'high' as const },
  { task: 'Book venue for the offsite', owner: 'Dana', priority: 'low' as const },
  { task: 'Move design review to Thursdays', owner: 'Priya', priority: 'medium' as const },
]

export function Home() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const spotlight = useTransform([mx, my], ([x, y]: number[]) => `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgba(167,139,250,0.16), transparent 60%)`)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <div className="relative">
      <section
        onMouseMove={handleMouseMove}
        className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-28 pt-20 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
      >
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

        {/* Left — headline, off-center rather than the usual dead-center hero */}
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-ink-dim"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Whisper + LLaMA, running the moment you hit go
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            Your meetings,
            <br />
            <span
              className="bg-clip-text italic text-transparent"
              style={{
                backgroundImage: 'linear-gradient(100deg, var(--color-violet), var(--color-magenta), var(--color-cyan), var(--color-violet))',
                backgroundSize: '300% auto',
                animation: 'shimmer-text 8s linear infinite',
              }}
            >
              held in glass.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 max-w-md text-ink-faint"
          >
            Paste a transcript or drop in a recording. MeetMind pulls out decisions, owners,
            and next steps — so nothing said in the room gets lost after it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link to="/analyze?tab=text">
              <Button size="lg">📋 Paste transcript</Button>
            </Link>
            <Link to="/analyze?tab=audio">
              <Button size="lg" variant="ghost">🎙️ Upload audio</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 opacity-70"
          >
            <Waveform bars={36} className="h-10" />
          </motion.div>
        </div>

        {/* Right — an actual product preview instead of generic floating toast chips */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <Card glow="violet" className="grain relative overflow-hidden p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-xs font-semibold uppercase tracking-wide text-ink-faint">Action items</span>
              <span className="text-[11px] text-ink-faint">3 open</span>
            </div>
            <div className="space-y-3">
              {previewRows.map((row, i) => (
                <motion.div
                  key={row.task}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                  className="glass-inset rounded-xl p-3.5"
                >
                  <p className="text-sm text-ink">{row.task}</p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <PriorityBadge priority={row.priority} />
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-ink-faint">👤 {row.owner}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
          {/* A second, smaller glass shard peeking from behind for depth */}
          <div
            aria-hidden="true"
            className="glass absolute -right-4 -top-4 -z-10 h-full w-full rounded-3xl opacity-40"
            style={{ transform: 'rotate(4deg)' }}
          />
        </motion.div>
      </section>

      <section id="how-it-works" className="relative mx-auto max-w-5xl px-6 pb-28">
        <h2 className="mb-12 text-center font-display text-sm font-semibold uppercase tracking-widest text-ink-faint">
          How it works
        </h2>
        <div className="relative grid gap-6 sm:grid-cols-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-[26px] hidden h-px sm:block"
            style={{ background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.14) 0 6px, transparent 6px 12px)' }}
          />
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card glow={step.glow} className="relative p-6">
                <span
                  className="font-display flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-magenta))' }}
                >
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-faint">{step.body}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="features" className="relative mx-auto max-w-5xl px-6 pb-32">
        <h2 className="mb-12 text-center font-display text-sm font-semibold uppercase tracking-widest text-ink-faint">
          Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card glow={f.glow} className="relative overflow-hidden p-6">
                <div className="glass-inset flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {f.icon}
                </div>
                <h3 className="mt-4 font-display text-base font-medium text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-faint">{f.body}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}