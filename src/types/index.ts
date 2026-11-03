export interface Recipe {
  id: number
  name: string
  cuisine: string
  image: string
  prepTimeMinutes: number
  cookTimeMinutes: number
}

export interface RecipeFormData {
  name: string
  cuisine: string
  image: string
  prepTimeMinutes: number
  cookTimeMinutes: number
}

export interface LoginResponse {
  accessToken: string
  refreshToken?: string
  id: number
  username: string
  firstName?: string
  lastName?: string
}

export interface RecipesResponse {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}
