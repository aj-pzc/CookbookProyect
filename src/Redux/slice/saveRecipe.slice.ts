import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RecipeSummary } from "../../types/recipe";

const storedFavorites = localStorage.getItem("favorites");
const savedFavorites: RecipeSummary[] = storedFavorites
  ? (JSON.parse(storedFavorites) as RecipeSummary[])
  : [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: savedFavorites,
  reducers: {
    toggleFavorites: (state, action: PayloadAction<RecipeSummary | null | undefined>) => {
      const recipe = action.payload;
      if (!recipe) return;

      const index = state.findIndex((item) => String(item.id) === String(recipe.id));
      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(recipe);
      }
      localStorage.setItem("favorites", JSON.stringify(state));
    },
  },
});

export const { toggleFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
