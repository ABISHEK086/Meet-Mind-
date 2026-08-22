import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '@/lib/api'

export function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation()
  const token = getToken()

  if (!token) {
    return <Navigate to="/signup" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}

export function RedirectIfAuthed({ children }: { children: ReactNode }) {
  const token = getToken()

  if (token) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}