import { useMeeting } from '@/store/MeetingContext'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Priority } from '@/types'

const AVATAR_HUES = ['#5b6cf6', '#ff7a59', '#16b981', '#d98c1f', '#8b5cf6', '#0ea5e9']

function avatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i) * (i + 1)) % AVATAR_HUES.length
  return AVATAR_HUES[hash]
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const PRIORITY_COLOR: Record<Priority, string> = {
  high: 'var(--color-high)',
  medium: 'var(--color-medium)',
  low: 'var(--color-low)',
}

export function SummaryPanel() {
  const { result } = useMeeting()
  if (!result) return null

  const nextSteps = result.actions.filter((a) => !a.done).slice(0, 5)

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-ink-500">Summary</h2>

      <div className="space-y-6 overflow-y-auto pr-1">
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">Overview</h3>
          <p className="text-sm leading-relaxed text-ink-700">{result.summary}</p>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal">Key decisions</h3>
          <div className="space-y-1.5">
            {result.decisions.map((d, i) => (
              <div key={i} className="surface-sunk flex items-start gap-2 rounded-lg px-2.5 py-2">
                <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-teal" />
                <p className="text-[13px] leading-relaxed text-ink-700">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-medium">Next steps</h3>
          <div className="space-y-1.5">
            {nextSteps.map((a) => (
              <div key={a.id} className="surface-sunk rounded-lg px-2.5 py-2">
                <div className="flex items-start gap-2">
                  <span
                    className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full"
                    style={{ background: PRIORITY_COLOR[a.priority] }}
                  />
                  <p className="text-[13px] leading-relaxed text-ink-700">{a.task}</p>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 pl-[13px]">
                  <span
                    className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[9px] font-bold leading-none text-white"
                    style={{ background: avatarColor(a.owner) }}
                  >
                    {initials(a.owner)}
                  </span>
                  <span className="truncate text-[11px] text-ink-500">{a.owner}</span>
                </div>
              </div>
            ))}
            {nextSteps.length === 0 && <p className="px-0.5 text-sm text-ink-300">Everything's wrapped up.</p>}
          </div>
        </section>
      </div>

      <Link to="/export" className="mt-6">
        <Button className="w-full">
          Export meeting <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}