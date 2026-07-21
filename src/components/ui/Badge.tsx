import type { Priority } from '@/types'

const config: Record<Priority, { label: string; dot: string; text: string; bg: string }> = {
  high: { label: 'High', dot: 'bg-high', text: 'text-high', bg: 'bg-coral-tint' },
  medium: { label: 'Medium', dot: 'bg-medium', text: 'text-medium', bg: 'bg-amber-tint' },
  low: { label: 'Low', dot: 'bg-low', text: 'text-low', bg: 'bg-teal-tint' },
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const c = config[priority]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${c.bg} ${c.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}