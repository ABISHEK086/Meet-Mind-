import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { saveToken } from '@/lib/api'
import { useToast } from '@/components/ui/Toast'

export function OAuthSuccess() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      saveToken(token)
      toast.success('Signed in with Google.')
      navigate('/', { replace: true })
    } else {
      toast.error('Google sign-in failed. Please try again.')
      navigate('/signin', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, navigate])

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center">
      <p className="text-sm text-ink-500">Signing you in…</p>
    </div>
  )
}