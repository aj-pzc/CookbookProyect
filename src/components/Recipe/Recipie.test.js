import React from 'react';
import { MemoryRouter } from "react-router";
import DetailedRecipe from ".";
import { render, screen, fireEvent } from "../../test.utils";

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

jest.mock("../../Redux/slice/search.slice", () => {
    const actual = jest.requireActual("../../Redux/slice/search.slice");
    return {
        __esModule: true, 
        ...actual,
        fetchRecipeDetails: jest.fn(() => ({ type: 'mock/fetch' })),
        searchReset: jest.fn(() => ({ type: 'mock/reset' })),
        default: actual.default 
    };
});

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: () => ({ id: '52772' }),
}));

jest.mock('../Suggestions', () => () => <div data-testid="suggestions-mock">Mock de Sugerencias</div>);

const mockRecipe = {
    id: '52772',
    title: 'Teriyaki Chicken',
    country: 'Japanese',
    instructions: 'Step one. Step two\r\nStep three',
    thumbnail: 'image.jpg',
    category: 'Chicken',
    ingredients: [{ name: 'Soy Sauce', measure: '1tbsp', thumb: 'soy.jpg' }],
    video: 'youtube.com/link'
};

describe('DetailedRecipe Component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should show loading state initially', () => {
        render(
            <MemoryRouter>
                <DetailedRecipe />
            </MemoryRouter>,
             { 
            preloadedState: { search: { loading: true, selectedRecipe: null }, favorites: [] } 
        });
        expect(screen.getByText(/Cargando Receta.../i)).toBeInTheDocument();
    });

    it('should render recipe details correctly when data is loaded', async () => {
        render(
            <MemoryRouter>
                <DetailedRecipe />
            </MemoryRouter>, 
            { 
            preloadedState: { search: { selectedRecipe: mockRecipe, loading: false }, favorites: [] } 
        }); 
        
        const title = await screen.findByText('Teriyaki Chicken');
        expect(title).toBeInTheDocument();
    });

    it('should toggle favorite status when button is clicked', async () => {
        const { store } = render(
            <MemoryRouter>
                <DetailedRecipe />
            </MemoryRouter>, 
            { 
            preloadedState: { 
                search: { selectedRecipe: mockRecipe, loading: false }, 
                favorites: [] 
            } 
        });

        const favButton = screen.getByRole('button', { name: /Favorites/i });
        fireEvent.click(favButton);
        expect(mockDispatch).toHaveBeenCalled();
    });

    it('should render the video iframe if link is present', () => {
        render(
            <MemoryRouter>
                <DetailedRecipe />
            </MemoryRouter>, 
            { 
            preloadedState: { search: { selectedRecipe: mockRecipe, loading: false }, favorites: [] } 
        });
        
        const video = screen.getByTitle(/Tutorial/i);
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute('src', mockRecipe.video);
    });
});