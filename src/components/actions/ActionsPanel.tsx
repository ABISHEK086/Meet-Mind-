import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { ActionItem, Priority } from '@/types'
import { useMeeting } from '@/store/MeetingContext'
import { ActionCard } from './ActionCard'

const GROUPS: { key: Priority; label: string; color: string }[] = [
  { key: 'high', label: 'High priority', color: 'var(--color-high)' },
  { key: 'medium', label: 'Medium priority', color: 'var(--color-medium)' },
  { key: 'low', label: 'Low priority', color: 'var(--color-low)' },
]

function groupByPriority(actions: ActionItem[]) {
  return GROUPS.map((group) => ({
    ...group,
    items: actions.filter((a) => a.priority === group.key),
  })).filter((group) => group.items.length > 0)
}

export function ActionsPanel() {
  const { result, addAction } = useMeeting()
  const [draft, setDraft] = useState('')

  const groups = useMemo(() => (result ? groupByPriority(result.actions) : []), [result])

  if (!result) return null
  const remaining = result.actions.filter((a) => !a.done).length

  function submit() {
    if (!draft.trim()) return
    addAction(draft.trim())
    setDraft('')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-500">Action items</h2>
        <span className="text-xs text-ink-300">{remaining} open</span>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {groups.map((group) => (
          <div key={group.key}>
            <div className="mb-2 flex items-center gap-2 px-0.5">
              <span className="h-[6px] w-[6px] rounded-full" style={{ background: group.color }} />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-300">{group.label}</span>
              <span className="text-[11px] text-ink-300">· {group.items.length}</span>
            </div>
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {group.items.map((action) => (
                  <ActionCard key={action.id} action={action} index={0} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}

        {result.actions.length === 0 && (
          <p className="py-8 text-center text-sm text-ink-300">No action items yet — add one below.</p>
        )}
      </div>

      <motion.div layout className="mt-4 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Add an action item…"
          className="surface-sunk flex-1 rounded-full px-4 py-2.5 text-sm text-ink placeholder:text-ink-300 outline-none focus:border-accent/50"
        />
        <button
          onClick={submit}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-bright))' }}
          aria-label="Add action item"
        >
          <Plus className="h-5 w-5" />
        </button>
      </motion.div>
    </div>
  )
}