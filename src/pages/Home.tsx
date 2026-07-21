import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Waveform } from '@/components/ui/Waveform'

const floatingCards = [
  { text: 'Ship v2 by Friday', owner: 'Priya', delay: 0, x: '4%', tint: 'lavender' },
  { text: 'Send updated contract', owner: 'Marcus', delay: 1.4, x: '68%', tint: 'mint' },
  { text: 'Book venue for offsite', owner: 'Dana', delay: 2.6, x: '38%', tint: 'lavender' },
] as const

const steps = [
  { n: '01', title: 'Paste or upload', body: 'Drop in a transcript or an audio recording — no setup required.' },
  { n: '02', title: 'MeetMind listens', body: 'Whisper transcribes, then a language model reads for intent.' },
  { n: '03', title: 'Leave with a plan', body: 'Owners, priorities, and due dates land in one shareable board.' },
]

const features = [
  { icon: '🎙️', title: 'Any input', body: 'Paste text or drop an audio file — same result either way.', tint: 'lavender' },
  { icon: '⚡', title: 'Instant structure', body: 'Action items, owners and priorities extracted in seconds.', tint: 'mint' },
  { icon: '📤', title: 'Export anywhere', body: 'Markdown, PDF, or a shareable link — pick what fits your workflow.', tint: 'lavender' },
] as const

export function Home() {
  return (
    <div className="relative overflow-hidden bg-bg">
      {/* Ambient drifting color field behind the hero — the "color animation" signature */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden">
        <div
          className="hue-drift absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full opacity-[0.35] blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-accent-bright), transparent 70%)' }}
        />
        <div
          className="hue-drift absolute -right-1/4 top-0 h-[560px] w-[560px] rounded-full opacity-[0.3] blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-teal), transparent 70%)', animationDelay: '3s' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-28 -z-10 flex justify-center opacity-40">
        <Waveform bars={70} className="h-40 w-full max-w-4xl" />
      </div>

      <section className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-28 pt-20 text-center sm:pt-32">
        {floatingCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: [-6, -18, -6], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, delay: card.delay, repeat: Infinity, ease: 'easeInOut' }}
            className={`surface absolute hidden rounded-xl px-4 py-2.5 text-xs text-ink-700 sm:block ${
              card.tint === 'lavender' ? 'bg-accent-tint' : 'bg-teal-tint'
            }`}
            style={{ left: card.x, top: `${8 + i * 10}%` }}
          >
            <span className="mr-1.5">✅</span>
            {card.text} <span className="text-ink-300">· {card.owner}</span>
          </motion.div>
        ))}

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium text-ink-500"
        >
          Whisper + LLaMA, running the moment you hit go
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl"
        >
          Your meetings.
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, var(--color-accent), var(--color-teal), var(--color-accent))',
              backgroundSize: '200% auto',
              animation: 'shimmer 6s linear infinite',
            }}
          >
            Organized. Instantly.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-lg text-ink-500"
        >
          Paste a transcript or drop in a recording. MeetMind pulls out decisions, owners,
          and next steps — so nothing said in the room gets lost after it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link to="/analyze?tab=text">
            <Button size="lg">📋 Paste transcript</Button>
          </Link>
          <Link to="/analyze?tab=audio">
            <Button size="lg" variant="outline">🎙️ Upload audio</Button>
          </Link>
        </motion.div>
      </section>

      <section id="how-it-works" className="relative mx-auto max-w-5xl px-6 pb-28">
        <h2 className="mb-12 text-center font-display text-sm font-semibold uppercase tracking-widest text-ink-300">
          How it works
        </h2>
        <div className="relative grid gap-6 sm:grid-cols-3">
          {/* Connecting flow line — this genuinely is a sequence, so the thread earns its place */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-[26px] hidden h-px sm:block"
            style={{ background: 'repeating-linear-gradient(90deg, var(--color-line-strong) 0 6px, transparent 6px 12px)' }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="surface relative rounded-2xl p-6 transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <span
                className="font-display flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, var(--color-accent-bright), var(--color-teal))' }}
              >
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="features" className="relative mx-auto max-w-5xl px-6 pb-32">
        <h2 className="mb-12 text-center font-display text-sm font-semibold uppercase tracking-widest text-ink-300">
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
              className={`group relative overflow-hidden rounded-2xl border border-line p-6 transition-shadow hover:shadow-[var(--shadow-lift)] ${
                f.tint === 'lavender' ? 'bg-accent-tint' : 'bg-teal-tint'
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                  f.tint === 'lavender' ? 'bg-surface' : 'bg-surface'
                }`}
              >
                {f.icon}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.body}</p>
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                style={{ background: f.tint === 'lavender' ? 'var(--color-accent-bright)' : 'var(--color-teal)' }}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}