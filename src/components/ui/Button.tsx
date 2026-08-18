import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

// Note: no disabled:opacity here on purpose — fading the whole button (background + white
// text together) makes both converge toward the page's white background and kills contrast.
// Each variant handles its own disabled treatment below instead.
const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display font-semibold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:cursor-not-allowed'

const variants: Record<string, string> = {
  // Text stays fully opaque; only the gradient background layer dims (via group-disabled below).
  primary: 'text-white shadow-[0_8px_24px_rgba(91,108,246,0.35)] disabled:shadow-none',
  ghost: 'text-ink surface hover:border-line-strong disabled:opacity-50',
  outline: 'text-ink-500 border border-line-strong bg-transparent hover:border-accent hover:text-accent disabled:opacity-50',
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
        <span
          className="absolute inset-0 -z-10 transition-opacity duration-200 group-disabled:opacity-50"
          style={{ background: 'linear-gradient(120deg, var(--color-accent), var(--color-accent-bright))' }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}