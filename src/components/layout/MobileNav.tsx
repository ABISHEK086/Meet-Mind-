import { motion } from 'framer-motion'

export type MobilePanel = 'transcript' | 'actions' | 'summary'

const tabs: { id: MobilePanel; label: string; icon: string }[] = [
  { id: 'transcript', label: 'Transcript', icon: '📝' },
  { id: 'actions', label: 'Actions', icon: '✅' },
  { id: 'summary', label: 'Summary', icon: '📋' },
]

export function MobileNav({ active, onChange }: { active: MobilePanel; onChange: (p: MobilePanel) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur-xl md:hidden">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex flex-1 flex-col items-center gap-1 py-3 text-xs"
          >
            {active === tab.id && (
              <motion.span layoutId="mobile-nav-pill" className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-accent" />
            )}
            <span className={active === tab.id ? 'scale-110' : 'opacity-50'}>{tab.icon}</span>
            <span className={active === tab.id ? 'font-medium text-ink' : 'text-ink-300'}>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}