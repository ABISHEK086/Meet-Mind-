import { useMeeting } from '@/store/MeetingContext'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
 
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
          <ul className="space-y-2">
            {result.decisions.map((d, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-700">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {d}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-medium">Next steps</h3>
          <ul className="space-y-2">
            {nextSteps.map((a) => (
              <li key={a.id} className="flex gap-2 text-sm text-ink-700">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-medium" />
                {a.task} <span className="text-ink-300">— {a.owner}</span>
              </li>
            ))}
            {nextSteps.length === 0 && <li className="text-sm text-ink-300">Everything's wrapped up.</li>}
          </ul>
        </section>
      </div>

      <Link to="/export" className="mt-6">
        <Button className="w-full">Export meeting →</Button>
      </Link>
    </div>
  )
}
