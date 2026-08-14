import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display font-semibold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet disabled:opacity-40 disabled:pointer-events-none'

const variants: Record<string, string> = {
  primary: 'text-white',
  ghost: 'text-ink glass hover:border-line-bright',
  outline: 'text-ink-dim border border-line bg-transparent hover:border-line-bright hover:text-ink',
}

const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.025, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <>
          <span
            className="absolute inset-0 -z-10"
            style={{ background: 'linear-gradient(120deg, var(--color-violet-deep), var(--color-magenta))' }}
          />
          <span
            className="absolute inset-0 -z-10 opacity-90 shadow-[0_8px_24px_rgba(124,92,255,0.45)]"
          />
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}