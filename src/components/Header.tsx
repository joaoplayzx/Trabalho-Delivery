import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, signOut } = useAuth()
  return (
    <header className="topbar">
      <a className="brand" href="/"><span className="brand-mark">S</span><span>Saborê<small>Painel do restaurante</small></span></a>
      <div className="user-area">
        <div className="user-avatar">{(user?.firstName || user?.username || 'R').charAt(0).toUpperCase()}</div>
        <span className="user-name">{user?.firstName || user?.username || 'Restaurante'}</span>
        <button className="button button-ghost button-small" onClick={signOut}>Sair</button>
      </div>
    </header>
  )
}
