import searchReducer, { 
    searchReset, 
    fetchRecipes, 
    fetchAllCategories, 
    fetchAllCountries, 
} from './search.slice';

import axios from 'axios';


describe('Search Slice Reducer', () => {
    const initialState = {
        recipes: [],
        categories: [], 
        countries: [],
        selectedRecipe: null,
        loading: false,
        error: null
    };

    it('should return the initial state when the action is unknown', () => {
        expect(searchReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle searchReset', () => {
        const stateConDatos = {
            ...initialState,
            recipes: [{ id: 1 }],
            selectedRecipe: { id: 1 },
            loading: true
        };
        const actual = searchReducer(stateConDatos, searchReset());
        
        expect(actual.recipes).toEqual([]);
        expect(actual.selectedRecipe).toBeNull();
        expect(actual.loading).toBe(false);
    });


    describe('fetchRecipes (Thunk)', () => {
        it('should activate loading in pending', () => {
            const action = { type: fetchRecipes.pending.type };
            const state = searchReducer(initialState, action);
            expect(state.loading).toBe(true);
        });

        it('should save recipes as fulfilled', () => {
            const mockRecipes = [{ id: '123', title: 'Tacos' }];
            const action = { 
                type: fetchRecipes.fulfilled.type, 
                payload: mockRecipes 
            };
            const state = searchReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.recipes).toEqual(mockRecipes);
        });

        it('should save the error in rejected', () => {
            const action = { 
                type: fetchRecipes.rejected.type, 
                payload: 'Error de conexión' 
            };
            const state = searchReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.error).toBe('Error de conexión');
        });
    });

    describe('fetchAllCategories', () => {
        it('should save categories', () => {
            const mockCategories = ['Beef', 'Chicken'];
            const action = { 
                type: fetchAllCategories.fulfilled.type, 
                payload: mockCategories 
            };
            const state = searchReducer(initialState, action);
            expect(state.categories).toEqual(mockCategories);
        });
    });

    describe('fetchAllCountries', () => {
        it('should save countries', () => {
            const mockCountries = ['Mexican', 'Italian'];
            const action = { 
                type: fetchAllCountries.fulfilled.type, 
                payload: mockCountries 
            };
            const state = searchReducer(initialState, action);
            expect(state.countries).toEqual(mockCountries);
        });
    });
});



jest.mock('axios');

describe('search thunks', () => {
  it('should map the data correctly when the API responds to fetchRecipes', async () => {
    const mockData = {
      data: {
        meals: [
          { idMeal: '1', strMeal: 'Test', strCategory: 'Cat', strArea: 'Area', strMealThumb: 'img.jpg' }
        ]
      }
    };
    axios.get.mockResolvedValueOnce(mockData);

    const dispatch = jest.fn();
    const thunk = fetchRecipes('chicken');
    
    const result = await thunk(dispatch, () => ({}), {});

    expect(result.payload).toEqual([{
      id: '1',
      title: 'Test',
      category: 'Cat',
      country: 'Area',
      thumbnail: 'img.jpg'
    }]);
  });

  it('should return rejectWithValue if no results are found', async () => {
    axios.get.mockResolvedValueOnce({ data: { meals: null } });
    const dispatch = jest.fn();
    const thunk = fetchRecipes('inventado');
    
    const result = await thunk(dispatch, () => ({}), {});
    expect(result.payload).toBe('No se encontraron recetas para inventado.');
  });
});