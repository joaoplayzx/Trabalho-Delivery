import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import RecipeCard from '../components/RecipeCard'
import RecipeForm from '../components/RecipeForm'
import { addRecipe, deleteRecipe, getRecipes, searchRecipes, updateRecipe } from '../services/api'
import type { Recipe, RecipeFormData } from '../types'

export default function Menu() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<number | null>(null)
  const [editing, setEditing] = useState<Recipe | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = query.trim() ? await searchRecipes(query.trim()) : await getRecipes()
        if (active) {
          setRecipes(data.recipes)
          setStatus(200)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar o cardápio.')
          setStatus((err as { status?: number }).status ?? null)
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    const delay = window.setTimeout(() => void load(), query.trim() ? 300 : 0)
    return () => { active = false; window.clearTimeout(delay) }
  }, [query])

  const total = useMemo(() => recipes.length, [recipes])

  function openNew() {
    setEditing(null)
    setFormOpen(true)
    setNotice('')
  }

  function openEdit(recipe: Recipe) {
    setEditing(recipe)
    setFormOpen(true)
    setNotice('')
  }

  async function saveRecipe(data: RecipeFormData) {
    setSaving(true)
    setError('')
    setNotice('')
    try {
      if (editing) {
        const updated = await updateRecipe(editing.id, data)
        setRecipes(current => current.map(item => item.id === editing.id ? { ...item, ...data, ...updated } : item))
        setNotice('Prato atualizado com sucesso.')
      } else {
        const created = await addRecipe(data)
        setRecipes(current => [{ ...created, ...data, id: 51 }, ...current.filter(item => item.id !== 51)])
        setNotice('Prato cadastrado com sucesso.')
      }
      setFormOpen(false)
      setEditing(null)
    } catch (err) {
      const statusCode = (err as { status?: number }).status ?? null
      setStatus(statusCode)
      setError(statusCode === 404
        ? 'A API retornou 404. O DummyJSON não mantém alterações; o prato com ID 51 pode não existir no servidor. A lista local não foi alterada.'
        : err instanceof Error ? err.message : 'Não foi possível salvar o prato.')
    } finally {
      setSaving(false)
    }
  }

  async function removeRecipe(recipe: Recipe) {
    if (!window.confirm(`Tem certeza que deseja excluir "${recipe.name}" do cardápio?`)) return
    setError('')
    setNotice('')
    try {
      await deleteRecipe(recipe.id)
      setRecipes(current => current.filter(item => item.id !== recipe.id))
      setNotice('Prato removido do cardápio.')
    } catch (err) {
      const statusCode = (err as { status?: number }).status ?? null
      setStatus(statusCode)
      setError(statusCode === 404
        ? 'Não foi possível excluir: a API retornou 404. Isso pode acontecer com pratos criados localmente (ID 51), pois o DummyJSON apenas simula as operações.'
        : err instanceof Error ? err.message : 'Não foi possível excluir o prato.')
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="dashboard">
        <div className="welcome-row"><div><span className="eyebrow">GESTÃO DO RESTAURANTE</span><h1>Seu cardápio</h1><p className="muted">Gerencie os pratos que seus clientes vão amar.</p></div><button className="button button-primary add-button" onClick={openNew}><span>＋</span> Novo prato</button></div>
        <section className="stats-row">
          <div className="stat-card"><span className="stat-icon">🍽</span><div><small>Pratos encontrados</small><strong>{loading ? '—' : total}</strong></div></div>
          <div className="stat-card"><span className="stat-icon">⌕</span><div><small>Busca no cardápio</small><strong>{query ? 'Filtrando' : 'Todos os pratos'}</strong></div></div>
        </section>
        <section className="menu-section">
          <div className="section-heading"><div><h2>Pratos cadastrados</h2><p className="muted">Veja, edite ou remova os itens do seu restaurante.</p></div><div className="search-box"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar prato..." aria-label="Buscar prato pelo nome" /><button onClick={() => setQuery('')} aria-label="Limpar busca">×</button></div></div>
          {notice && <div className="alert alert-success">{notice}</div>}
          {error && <div className="alert alert-error" role="alert">{error}{status !== null && <small> Status HTTP: {status}</small>}</div>}
          {loading ? <div className="loading-state"><div className="spinner" /><p>Carregando pratos...</p></div>
            : recipes.length === 0 ? <div className="empty-state"><span>🥗</span><h3>Nenhum prato encontrado</h3><p>{query ? 'Tente buscar por outro nome.' : 'Cadastre o primeiro prato do seu cardápio.'}</p><button className="button button-primary" onClick={openNew}>Cadastrar prato</button></div>
            : <div className="recipe-grid">{recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onEdit={openEdit} onDelete={removeRecipe} />)}</div>}
        </section>
        <footer className="dashboard-footer">Saborê <span>•</span> Painel de gestão do restaurante</footer>
      </main>
      {formOpen && <RecipeForm recipe={editing} onSave={saveRecipe} onCancel={() => setFormOpen(false)} saving={saving} />}
    </div>
  )
}
