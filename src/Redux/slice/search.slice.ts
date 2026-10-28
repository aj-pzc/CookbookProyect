import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Ingredient, RecipeDetails, RecipeSummary, SearchState } from "../../types/recipe";

interface MealApiRecord {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strMealThumb: string;
  strInstructions?: string | null;
  strYoutube?: string | null;
  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
}

interface MealsResponse {
  meals: MealApiRecord[] | null;
}

interface NamesResponse {
  meals: Array<{ strCategory?: string; strArea?: string }> | null;
}

const mapSummary = (meal: MealApiRecord): RecipeSummary => ({
  id: meal.idMeal,
  title: meal.strMeal,
  category: meal.strCategory ?? undefined,
  country: meal.strArea ?? undefined,
  thumbnail: meal.strMealThumb,
});

export const fetchRecipes = createAsyncThunk<RecipeSummary[], string, { rejectValue: string }>(
  "search/fetchRecipes",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get<MealsResponse>(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
      );
      const meals = response.data.meals;
      if (!meals?.length) {
        return rejectWithValue(`No se encontraron recetas para ${searchTerm}.`);
      }
      return meals.map(mapSummary);
    } catch {
      return rejectWithValue("Error de conexion");
    }
  },
);

export const fetchRecipeDetails = createAsyncThunk<RecipeDetails, string, { rejectValue: string }>(
  "search/fetchRecipeDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<MealsResponse>(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const meal = response.data.meals?.[0];
      if (!meal) return rejectWithValue("Receta no encontrada");

      const ingredients: Ingredient[] = [];
      for (let index = 1; index <= 20; index += 1) {
        const ingredientName = meal[`strIngredient${index}`];
        if (ingredientName?.trim()) {
          ingredients.push({
            name: ingredientName,
            measure: meal[`strMeasure${index}`] ?? "",
            thumb: `https://www.themealdb.com/images/ingredients/${ingredientName}-small.png`,
          });
        }
      }

      return {
        id: meal.idMeal,
        country: meal.strArea ?? "",
        title: meal.strMeal,
        ingredients,
        category: meal.strCategory ?? "",
        thumbnail: meal.strMealThumb,
        instructions: meal.strInstructions ?? "",
        video: meal.strYoutube ? meal.strYoutube.replace("watch?v=", "embed/") : null,
      };
    } catch {
      return rejectWithValue("Error de conexion");
    }
  },
);

export const fetchAllCategories = createAsyncThunk<string[], void, { rejectValue: string }>(
  "search/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<NamesResponse>(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
      );
      return response.data.meals?.map((item) => item.strCategory ?? "").filter(Boolean) ?? [];
    } catch {
      return rejectWithValue("No se pudo cargar las categorías");
    }
  },
);

export const fetchAllCountries = createAsyncThunk<string[], void, { rejectValue: string }>(
  "search/fetchAllCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<NamesResponse>(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
      );
      return response.data.meals?.map((item) => item.strArea ?? "").filter(Boolean) ?? [];
    } catch {
      return rejectWithValue("No se pudo cargar los paises");
    }
  },
);

export const fetchByCategory = createAsyncThunk<RecipeSummary[], string, { rejectValue: string }>(
  "search/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get<MealsResponse>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      const meals = response.data.meals;
      if (!meals?.length) return rejectWithValue(`No hay recetas en la categoria ${category}.`);
      return meals.map(mapSummary);
    } catch {
      return rejectWithValue("Error al filtrar por categoría");
    }
  },
);

export const fetchByCountry = createAsyncThunk<RecipeSummary[], string, { rejectValue: string }>(
  "search/fetchByCountry",
  async (country, { rejectWithValue }) => {
    try {
      const response = await axios.get<MealsResponse>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`,
      );
      const meals = response.data.meals;
      if (!meals?.length) return rejectWithValue(`No hay recetas en ${country}.`);
      return meals.map(mapSummary);
    } catch {
      return rejectWithValue("Error al filtrar por pais");
    }
  },
);

const initialState: SearchState = {
  recipes: [],
  categories: [],
  countries: [],
  selectedRecipe: null,
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "apiResults",
  initialState,
  reducers: {
    searchReset: (state) => {
      state.recipes = [];
      state.selectedRecipe = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
  const setLoading = (state: SearchState) => {
    state.loading = true;
    state.error = null;
  };
  const setSearchError = (state: SearchState, message: string | undefined) => {
    state.loading = false;
    state.error = message ?? "Error";
  };

  builder
    .addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    })
      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipes.pending, setLoading)
      .addCase(fetchByCategory.pending, setLoading)
      .addCase(fetchByCountry.pending, setLoading)
      .addCase(fetchRecipeDetails.pending, setLoading)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchByCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) =>
        setSearchError(state, action.payload ?? action.error.message),
      )
      .addCase(fetchAllCategories.rejected, (state, action) =>
        setSearchError(state, action.payload ?? action.error.message),
      )
      .addCase(fetchAllCountries.rejected, (state, action) =>
        setSearchError(state, action.payload ?? action.error.message),
      )
      .addCase(fetchByCategory.rejected, (state, action) =>
        setSearchError(state, action.payload ?? action.error.message),
      )
      .addCase(fetchByCountry.rejected, (state, action) =>
        setSearchError(state, action.payload ?? action.error.message),
      )
      .addCase(fetchRecipeDetails.rejected, (state, action) =>
        setSearchError(state, action.payload ?? action.error.message),
      );
  },
});

export const { searchReset } = searchSlice.actions;
export default searchSlice.reducer;
