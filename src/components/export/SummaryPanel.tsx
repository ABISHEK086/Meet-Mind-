import { useMeeting } from '@/store/MeetingContext'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button' 
import { ArrowRight } from 'lucide-react'
 
export function SummaryPanel() {
  const { result } = useMeeting()
  if (!result) return null

  const nextSteps = result.actions.filter((a) => !a.done).slice(0, 5)

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-ink-faint">Summary</h2>

      <div className="space-y-6 overflow-y-auto pr-1">
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet">Overview</h3>
          <p className="text-sm leading-relaxed text-ink-dim">{result.summary}</p>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan">Key decisions</h3>
          <ul className="space-y-2">
            {result.decisions.map((d, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-dim">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                {d}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-medium">Next steps</h3>
          <ul className="space-y-2">
            {nextSteps.map((a) => (
              <li key={a.id} className="flex gap-2 text-sm text-ink-dim">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-medium" />
                {a.task} <span className="text-ink-faint">— {a.owner}</span>
              </li>
            ))}
            {nextSteps.length === 0 && <li className="text-sm text-ink-faint">Everything's wrapped up.</li>}
          </ul>
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
