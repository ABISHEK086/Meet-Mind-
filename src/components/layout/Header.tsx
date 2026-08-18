import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mic, Zap, Share2 } from 'lucide-react'
import { Menu, MenuItem } from '@/components/ui/navbar-menu'

const steps = [
  { n: '01', title: 'Paste or upload', body: 'Drop in a transcript or an audio recording — no setup required.' },
  { n: '02', title: 'MeetMind listens', body: 'Whisper transcribes, then a language model reads for intent.' },
  { n: '03', title: 'Leave with a plan', body: 'Owners, priorities, and due dates land in one shareable board.' },
]

const features = [
  { icon: Mic, title: 'Any input', body: 'Paste text or drop an audio file — same result either way.' },
  { icon: Zap, title: 'Instant structure', body: 'Action items, owners and priorities extracted in seconds.' },
  { icon: Share2, title: 'Export anywhere', body: 'Markdown, PDF, or a shareable link — pick what fits your workflow.' },
]

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [active, setActive] = useState<string | null>(null)

  return (
    <header className="surface sticky top-0 z-40 border-x-0 border-t-0 !rounded-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-display font-bold text-white"
            style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-bright))' }}
          >
            M
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">MeetMind</span>
        </Link>

        {isHome ? (
          <Menu setActive={setActive} className="hidden sm:flex">
            <MenuItem setActive={setActive} active={active} item="How it works">
              <div className="flex w-72 flex-col gap-4">
                {steps.map((step) => (
                  <div key={step.n} className="flex gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-bright))' }}
                    >
                      {step.n}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{step.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-500">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Features">
              <div className="flex w-72 flex-col gap-4">
                {features.map((f) => (
                  <div key={f.title} className="flex gap-3">
                    <span className="surface-sunk flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-500">
                      <f.icon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{f.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-500">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MenuItem>
          </Menu>
        ) : (
          <Link to="/analyze" className="text-sm font-medium text-ink-500 transition-colors hover:text-ink">
            New meeting
          </Link>
        )}
      </div>
    </header>
  )
}