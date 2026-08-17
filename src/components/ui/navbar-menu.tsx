import { type ReactNode, type AnchorHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
} as const

export function MenuItem({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void
  active: string | null
  item: string
  children?: ReactNode
}) {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-sm font-medium text-ink-500 transition-colors hover:text-ink"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={transition}>
          {active === item && (
            <div className="absolute left-1/2 top-[calc(100%_+_1.2rem)] z-50 -translate-x-1/2 pt-2">
              <motion.div
                transition={transition}
                layoutId="active-nav-item"
                className="surface overflow-hidden rounded-2xl"
              >
                <motion.div layout className="h-full w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export function Menu({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void
  children: ReactNode
  className?: string
}) {
  return (
    <nav onMouseLeave={() => setActive(null)} className={cn('relative flex items-center gap-8', className)}>
      {children}
    </nav>
  )
}

export function ProductItem({
  title,
  description,
  href,
  src,
}: {
  title: string
  description: string
  href: string
  src: string
}) {
  return (
    <a href={href} className="flex space-x-2">
      <img src={src} width={140} height={70} alt={title} className="flex-shrink-0 rounded-md object-cover shadow-lg" />
      <div>
        <h4 className="mb-1 font-display text-base font-semibold text-ink">{title}</h4>
        <p className="max-w-[10rem] text-xs text-ink-500">{description}</p>
      </div>
    </a>
  )
}

export function HoveredLink({ children, className, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} className={cn('text-sm text-ink-500 transition-colors hover:text-ink', className)}>
      {children}
    </a>
  )
}