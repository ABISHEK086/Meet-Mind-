import { useState } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import type { ActionItem, Priority } from '@/types'
import { PriorityBadge } from '@/components/ui/Badge'
import { useMeeting } from '@/store/MeetingContext'

const PRIORITIES: Priority[] = ['high', 'medium', 'low']

export function ActionCard({ action, index }: { action: ActionItem; index: number }) {
  const { toggleAction, updateAction, deleteAction } = useMeeting()
  const [editingOwner, setEditingOwner] = useState(false)
  const [ownerDraft, setOwnerDraft] = useState(action.owner)

  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-150, 0, 150],
    ['rgba(255,93,115,0.10)', 'rgba(255,255,255,0)', 'rgba(18,179,145,0.10)']
  )

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > 120) toggleAction(action.id)
    else if (info.offset.x < -120) deleteAction(action.id)
  }

  function commitOwner() {
    setEditingOwner(false)
    updateAction(action.id, { owner: ownerDraft.trim() || 'Unknown' })
  }

  function cyclePriority() {
    const next = PRIORITIES[(PRIORITIES.indexOf(action.priority) + 1) % PRIORITIES.length]
    updateAction(action.id, { priority: next })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
      style={{ x, background }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      className="group relative touch-pan-y rounded-xl border border-line bg-surface p-4 shadow-[0_1px_2px_rgba(20,18,45,0.03)]"
    >
      <div className="flex items-start gap-3">
        <button
          aria-label={action.done ? 'Mark incomplete' : 'Mark complete'}
          onClick={() => toggleAction(action.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
            action.done ? 'border-low bg-low text-white' : 'border-line-strong hover:border-accent'
          }`}
        >
          {action.done && (
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
              <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className={`text-sm leading-snug transition-all ${action.done ? 'text-ink-300 line-through' : 'text-ink'}`}>
            {action.task}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button onClick={cyclePriority} className="cursor-pointer">
              <PriorityBadge priority={action.priority} />
            </button>

            {editingOwner ? (
              <input
                autoFocus
                value={ownerDraft}
                onChange={(e) => setOwnerDraft(e.target.value)}
                onBlur={commitOwner}
                onKeyDown={(e) => e.key === 'Enter' && commitOwner()}
                className="w-24 rounded-md border border-accent/40 bg-accent-tint px-2 py-1 text-xs text-ink outline-none"
              />
            ) : (
              <button
                onClick={() => setEditingOwner(true)}
                className="rounded-full bg-surface-sunk px-2.5 py-1 text-[11px] text-ink-500 transition-colors hover:text-ink"
              >
                👤 {action.owner}
              </button>
            )}

            <input
              type="date"
              value={toDateInputValue(action.dueDate)}
              onChange={(e) => updateAction(action.id, { dueDate: e.target.value || null })}
              className="rounded-full bg-surface-sunk px-2.5 py-1 text-[11px] text-ink-500 outline-none hover:text-ink"
            />
          </div>
        </div>

        <button
          aria-label="Delete action"
          onClick={() => deleteAction(action.id)}
          className="text-ink-300 opacity-0 transition-opacity hover:text-high group-hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </motion.div>
  )
}

function toDateInputValue(due: string | null): string {
  if (!due) return ''
  const parsed = Date.parse(due)
  if (Number.isNaN(parsed)) return ''
  return new Date(parsed).toISOString().slice(0, 10)
}