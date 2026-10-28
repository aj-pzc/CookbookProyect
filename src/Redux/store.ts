import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slice/saveRecipe.slice";
import searchReducer from './slice/search.slice';


const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        search: searchReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
