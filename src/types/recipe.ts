export interface RecipeSummary {
  id: string;
  title: string;
  category?: string;
  country?: string;
  thumbnail: string;
}

export interface Ingredient {
  name: string;
  measure: string;
  thumb: string;
}

export interface RecipeDetails extends RecipeSummary {
  country: string;
  category: string;
  ingredients: Ingredient[];
  instructions: string;
  video: string | null;
}

export interface SearchState {
  recipes: RecipeSummary[];
  categories: string[];
  countries: string[];
  selectedRecipe: RecipeDetails | null;
  loading: boolean;
  error: string | null;
}
