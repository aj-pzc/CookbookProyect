    import { createSlice } from "@reduxjs/toolkit";

    const savedFavorites = localStorage.getItem('favorites') 
    ? JSON.parse(localStorage.getItem('favorites')) 
    : [];

    const favoriteSlice = createSlice ({
        name: 'favorites',
        initialState: savedFavorites,
        reducers: {
            toggleFavorites:(state, action) =>{
                const recipe = action.payload;
                if (!recipe) return;
                
                const index = state.findIndex(item => String(item.id) === String(recipe.id));
                if(index !== -1){
                    state.splice(index, 1);
                } else {
                    state.push(recipe);
                }
                localStorage.setItem('favorites', JSON.stringify(state));
            }
        }

    });

    export const { toggleFavorites } = favoriteSlice.actions;
    export default favoriteSlice.reducer;