import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import favoritesReducer from "./Redux/slice/saveRecipe.slice";
import searchReducer from './Redux/slice/search.slice';


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

const customRender = (ui, options = {}) => {
  const {
    preloadedState = {},
    store = configureStore({
      reducer: {
        favorites: favoritesReducer,
        search: searchReducer,
      },
      preloadedState,

      middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      }),
    }),
    ...renderOptions
  } = options;

  const Wrapper = ({ children }) => (
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