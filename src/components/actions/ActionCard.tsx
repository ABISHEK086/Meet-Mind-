import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { Check, Calendar, X } from 'lucide-react'
import type { ActionItem, Priority } from '@/types'
import { WeeklyDatePicker } from '@/components/ui/weekly-date-picker'
import { useMeeting } from '@/store/MeetingContext'

const PRIORITIES: Priority[] = ['high', 'medium', 'low']

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string }> = {
  high: { label: 'High', color: 'var(--color-high)' },
  medium: { label: 'Medium', color: 'var(--color-medium)' },
  low: { label: 'Low', color: 'var(--color-low)' },
}

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

function formatDueDate(due: string | null): string | null {
  if (!due) return null
  const parsed = Date.parse(due)
  if (Number.isNaN(parsed)) return due
  return new Date(parsed).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function ActionCard({ action, index }: { action: ActionItem; index: number }) {
  const { toggleAction, updateAction, deleteAction } = useMeeting()
  const [editingOwner, setEditingOwner] = useState(false)
  const [ownerDraft, setOwnerDraft] = useState(action.owner)
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const dateRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-150, 0, 150],
    ['rgba(255,81,112,0.10)', 'rgba(255,255,255,0)', 'rgba(22,185,129,0.10)']
  )

  useEffect(() => {
    if (!datePickerOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setDatePickerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [datePickerOpen])

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

  const priority = PRIORITY_CONFIG[action.priority]
  const dueLabel = formatDueDate(action.dueDate)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      style={{ x, background, borderLeftColor: priority.color }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      className="group relative touch-pan-y rounded-xl border-l-[3px] bg-surface p-3.5 shadow-[0_1px_2px_rgba(20,16,14,0.04)]"
    >
      <div className="flex items-start gap-3">
        <button
          aria-label={action.done ? 'Mark incomplete' : 'Mark complete'}
          onClick={() => toggleAction(action.id)}
          className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-colors ${
            action.done ? 'border-low bg-low text-white' : 'border-line-strong hover:border-accent'
          }`}
        >
          {action.done && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
        </button>

        <div className="min-w-0 flex-1">
          <p className={`text-sm leading-snug transition-all ${action.done ? 'text-ink-300 line-through' : 'text-ink'}`}>
            {action.task}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {/* Priority — a dot and label, no pill background */}
            <button
              onClick={cyclePriority}
              className="flex items-center gap-1.5 text-[11px] font-medium transition-opacity hover:opacity-70"
              style={{ color: priority.color }}
            >
              <span className="h-[6px] w-[6px] rounded-full" style={{ background: priority.color }} />
              {priority.label}
            </button>

            {/* Owner — a real avatar circle, not an emoji-in-a-pill */}
            {editingOwner ? (
              <input
                autoFocus
                value={ownerDraft}
                onChange={(e) => setOwnerDraft(e.target.value)}
                onBlur={commitOwner}
                onKeyDown={(e) => e.key === 'Enter' && commitOwner()}
                className="w-24 rounded-md border border-accent/40 bg-accent-tint px-1.5 py-0.5 text-xs text-ink outline-none"
              />
            ) : (
              <button
                onClick={() => setEditingOwner(true)}
                className="flex items-center gap-1.5 text-[11px] text-ink-500 transition-colors hover:text-ink"
              >
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white"
                  style={{ background: avatarColor(action.owner) }}
                >
                  {initials(action.owner)}
                </span>
                {action.owner}
              </button>
            )}

            {/* Due date — a real popover calendar instead of the native OS date input */}
            <div ref={dateRef} className="relative">
              <button
                type="button"
                onClick={() => setDatePickerOpen((open) => !open)}
                className="flex items-center gap-1 text-[11px] text-ink-500 transition-colors hover:text-ink"
              >
                <Calendar className="h-3 w-3" />
                {dueLabel ?? <span className="text-ink-300 group-hover:text-ink-500">Set date</span>}
              </button>

              {datePickerOpen && (
                <div className="absolute left-0 top-full z-50 mt-2">
                  <WeeklyDatePicker
                    date={action.dueDate ? new Date(action.dueDate) : new Date()}
                    setDate={(d) => {
                      updateAction(action.id, { dueDate: d.toISOString() })
                      setDatePickerOpen(false)
                    }}
                    onClear={() => {
                      updateAction(action.id, { dueDate: null })
                      setDatePickerOpen(false)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          aria-label="Delete action"
          onClick={() => deleteAction(action.id)}
          className="text-ink-300 opacity-0 transition-opacity hover:text-high group-hover:opacity-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  )
}