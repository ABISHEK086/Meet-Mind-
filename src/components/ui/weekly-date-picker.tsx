import { useState, useMemo, forwardRef, type HTMLAttributes } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const getStartOfWeek = (date: Date): Date => {
  const newDate = new Date(date)
  const day = newDate.getDay()
  const diff = newDate.getDate() - day
  return new Date(newDate.setDate(diff))
}

const isSameDay = (date1: Date, date2: Date): boolean =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate()

interface WeeklyDatePickerProps extends HTMLAttributes<HTMLDivElement> {
  date: Date
  setDate: (date: Date) => void
  onClear?: () => void
}

export const WeeklyDatePicker = forwardRef<HTMLDivElement, WeeklyDatePickerProps>(
  ({ className, date, setDate, onClear, ...props }, ref) => {
    const [displayDate, setDisplayDate] = useState(getStartOfWeek(date))
    const [direction, setDirection] = useState<'next' | 'prev'>('next')

    const weekDays = useMemo(() => {
      const start = getStartOfWeek(displayDate)
      return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(start)
        day.setDate(start.getDate() + i)
        return day
      })
    }, [displayDate])

    function handlePrevWeek() {
      setDirection('prev')
      setDisplayDate((prev) => {
        const next = new Date(prev)
        next.setDate(prev.getDate() - 7)
        return next
      })
    }

    function handleNextWeek() {
      setDirection('next')
      setDisplayDate((prev) => {
        const next = new Date(prev)
        next.setDate(prev.getDate() + 7)
        return next
      })
    }

    function goToToday() {
      const today = new Date()
      setDirection(today < displayDate ? 'prev' : 'next')
      setDisplayDate(getStartOfWeek(today))
      setDate(today)
    }

    const animationVariants = {
      initial: (dir: 'next' | 'prev') => ({ opacity: 0, x: dir === 'next' ? 16 : -16 }),
      animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeInOut' as const } },
      exit: (dir: 'next' | 'prev') => ({
        opacity: 0,
        x: dir === 'next' ? -16 : 16,
        transition: { duration: 0.2, ease: 'easeInOut' as const },
      }),
    }

    return (
      <div ref={ref} className={cn('surface w-52 rounded-2xl p-4', className)} {...props}>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-sm font-semibold text-ink">
            {displayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </p>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={handlePrevWeek}
              aria-label="Previous week"
              className="flex h-7 w-7 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-surface-sunk hover:text-ink"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNextWeek}
              aria-label="Next week"
              className="flex h-7 w-7 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-surface-sunk hover:text-ink"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative h-[68px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={displayDate.toISOString()}
              className="absolute grid w-full grid-cols-7 gap-1"
              custom={direction}
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {weekDays.map((day) => (
                <div
                  key={`initial-${day.toISOString()}`}
                  className="text-center text-[10px] font-medium uppercase tracking-wide text-ink-300"
                >
                  {day.toLocaleString('default', { weekday: 'narrow' })}
                </div>
              ))}

              {weekDays.map((day) => {
                const isSelected = isSameDay(day, date)
                const isToday = isSameDay(day, new Date())
                return (
                  <button
                    key={`day-${day.toISOString()}`}
                    type="button"
                    onClick={() => setDate(day)}
                    aria-pressed={isSelected}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center justify-self-center rounded-full text-xs font-medium transition-colors',
                      isSelected ? 'text-white' : isToday ? 'text-accent' : 'text-ink-700 hover:bg-surface-sunk'
                    )}
                    style={
                      isSelected
                        ? { background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-bright))' }
                        : undefined
                    }
                  >
                    {String(day.getDate()).padStart(2, '0')}
                  </button>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <button type="button" onClick={goToToday} className="text-xs font-medium text-accent hover:underline">
            Today
          </button>
          {onClear && (
            <button type="button" onClick={onClear} className="text-xs font-medium text-ink-500 hover:text-ink">
              Clear
            </button>
          )}
        </div>
      </div>
    )
  }
)

WeeklyDatePicker.displayName = 'WeeklyDatePicker'