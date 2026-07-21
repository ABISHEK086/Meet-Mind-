import { motion } from 'framer-motion'

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="relative flex gap-1 rounded-full border border-line bg-surface-sunk p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative z-10 flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
            active === tab.id ? 'text-white' : 'text-ink-500 hover:text-ink'
          }`}
        >
          {active === tab.id && (
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 -z-10 rounded-full bg-ink"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}