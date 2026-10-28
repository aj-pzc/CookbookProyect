import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import type { ReactElement, ReactNode } from "react";

import favoritesReducer from "./Redux/slice/saveRecipe.slice";
import searchReducer from "./Redux/slice/search.slice";
import type { RecipeSummary, SearchState } from "./types/recipe";


const themeMock = {
    colors: {
        background: '#000000',
        primary: '#ffffff', 
        textInvtd: '#ffffff',
        btnHover: '#cccccc',
        btnActive: '#999999',
        none: 'transparent'
    },
    layering: {
        overflow: 'auto'
    }
};

interface CustomRenderOptions {
  preloadedState?: {
    search?: Partial<SearchState>;
    favorites?: RecipeSummary[];
  };
  store?: ReturnType<typeof createTestStore>;
}

const createTestStore = (preloadedState?: CustomRenderOptions["preloadedState"]) =>
  configureStore({
    reducer: {
      favorites: favoritesReducer,
      search: searchReducer,
    },
    preloadedState: {
      favorites: preloadedState?.favorites ?? [],
      search: {
        recipes: [],
        categories: [],
        countries: [],
        selectedRecipe: null,
        loading: false,
        error: null,
        ...preloadedState?.search,
      },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const {
    preloadedState,
    store = createTestStore(preloadedState),
    ...renderOptions
  } = options;

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <ThemeProvider theme={themeMock}>
          {children}
      </ThemeProvider>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export * from '@testing-library/react';
export { customRender as render };