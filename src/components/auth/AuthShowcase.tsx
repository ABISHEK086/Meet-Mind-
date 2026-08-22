import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

// Real work/meeting photography — swap any of these for your own screenshots
// or product shots later; just keep the same 4-item shape.
const tiles = [
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    tag: 'Decision',
    color: 'var(--color-accent)',
    text: 'Ship v2 by Friday — team aligned on scope.',
  },
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
    tag: 'Action item',
    color: 'var(--color-teal)',
    text: 'Marcus to send the updated contract by tomorrow.',
  },
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    tag: 'Decision',
    color: 'var(--color-amber)',
    text: 'Design review moves to Thursdays going forward.',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    tag: 'Action item',
    color: 'var(--color-accent)',
    text: 'Dana to book the offsite venue — no rush.',
  },
]

export function AuthShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tiles.length)
    }, 2800)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-ink px-10 py-16 text-white lg:flex">
      <div
        className="drift absolute -left-1/4 top-0 h-[50vh] w-[50vh] rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, var(--color-accent-bright), transparent 70%)' }}
      />

      <div className="relative flex w-full max-w-sm flex-col items-center">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-display font-bold text-white"
            style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-bright))' }}
          >
            M
          </span>
          <span className="font-display text-lg font-bold tracking-tight">MeetMind</span>
        </div>

        {/* Image collage — one tall tile, two stacked, one wide */}
        <div className="relative mt-8 grid w-full grid-cols-[1.5fr_1fr] gap-2">
          <ImageTile src={tiles[0].src} active={activeIndex === 0} className="row-span-2 h-[220px]" />
          <ImageTile src={tiles[1].src} active={activeIndex === 1} className="h-[106px]" />
          <ImageTile src={tiles[3].src} active={activeIndex === 3} className="h-[106px]" />
          <ImageTile src={tiles[2].src} active={activeIndex === 2} className="col-span-2 h-[110px]" />
        </div>

        {/* Caption synced to the active tile */}
        <div className="relative mt-6 h-20 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: tiles[activeIndex].color }} />
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ background: `${tiles[activeIndex].color}22`, color: tiles[activeIndex].color }}
                >
                  {tiles[activeIndex].tag}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{tiles[activeIndex].text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-6 max-w-[280px] text-center text-xl leading-tight text-white">
          Every meeting, minus the busywork.
        </p>

        <div className="mt-8 flex gap-2">
          {tiles.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show highlight ${index + 1}`}
              className={index === activeIndex ? 'h-1 w-8 rounded-full bg-white' : 'h-1 w-3 rounded-full bg-white/30'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ImageTile({ src, active, className }: { src: string; active: boolean; className: string }) {
  return (
    <div className={`${className} relative overflow-visible rounded-md`}>
      <img
        src={src}
        alt=""
        className={`h-full w-full rounded-md object-cover transition-opacity duration-700 ${
          active ? 'opacity-100' : 'opacity-40'
        }`}
      />
      <FocusCorners active={active} />
    </div>
  )
}

function FocusCorners({ active }: { active: boolean }) {
  const base = `pointer-events-none absolute h-3.5 w-3.5 transition-all duration-500 ease-out ${
    active ? 'opacity-100' : 'opacity-0'
  }`
  const color = { borderColor: 'var(--color-accent-bright)' }

  return (
    <>
      <div className={`${base} -left-1.5 -top-1.5 border-l-2 border-t-2 ${active ? '' : '-translate-x-1.5 -translate-y-1.5'}`} style={color} />
      <div className={`${base} -right-1.5 -top-1.5 border-r-2 border-t-2 ${active ? '' : 'translate-x-1.5 -translate-y-1.5'}`} style={color} />
      <div className={`${base} -bottom-1.5 -left-1.5 border-b-2 border-l-2 ${active ? '' : '-translate-x-1.5 translate-y-1.5'}`} style={color} />
      <div className={`${base} -bottom-1.5 -right-1.5 border-b-2 border-r-2 ${active ? '' : 'translate-x-1.5 translate-y-1.5'}`} style={color} />
    </>
  )
}