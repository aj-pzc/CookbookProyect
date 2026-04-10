import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk(
    'search/fetchRecipes',
    async(searchTerm, {rejectWithValue}) => {
        try{
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            const apiData = response.data.meals;
            if (!apiData || apiData.length === 0) {
                return rejectWithValue(`No se encontraron recetas para ${searchTerm}.`);
            }
            const renamedDB = apiData.map((meal) =>({
                id: meal.idMeal,
                title: meal.strMeal,
                category: meal.strCategory,
                country: meal.strArea, 
                thumbnail: meal.strMealThumb,
            }));
            return(renamedDB)
        } catch(error){
            return rejectWithValue("Error de conexion");
        }
    }
);

export const fetchRecipeDetails = createAsyncThunk (
    'search/fetchRecipeDetails',
    async(id, {rejectWithValue}) => {
        try{
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const meal = response.data.meals ? response.data.meals[0] : null;
            
            if(!meal) return rejectWithValue("Receta no encontrada");

            const ingredients = [];

            for(let i=1; i<= 20; i ++){
                const ingredientName = meal[`strIngredient${i}`];

                if(ingredientName && ingredientName.trim() !== ""){
                    ingredients.push({
                        name:ingredientName,
                        measure: meal[`strMeasure${i}`],
                        thumb: `https://www.themealdb.com/images/ingredients/${ingredientName}-small.png`
                    });
                }
            }
            return{
                id: meal.idMeal,
                country: meal.strArea,
                title: meal.strMeal,
                ingredients: ingredients,
                category: meal.strCategory,
                thumbnail: meal.strMealThumb,
                instructions: meal.strInstructions,
                video: meal.strYoutube ? meal.strYoutube.replace("watch?v=", "embed/") : null,
            };
        }
        catch(error){
            return rejectWithValue("Error de conexion");
        }
    }
);

export const fetchAllCategories = createAsyncThunk(
    'search/fetchAllCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
            return response.data.meals.map(item => item.strCategory);
        } catch (error) {
            return rejectWithValue("No se pudo cargar las categorías");
        }
    }
);

export const fetchAllCountries = createAsyncThunk(
    'search/fetchAllCountries',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
            return response.data.meals.map(item => item.strArea);
        } catch (error) {
            return rejectWithValue("No se pudo cargar los paises");
        }
    }
);

export const fetchByCategory = createAsyncThunk (
    'search/fetchByCategory',
    async( category, {rejectWithValue}) =>{
        try{
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const apiData = response.data.meals;

            if(!apiData || apiData.length === 0){
                return rejectWithValue(`No hay recetas en la categoria ${category}.`);
            }

            const renamedDB = apiData.map((meal) => ({
                id: meal.idMeal,
                title: meal.strMeal,
                thumbnail: meal.strMealThumb,
            })); 
            return(renamedDB)
        } catch (error) {
            return rejectWithValue("Error al filtrar por categoría");
        }
    }
);


export const fetchByCountry = createAsyncThunk (
    'search/fetchByCountry',
    async(country, {rejectWithValue}) => {
        try{
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
            const apiData = response.data.meals;

            if(!apiData || apiData.length === 0){
                return rejectWithValue(`No hay recetas en ${country}.`);
            }

            const renamedDB = apiData.map((meal) => ({
                id: meal.idMeal,
                title: meal.strMeal,
                thumbnail: meal.strMealThumb,
            })); 
            return(renamedDB)
        } catch (error) {
            return rejectWithValue("Error al filtrar por pais");
        }
    }
)

const searchSlice = createSlice ({
    name:'apiResults',
    initialState: {
        recipes:[],
        categories: [], 
        countries: [],
        selectedRecipe: null,
        loading: false,
        error: null
    },

    reducers:{
        searchReset: (state) =>{
            state.recipes = [];      
            state.selectedRecipe = null; 
            state.loading = false;
            state.error = null;
        }
    },

    extraReducers: builder =>{
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

            .addMatcher(
                (action) => 
                    action.type.endsWith('/pending')
                    && action.type.includes('fetch')
                    && !action.type.includes('All'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => 
                    action.type.endsWith('/fulfilled') 
                    && action.type.includes('fetch') 
                    && !action.type.includes('All')
                    && !action.type.includes('Details'),
                (state, action) => {
                    state.loading = false;
                    state.recipes = action.payload;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected') && action.type.includes('fetch'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
        }
    }
)

export const {searchReset} = searchSlice.actions;

export default searchSlice.reducer
