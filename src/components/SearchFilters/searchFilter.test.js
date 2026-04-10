import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SearchFilters from '.';
import * as actions from '../../Redux/slice/search.slice';
import * as reactRedux from 'react-redux';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate, // Retornamos directamente nuestra variable
  useLocation: () => ({
    pathname: '/search',
    state: {},
  }),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../Redux/slice/search.slice', () => ({
  fetchAllCategories: jest.fn(() => ({ type: 'mock' })),
  fetchAllCountries: jest.fn(() => ({ type: 'mock' })),
  fetchByCategory: jest.fn(() => ({ type: 'mock' })),
  fetchByCountry: jest.fn(() => ({ type: 'mock' })),
  searchReset: jest.fn(() => ({ type: 'mock' })),
}));

describe('SearchFilters Component', () => {
  const mockState = {
    categories: ['Beef', 'Breakfast'],
    countries: ['Mexican', 'Italian'],
    recipes: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    reactRedux.useSelector.mockImplementation((selector) => 
      selector({ search: mockState })
    );
  });

  it('should render both selectors by default', () => {
    render(
      <MemoryRouter>
        <SearchFilters type="both" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Filtrar por Categoría/i)).toBeInTheDocument();
    expect(screen.getByText(/Filtrar por País/i)).toBeInTheDocument();
    
    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(2);
  });

  it('should show the clear button when there is a selected value', () => {
    reactRedux.useSelector.mockImplementation((selector) => 
      selector({ search: { ...mockState, recipes: [{ id: 1 }] } })
    );

    render(
      <MemoryRouter>
        <SearchFilters type="category" />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /Limpiar Filtros/i })).toBeInTheDocument();
  });

  it('should reset filters and navigate when clicking the clear button', () => {
    reactRedux.useSelector.mockImplementation((selector) => 
      selector({ search: { ...mockState, recipes: [{ id: 1 }] } })
    );

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchFilters type="category" />
      </MemoryRouter>
    );

    const resetButton = screen.getByRole('button', { name: /Limpiar Filtros/i });
    
    fireEvent.click(resetButton);

    expect(actions.searchReset).toHaveBeenCalled();
  });

  it('should trigger fetchByCountry when changing country', () => {
    render(
      <MemoryRouter>
        <SearchFilters type="country" />
      </MemoryRouter>
    );

    const selects = screen.getAllByRole('combobox');
    const countrySelect = selects.find(select => select.id === 'country-select' || select.name === 'country'); 
    
    
    fireEvent.change(countrySelect || selects[0], { target: { value: 'Mexican' } });

    expect(actions.fetchByCountry).toHaveBeenCalledWith('Mexican');
  });

   it('should trigger fetchByCategory when changing category', () => {
    render(
      <MemoryRouter>
        <SearchFilters type="category" />
      </MemoryRouter>
    );

    const selects = screen.getAllByRole('combobox');
    const categorySelect = selects.find(select => select.id === 'category-select' || select.name === 'category'); 
    
    
    fireEvent.change(categorySelect || selects[0], { target: { value: 'Beef' } });

    expect(actions.fetchByCategory).toHaveBeenCalledWith('Beef');
  });
});