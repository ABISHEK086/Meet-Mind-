import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { MeetingResult, ActionItem } from '@/types'
import { analyzeMeeting } from '@/lib/groq'

interface MeetingContextValue {
  result: MeetingResult | null
  loading: boolean
  error: string | null
  analyze: (transcript: string) => Promise<void>
  toggleAction: (id: string) => void
  updateAction: (id: string, patch: Partial<ActionItem>) => void
  deleteAction: (id: string) => void
  addAction: (task: string) => void
  reorderActions: (from: number, to: number) => void
  reset: () => void
}

const MeetingContext = createContext<MeetingContextValue | null>(null)

export function MeetingProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<MeetingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyze = useCallback(async (transcript: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await analyzeMeeting(transcript)
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong analyzing this meeting.')
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleAction = useCallback((id: string) => {
    setResult((prev) =>
      prev
        ? { ...prev, actions: prev.actions.map((a) => (a.id === id ? { ...a, done: !a.done } : a)) }
        : prev
    )
  }, [])

  const updateAction = useCallback((id: string, patch: Partial<ActionItem>) => {
    setResult((prev) =>
      prev ? { ...prev, actions: prev.actions.map((a) => (a.id === id ? { ...a, ...patch } : a)) } : prev
    )
  }, [])

  const deleteAction = useCallback((id: string) => {
    setResult((prev) => (prev ? { ...prev, actions: prev.actions.filter((a) => a.id !== id) } : prev))
  }, [])

  const addAction = useCallback((task: string) => {
    setResult((prev) =>
      prev
        ? {
            ...prev,
            actions: [
              ...prev.actions,
              { id: crypto.randomUUID(), task, owner: 'Unknown', priority: 'medium', dueDate: null, done: false },
            ],
          }
        : prev
    )
  }, [])

  const reorderActions = useCallback((from: number, to: number) => {
    setResult((prev) => {
      if (!prev) return prev
      const next = [...prev.actions]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return { ...prev, actions: next }
    })
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return (
    <MeetingContext.Provider
      value={{ result, loading, error, analyze, toggleAction, updateAction, deleteAction, addAction, reorderActions, reset }}
    >
      {children}
    </MeetingContext.Provider>
  )
}

export function useMeeting() {
  const ctx = useContext(MeetingContext)
  if (!ctx) throw new Error('useMeeting must be used within MeetingProvider')
  return ctx
}
