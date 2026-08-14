import type { Priority } from '@/types'

const config: Record<Priority, { label: string; dot: string; text: string; bg: string; border: string }> = {
  high: { label: 'High', dot: 'bg-high', text: 'text-high', bg: 'bg-high/10', border: 'border-high/25' },
  medium: { label: 'Medium', dot: 'bg-medium', text: 'text-medium', bg: 'bg-medium/10', border: 'border-medium/25' },
  low: { label: 'Low', dot: 'bg-low', text: 'text-low', bg: 'bg-low/10', border: 'border-low/25' },
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const c = config[priority]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${c.bg} ${c.text} ${c.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}