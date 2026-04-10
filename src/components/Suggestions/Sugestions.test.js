import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SuggestionsCarousel from '.';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../Redux/slice/search.slice', () => ({
  fetchByCategory: jest.fn((cat) => ({ type: 'search/fetchByCategory', payload: cat })),
}));

const mockData = [
  { id: '1', title: 'Recipe 1', thumbnail: 'thumb1.jpg' },
  { id: '2', title: 'Recipe 2', thumbnail: 'thumb2.jpg' },
];

describe('Tests for SuggestionsCarousel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display the loading state initially', () => {
    mockDispatch.mockReturnValue({
      unwrap: () => new Promise(() => {}) 
    });

    render(
        <SuggestionsCarousel category="Chicken" />
    );

    expect(screen.getByText(/Getting you suggestions.../i)).toBeInTheDocument();
  });

  it('should display the suggestions when the action resolves successfully', async () => {
    mockDispatch.mockReturnValue({
      unwrap: () => Promise.resolve(mockData)
    });

    render(
      
        <SuggestionsCarousel category="Chicken" />
    );

    const title = await screen.findByText(/Recetas relacionadas a: Chicken/i);
    expect(title).toBeInTheDocument();
    
    expect(screen.getByText('Recipe 1')).toBeInTheDocument();
    expect(screen.getByText('Recipe 2')).toBeInTheDocument();
  });

  it('should return null (not render anything) if there are no suggestions', async () => {
    mockDispatch.mockReturnValue({
      unwrap: () => Promise.resolve([])
    });

    render(
        <SuggestionsCarousel category="Chicken" />
    );

    await waitFor(() => {
      expect(screen.queryByText(/Getting you suggestions.../i)).not.toBeInTheDocument();
    });

    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  it('should handle errors in the request without breaking the component', async () => {
    mockDispatch.mockReturnValue({
      unwrap: () => Promise.reject(new Error('Fetch failed'))
    });

    render(
        <SuggestionsCarousel category="Chicken" />
    );

    await waitFor(() => {
      expect(screen.queryByText(/Getting you suggestions.../i)).not.toBeInTheDocument();
    });

    expect(screen.queryByText(/Recetas relacionadas/i)).not.toBeInTheDocument();
  });
});