import React from 'react';
import { render, screen } from './test.utils'; 
import App from './App';
import { MemoryRouter } from 'react-router';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('./Redux/slice/search.slice', () => {
    const actual = jest.requireActual('./Redux/slice/search.slice');
    return {
        __esModule: true,
        ...actual,
        fetchByCategory: jest.fn(() => ({ type: 'mock/fetch' })),
        fetchRecipes: jest.fn(() => ({ type: 'mock/fetch' })),
        default: actual.default,
    };
});

jest.mock('./components/Header', () => () => <header>Mock Header</header>);

jest.mock('./components/Suggestions', () => {
  return function MockSuggestions({ category }) {
    return (
      <section data-testid="suggestions-mock">
        <h2>Recetas relacionadas a: {category}</h2>
      </section>
    );
  };
});

jest.mock('./components/SearchRecipes', () => ({ showInput = true }) => (
  <div>
    {showInput && <input placeholder="Presiona Enter para buscar" />}
    <button>Buscar</button>
  </div>
));

jest.mock('./components/SearchFilters', () => ({ type }) => <div>Busca por {type}</div>);
jest.mock('./components/Saved', () => () => <div>Aún no tienes recetas guardadas</div>);
jest.mock('./components/Recipe', () => () => <div>Cargando receta...</div>);

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
  };
});

describe('Tests for App Component ', () => {
  const initialState = {
    search: { recipes: [], loading: false, error: null },
    favorites: []
  };

  it('should properly render Header component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
      { preloadedState: initialState }
    );

    expect(screen.getByRole('heading', { name: /Recetas relacionadas a: Dessert/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Recetas relacionadas a: Seafood/i })).toBeInTheDocument();
  });

  it('should navigate to the search page and display the search input', () => {
    render(
      <MemoryRouter initialEntries={['/SearchRecipes']}>
        <App />
      </MemoryRouter>,
      { preloadedState: initialState }
    );

    expect(screen.getByPlaceholderText(/Presiona Enter para buscar/i)).toBeInTheDocument();
  });

  it('should display the Favorites page', () => {
    render(
      <MemoryRouter initialEntries={['/Favorites']}>
        <App />
      </MemoryRouter>,
      { preloadedState: { ...initialState, favorites: [] } }
    );

    expect(screen.getByText(/Aún no tienes recetas guardadas/i)).toBeInTheDocument();
  });
});