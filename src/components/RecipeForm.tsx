import { useEffect, useState, type FormEvent } from 'react'
import type { Recipe, RecipeFormData } from '../types'

interface Props {
  recipe: Recipe | null
  onSave: (data: RecipeFormData) => Promise<void>
  onCancel: () => void
  saving: boolean
}

const emptyForm: RecipeFormData = {
  name: '', cuisine: '', image: '',
  prepTimeMinutes: 10, cookTimeMinutes: 20,
}

export default function RecipeForm({ recipe, onSave, onCancel, saving }: Props) {
  const [form, setForm] = useState<RecipeFormData>(emptyForm)

  useEffect(() => {
    setForm(recipe ? {
      name: recipe.name,
      cuisine: recipe.cuisine,
      image: recipe.image,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
    } : emptyForm)
  }, [recipe])

  function change<K extends keyof RecipeFormData>(key: K, value: RecipeFormData[K]) {
    setForm(current => ({ ...current, [key]: value }))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await onSave(form)
  }

  return (
    <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onCancel() }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-heading">
          <div><span className="eyebrow">CARDÁPIO</span><h2 id="form-title">{recipe ? 'Editar prato' : 'Novo prato'}</h2></div>
          <button className="close-button" onClick={onCancel} aria-label="Fechar">×</button>
        </div>
        <form onSubmit={submit} className="recipe-form">
          <label>Nome do prato<input required maxLength={80} value={form.name} onChange={e => change('name', e.target.value)} placeholder="Ex.: Risoto de cogumelos" /></label>
          <label>Tipo de cozinha<input required value={form.cuisine} onChange={e => change('cuisine', e.target.value)} placeholder="Ex.: Brasileira" /></label>
          <label className="full-field">URL da foto<input type="url" value={form.image} onChange={e => change('image', e.target.value)} placeholder="https://..." /></label>
          <div className="two-fields">
            <label>Preparo (min)<input type="number" min="0" required value={form.prepTimeMinutes} onChange={e => change('prepTimeMinutes', Number(e.target.value))} /></label>
            <label>Cozimento (min)<input type="number" min="0" required value={form.cookTimeMinutes} onChange={e => change('cookTimeMinutes', Number(e.target.value))} /></label>
          </div>
          <p className="form-note">O preço será calculado automaticamente conforme a regra da atividade.</p>
          <div className="modal-actions"><button type="button" className="button button-outline" onClick={onCancel}>Cancelar</button><button className="button button-primary" disabled={saving}>{saving ? 'Salvando...' : 'Salvar prato'}</button></div>
        </form>
      </section>
    </div>
  )
}
