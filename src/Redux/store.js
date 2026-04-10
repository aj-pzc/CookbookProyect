import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slice/saveRecipe.slice";
import searchReducer from './slice/search.slice';


const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        search: searchReducer,
    }
});

export default store;
