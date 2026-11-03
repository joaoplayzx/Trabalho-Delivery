import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn, token } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (token) return <Navigate to="/cardapio" replace />

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(username, password)
      navigate('/cardapio', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="visual-brand"><span className="brand-mark">S</span> Saborê</div>
        <div className="visual-copy"><span className="eyebrow light">SEU RESTAURANTE, NO CONTROLE</span><h1>Um bom prato<br />começa com<br /><em>organização.</em></h1><p>Gerencie seu cardápio de um jeito simples, rápido e gostoso.</p></div>
        <div className="visual-bottom">Feito para quem transforma ingredientes em experiências.</div>
      </section>
      <section className="login-panel">
        <div className="login-box">
          <span className="eyebrow">ÁREA DO PARCEIRO</span>
          <h2>Bem-vindo de volta!</h2>
          <p className="muted">Entre para cuidar do seu cardápio.</p>
          <form onSubmit={submit} className="login-form">
            <label>Usuário<input autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Seu usuário" /></label>
            <label>Senha<input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Sua senha" /></label>
            {error && <div className="alert alert-error" role="alert">{error}</div>}
            <button className="button button-primary login-submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar no painel'} <span>→</span></button>
          </form>
          <div className="demo-hint"><strong>Conta de teste</strong><span>Usuário: emilys</span><span>Senha: emilyspass</span></div>
        </div>
        <p className="login-footer">© 2026 Saborê · Painel do restaurante</p>
      </section>
    </main>
  )
}
