import './Theme/GlobalStyles';
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./Theme/GlobalStyles";
import Theme from "./Theme/index"

import {Route, Routes } from 'react-router';


import Header from "./components/Header";
import SearchRecipes from './components/SearchRecipes';
import SavedRecipes from './components/Saved';
import DetailedRecipe from './components/Recipe';
import SuggestionsCarousel from './components/Suggestions';
import SearchFilters from './components/SearchFilters';


function App() {
  return(
    <ThemeProvider theme={Theme}>
      <GlobalStyle/>
          <Header/>
          <main>
          <Routes>
            <Route path='/' element={
              <>
                <SuggestionsCarousel category='Seafood'/>
                <SuggestionsCarousel category='Dessert'/>
                <SuggestionsCarousel category='Beef'/>
              </>
             }
            />

            <Route path='/SearchRecipes' element={
              <SearchRecipes/>
             }
            />

            <Route path='/SearchByCountry' element={
              <>
                <SearchFilters type='country'/>
                <SearchRecipes showInput={false}/>
              </>              
             }
            />

            <Route path='/SearchByCategory' element={
               <>
                <SearchFilters type='category'/>
                <SearchRecipes showInput={false}/>
              </>  
             }
            />

            <Route path="/Recipe/:id" element={
              <DetailedRecipe/>
              }
            />

            <Route path='/Favorites' element={
               <SavedRecipes/>
             }
            />
          </Routes>
          </main>
    </ThemeProvider>
  );
}

export default App;
