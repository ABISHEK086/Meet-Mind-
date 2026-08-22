import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { saveToken } from '@/lib/api'

export function OAuthSuccess() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      saveToken(token)
      navigate('/', { replace: true })
    } else {
      navigate('/signin', { replace: true })
    }
  }, [params, navigate])

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center">
      <p className="text-sm text-ink-500">Signing you in…</p>
    </div>
  )
}