import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { token, loading } = useAuth()
  if (loading) return <div className="screen-center"><div className="spinner" /><p>Verificando acesso...</p></div>
  return token ? <Outlet /> : <Navigate to="/login" replace />
}
