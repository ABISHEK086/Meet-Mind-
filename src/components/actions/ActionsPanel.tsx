import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMeeting } from '@/store/MeetingContext'
import { ActionCard } from './ActionCard'
import { Plus } from 'lucide-react'

export function ActionsPanel() {
  const { result, addAction } = useMeeting()
  const [draft, setDraft] = useState('')

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
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-faint">Action items</h2>
        <span className="text-xs text-ink-faint">{remaining} open</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {result.actions.map((action, i) => (
            <ActionCard key={action.id} action={action} index={i} />
          ))}
        </AnimatePresence>
        {result.actions.length === 0 && (
          <p className="py-8 text-center text-sm text-ink-faint">No action items yet - add one below.</p>
        )}
      </div>

      <motion.div layout className="mt-4 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Add an action item…"
          className="glass-inset flex-1 rounded-full px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-violet/50"
        />
       <button onClick={submit} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-bright))' }} aria-label="Add action item">
  <Plus className="h-5 w-5" />
</button>
      </motion.div>
    </div>
  )
}