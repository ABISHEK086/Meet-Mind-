import { motion } from 'framer-motion'
import { FileText, CheckSquare, ClipboardList, type LucideIcon } from 'lucide-react'

export type MobilePanel = 'transcript' | 'actions' | 'summary'

const tabs: { id: MobilePanel; label: string; icon: LucideIcon }[] = [
  { id: 'transcript', label: 'Transcript', icon: FileText },
  { id: 'actions', label: 'Actions', icon: CheckSquare },
  { id: 'summary', label: 'Summary', icon: ClipboardList },
]

export function MobileNav({ active, onChange }: { active: MobilePanel; onChange: (p: MobilePanel) => void }) {
  return (
    <nav className="surface fixed inset-x-0 bottom-0 z-40 !rounded-none border-x-0 border-b-0 md:hidden">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex flex-1 flex-col items-center gap-1 py-3 text-xs"
          >
            {active === tab.id && (
              <motion.span layoutId="mobile-nav-pill" className="absolute inset-x-4 top-0 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-bright))' }} />
            )}
            <tab.icon className={`h-4 w-4 ${active === tab.id ? 'text-accent' : 'text-ink-300'}`} />
            <span className={active === tab.id ? 'font-medium text-ink' : 'text-ink-300'}>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}