import React from 'react';
import { MemoryRouter } from 'react-router';
import SearchRecipes from './index'; // Ajusta la ruta si es necesario
import { render, screen, fireEvent } from '../../test.utils';



const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

jest.mock('../../Redux/slice/search.slice', () => {
    const actual = jest.requireActual('../../Redux/slice/search.slice');
    return {
        __esModule: true,
        ...actual,
        fetchRecipes: jest.fn((term) => ({ type: 'search/fetch', payload: term })),
        searchReset: jest.fn(() => ({ type: 'search/searchReset' })),
        default: actual.default // Mantiene el reducer real para el preloadedState
    };
});

jest.mock('../../Redux/slice/saveRecipe.slice', () => {
    const actual = jest.requireActual('../../Redux/slice/saveRecipe.slice');
    return {
        __esModule: true,
        ...actual,
        toggleFavorites: jest.fn((recipe) => ({ type: 'fav/toggle', payload: recipe })),
        default: actual.default
    };
});

const mockRecipes = [
    { id: '1', title: 'Tacos', country: 'Mexican', category: 'Beef', thumbnail: 'taco.jpg' },
    { id: '2', title: 'Sushi', country: 'Japanese', category: 'Seafood', thumbnail: 'sushi.jpg' }
];

describe('Tests for SearchRecipes Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should show empty message when no recipes are available', () => {
        render(
            <MemoryRouter>
                <SearchRecipes />
            </MemoryRouter>,
            { preloadedState: { search: { recipes: [], loading: false }, favorites: [] } }
        );
        expect(screen.getByText(/Realiza una búsqueda para comenzar/i)).toBeInTheDocument();
    });

    it('Should display loading state', () => {
        render(
            <MemoryRouter>
                <SearchRecipes />
            </MemoryRouter>,
            { preloadedState: { search: { recipes: [], loading: true }, favorites: [] } }
        );
        expect(screen.getByText(/Cargando biblioteca/i)).toBeInTheDocument();
    });

    it('Should trigger search when clicking the button', () => {
        render(
            <MemoryRouter>
                <SearchRecipes />
            </MemoryRouter>,
            { preloadedState: { search: { recipes: [], loading: false }, favorites: [] } }
        );

        const input = screen.getByPlaceholderText(/Presiona Enter para buscar/i);
        const button = screen.getByRole('button', { name: /Buscar/i });

        fireEvent.change(input, { target: { value: 'Chicken' } });
        fireEvent.click(button);

        expect(mockDispatch).toHaveBeenCalled();
    });

    it('should render recipe list correctly', () => {
        render(
            <MemoryRouter>
                <SearchRecipes />
            </MemoryRouter>,
            { preloadedState: { search: { recipes: mockRecipes, loading: false }, favorites: [] } }
        );

        expect(screen.getByText('Tacos')).toBeInTheDocument();
        expect(screen.getByText('Sushi')).toBeInTheDocument();
        expect(screen.getAllByAltText('favIcon')).toHaveLength(2);
    });

    it('should trigger toggleFavorites when clicking the favorite icon', () => {
        render(
            <MemoryRouter>
                <SearchRecipes />
            </MemoryRouter>,
            { preloadedState: { search: { recipes: mockRecipes, loading: false }, favorites: [] } }
        );

        const favButtons = screen.getAllByRole('button', { name: /Favorites/i });
        fireEvent.click(favButtons[0]);

        expect(mockDispatch).toHaveBeenCalled();
    });

    it('should clear the search when unmounting the component', () => {
        const { unmount } = render(
            <MemoryRouter>
                <SearchRecipes />
            </MemoryRouter>,
            { preloadedState: { search: { recipes: [], loading: false }, favorites: [] } }
        );

        unmount();
        expect(mockDispatch).toHaveBeenCalled();
    });
});