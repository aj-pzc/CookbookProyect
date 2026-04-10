import { fireEvent, render, screen } from "../../test.utils";
import SavedRecipes from ".";
import { MemoryRouter } from "react-router";
import favoriteReducer ,{ toggleFavorites } from "../../Redux/slice/saveRecipe.slice";


jest.mock('react-router-dom', () => ({
    Link: ({ children, to }) => <div data-testid="mock-link" href={to}>{children}</div>,
}));


const mockDB = [
    {
        id: '53140',
        country: 'Argentinian',
        title: 'Matambre a la Pizza',
        category: 'Beef',
        thumbnail: 'https://www.themealdb.com/images/media/meals/wf49qs1763075222.jpg',
    },
    {
        id: '52999',
        country: 'French',
        title: 'White Chocolate Creme Brulee',
        category: 'Dessert',
        thumbnail: 'https://www.themealdb.com/images/media/meals/uryqru1511798039.jpg',
    },
    {
        id: '53339',
        country: 'Canadian',
        title: 'Jam jam Cookies',
        category: 'Dessert',
        thumbnail: '	https://www.themealdb.com/images/media/meals/sktequ1764447186.jpg',
    }
];

describe ('Tests for Saved Recipes component', () =>{
    it('should render all saved recipes', () => {
        render(
            <MemoryRouter>
                <SavedRecipes/>
            </MemoryRouter> , {preloadedState:{favorites:mockDB}}
        );

        const handlePLaylist = screen.getAllByRole('button',{name: /Favorites/i})
        expect(handlePLaylist).toHaveLength(3);

        mockDB.forEach(recipe => {
            expect(screen.getByText(recipe.title, 'i')).toBeInTheDocument();
            }
        );
    })

    it('should render message when empty', () => {
        render(
            <MemoryRouter>
                <SavedRecipes/>
            </MemoryRouter> 
        );

        expect(screen.getByText('No hay favoritos aún.')).toBeInTheDocument();
    })

     it('should remove a item from list when clicked', () => {

         const { store } = render(
            <MemoryRouter>
                <SavedRecipes/>
            </MemoryRouter> , {preloadedState:{favorites:mockDB}}
        );

        const removeButtons = screen.getAllByRole('button', { name: /Favorites/i });
        
        fireEvent.click(removeButtons[0]);
        
        const state = store.getState();

        expect(state.favorites).toHaveLength(2); 
        expect(state.favorites[0].id).not.toBe(mockDB[0].id); 
        expect(screen.queryByText(/Matambre a la Pizza/i)).not.toBeInTheDocument();
    });

    it('should have a correct link to the recipe details', () => {
    render(
        <MemoryRouter>
            <SavedRecipes/>
        </MemoryRouter>, { preloadedState: { favorites: mockDB } }
    );
        const recipeLink = screen.getByRole('link', { name: /Matambre a la Pizza/i });
        expect(recipeLink).toHaveAttribute('href', `/recipe/${mockDB[0].id}`);
    });

})


describe('Favorite Slice Reducer', () => {
    it('should return the initial state', () => {
        expect(favoriteReducer(undefined, { type: undefined })).toEqual([]);
    });

    it('should add a recipe to favorites if it does not exist', () => {
        const initialState = [];
        const newRecipe = { id: '53140', title: 'Matambre' };

        const newState = favoriteReducer(initialState, toggleFavorites(newRecipe));

        expect(newState).toHaveLength(1);
        expect(newState[0].id).toBe('53140');
    });

    it('should remove a recipe from favorites if it already exists', () => {
        const initialState = [{ id: '53140', title: 'Matambre' }];
        const recipeToRemove = { id: '53140' }; // Solo necesitamos el ID para el match
        
        const newState = favoriteReducer(initialState, toggleFavorites(recipeToRemove));

        expect(newState).toHaveLength(0);
    });
});

