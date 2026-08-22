const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export interface User {
  id: number
  first_name: string | null
  last_name: string | null
  email: string
  is_verified: boolean
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    let detail = 'Something went wrong'
    try {
      const body = await res.json()
      detail = body.detail ?? detail
    } catch {
      // response wasn't JSON, keep the default message
    }
    throw new ApiError(detail, res.status)
  }

  return res.json() as Promise<T>
}

export function signup(data: {
  first_name: string
  last_name: string
  email: string
  password: string
}): Promise<AuthResponse> {
  return request('/auth/signup', { method: 'POST', body: JSON.stringify(data) })
}

export function login(data: { email: string; password: string }): Promise<AuthResponse> {
  return request('/auth/login', { method: 'POST', body: JSON.stringify(data) })
}

export function getMe(token: string): Promise<User> {
  return request('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
}

export function googleLoginUrl(): string {
  return `${API_URL}/auth/google/login`
}

// --- token storage helpers ---
const TOKEN_KEY = 'meetmind_token'

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export { ApiError }