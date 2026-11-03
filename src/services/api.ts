import type { LoginResponse, Recipe, RecipeFormData, RecipesResponse } from '../types'

const API_URL = (import.meta.env.VITE_API_URL || 'https://dummyjson.com').replace(/\/$/, '')

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    let message = `Não foi possível concluir a solicitação (HTTP ${response.status}).`
    try {
      const data = await response.json()
      if (data?.message) message = data.message
    } catch {
      // Mantém a mensagem com o status HTTP.
    }
    const error = new Error(message) as Error & { status: number }
    error.status = response.status
    throw error
  }

  return response.json() as Promise<T>
}

export function login(username: string, password: string) {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  })
}

export function getCurrentUser(token: string) {
  return request<LoginResponse>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function getRecipes() {
  return request<RecipesResponse>('/recipes?limit=30&select=id,name,cuisine,image,prepTimeMinutes,cookTimeMinutes')
}

export function searchRecipes(query: string) {
  return request<RecipesResponse>(`/recipes/search?q=${encodeURIComponent(query)}&limit=30&select=id,name,cuisine,image,prepTimeMinutes,cookTimeMinutes`)
}

export function addRecipe(data: RecipeFormData) {
  return request<Recipe>('/recipes/add', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateRecipe(id: number, data: RecipeFormData) {
  return request<Recipe>(`/recipes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteRecipe(id: number) {
  return request<Recipe>(`/recipes/${id}`, { method: 'DELETE' })
}

export function recipePrice(recipe: Pick<Recipe, 'prepTimeMinutes' | 'cookTimeMinutes'>) {
  return 15 + 0.5 * (recipe.prepTimeMinutes + recipe.cookTimeMinutes)
}

export function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
