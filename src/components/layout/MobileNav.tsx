import { motion } from 'framer-motion'

export type MobilePanel = 'transcript' | 'actions' | 'summary'

const tabs: { id: MobilePanel; label: string; icon: string }[] = [
  { id: 'transcript', label: 'Transcript', icon: '📝' },
  { id: 'actions', label: 'Actions', icon: '✅' },
  { id: 'summary', label: 'Summary', icon: '📋' },
]

export function MobileNav({ active, onChange }: { active: MobilePanel; onChange: (p: MobilePanel) => void }) {
  return (
    <nav className="glass fixed inset-x-0 bottom-0 z-40 !rounded-none border-x-0 border-b-0 md:hidden">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex flex-1 flex-col items-center gap-1 py-3 text-xs"
          >
            {active === tab.id && (
              <motion.span
                layoutId="mobile-nav-pill"
                className="absolute inset-x-4 top-0 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--color-violet), var(--color-magenta))' }}
              />
            )}
            <span className={active === tab.id ? 'scale-110' : 'opacity-50'}>{tab.icon}</span>
            <span className={active === tab.id ? 'font-medium text-ink' : 'text-ink-faint'}>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}