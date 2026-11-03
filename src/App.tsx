import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Menu from './pages/Menu'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/cardapio" element={<Menu />} />
      </Route>
      <Route path="*" element={<Navigate to="/cardapio" replace />} />
    </Routes>
  )
}
