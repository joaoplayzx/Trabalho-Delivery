import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { LoginResponse } from '../types'
import { getCurrentUser, login as loginRequest } from '../services/api'

interface AuthContextValue {
  user: LoginResponse | null
  token: string | null
  loading: boolean
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('saborê-token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const currentUser = await getCurrentUser(token)
        setUser(currentUser)
      } catch {
        localStorage.removeItem('saborê-token')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    void checkSession()
  }, [token])

  async function signIn(username: string, password: string) {
    const data = await loginRequest(username, password)
    localStorage.setItem('saborê-token', data.accessToken)
    setToken(data.accessToken)
    setUser(data)
  }

  function signOut() {
    localStorage.removeItem('saborê-token')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({ user, token, loading, signIn, signOut }), [user, token, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth precisa ser usado dentro de AuthProvider.')
  return context
}
