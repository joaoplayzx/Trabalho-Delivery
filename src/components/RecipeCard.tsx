import type { Recipe } from '../types'
import { formatPrice, recipePrice } from '../services/api'

interface Props {
  recipe: Recipe
  onEdit: (recipe: Recipe) => void
  onDelete: (recipe: Recipe) => void
}

export default function RecipeCard({ recipe, onEdit, onDelete }: Props) {
  return (
    <article className="recipe-card">
      <div className="recipe-image-wrap">
        <img src={recipe.image || 'https://placehold.co/600x400?text=Prato'} alt={recipe.name} className="recipe-image" />
        <span className="cuisine-tag">{recipe.cuisine || 'Especial'}</span>
      </div>
      <div className="recipe-content">
        <div className="recipe-title-row">
          <h3>{recipe.name}</h3>
          <strong className="price">{formatPrice(recipePrice(recipe))}</strong>
        </div>
        <p className="recipe-time">Preparo: {recipe.prepTimeMinutes} min <span>•</span> Cozimento: {recipe.cookTimeMinutes} min</p>
        <div className="card-actions">
          <button className="button button-outline" onClick={() => onEdit(recipe)}>Editar</button>
          <button className="button button-danger-ghost" onClick={() => onDelete(recipe)}>Excluir</button>
        </div>
      </div>
    </article>
  )
}
