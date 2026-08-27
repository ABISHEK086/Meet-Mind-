import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'

type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  /** Optional bold headline shown above the message. Omit for the simple single-line style. */
  title?: string
}

interface ToastItem {
  id: string
  message: string
  title?: string
  variant: ToastVariant
}

interface ToastAPI {
  success: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
  warning: (message: string, options?: ToastOptions) => void
  info: (message: string, options?: ToastOptions) => void
}

const ToastContext = createContext<ToastAPI | null>(null)

/**
 * Call from any component inside <ToastProvider>:
 *   const toast = useToast()
 *   toast.success('Saved')
 *   toast.error('Something went wrong', { title: 'Upload failed' })
 */
export function useToast(): ToastAPI {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within <ToastProvider>')
  }
  return ctx
}

const AUTO_DISMISS_MS = 4000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setItems((current) => current.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (variant: ToastVariant, message: string, options?: ToastOptions) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      setItems((current) => [...current, { id, message, title: options?.title, variant }])
      window.setTimeout(() => dismiss(id), AUTO_DISMISS_MS)
    },
    [dismiss]
  )

  const api: ToastAPI = {
    success: (message, options) => push('success', message, options),
    error: (message, options) => push('error', message, options),
    warning: (message, options) => push('warning', message, options),
    info: (message, options) => push('info', message, options),
  }

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport items={items} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

// Neutral ink tone for "info" rather than inventing an off-brand blue —
// MeetMind's palette is deliberately just red/teal/amber.
const variantConfig: Record<ToastVariant, { icon: typeof CheckCircle2; color: string }> = {
  success: { icon: CheckCircle2, color: 'var(--color-teal)' },
  error: { icon: XCircle, color: 'var(--color-high)' },
  warning: { icon: AlertTriangle, color: 'var(--color-amber)' },
  info: { icon: Info, color: 'var(--color-ink-500)' },
}

function ToastViewport({ items, onDismiss }: { items: ToastItem[]; onDismiss: (id: string) => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[200] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:items-end">
      <AnimatePresence>
        {items.map((item) => {
          const { icon: Icon, color } = variantConfig[item.variant]
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
              className="surface pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl p-4 pr-3"
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{ color, background: `color-mix(in srgb, ${color} 14%, transparent)` }}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                {item.title ? (
                  <>
                    <p className="text-sm font-semibold leading-snug text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-ink-500">{item.message}</p>
                  </>
                ) : (
                  <p className="text-sm leading-snug text-ink">{item.message}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => onDismiss(item.id)}
                aria-label="Dismiss"
                className="shrink-0 rounded-lg p-1 text-ink-300 transition-colors hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}