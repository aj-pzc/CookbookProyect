import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes, searchReset } from "../../Redux/slice/search.slice";
import { SearchBar, SearchBox, SearchBtn, SearchContainer } from "./styles";
import { toggleFavorites } from "../../Redux/slice/saveRecipe.slice";
import { AllRecipes, EachRecipe, FavBox, FavButton, FavIcon, MessageAlert, RecipeDetails, RecipeItem, RecipeThumb, ResultsGridContainer } from "../../Theme/GlobalStyles";

import addFav from '../Media/add.svg';
import isFav from '../Media/remove.svg';
import { Link } from "react-router";

const SearchRecipes = ({showInput = true}) => {
    const dispatch = useDispatch();
    const {recipes=[], loading, error} = useSelector(state => state.search);
    const favorites = useSelector(state => state.favorites);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        return() =>{
            dispatch(searchReset());
        }
    },[dispatch]);

    const handleSearch = () =>{
        if(searchTerm.trim() !== ''){
            dispatch(fetchRecipes(searchTerm.trim()));
        }
    };

    return(
        <AllRecipes>
            {showInput && (
            <SearchContainer>
                <h2>Buscador de Recetas</h2>
                <SearchBox>
                    <label htmlFor="searchInput" style={{display: 'none'}}>Buscar recetas</label>
                    <SearchBar
                        type="text"
                        id="searchInput"
                        className="Searchbox" 
                        placeholder="Presiona Enter para buscar...   (Idioma EN-US)" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />                        
                    <SearchBtn onClick={handleSearch} aria-label="Buscar recetas">
                        Buscar
                    </SearchBtn>                    
                </SearchBox>
            </SearchContainer>
            )}

            {loading ? (
                <MessageAlert>Cargando biblioteca...</MessageAlert>
            ):  recipes.length === 0 && !error ? (
                <MessageAlert>Realiza una búsqueda para comenzar. </MessageAlert>
            ): error ? (
                <MessageAlert> {error}</MessageAlert>
            ) : (
                <ResultsGridContainer role="list" aria-label="Resultados de búsqueda de recetas">
                    {recipes.map( (recipe) => {
                        const {id, title, category, country, thumbnail} = recipe
                        const isFavorite = favorites.some(fav => fav.id === id);

                        return(
                            <EachRecipe key={id} role="listitem">
                                <RecipeThumb>
                                    <img src={thumbnail} alt={title}/>
                                </RecipeThumb>
                                <RecipeDetails>
                                    <RecipeItem>
                                        <Link to={`/recipe/${id}`}>
                                            <h3>{title}</h3>
                                        </Link>

                                        {country && (
                                            <Link to='/SearchByCountry' state={{filterValue:country}} >
                                                <p>Origin: {country} </p>
                                            </Link>
                                        )}

                                        {country && (
                                            <Link to='/SearchByCategory' state={{filterValue:category}} >
                                                <p>Category: {category} </p>
                                            </Link>
                                        )}
                                    </RecipeItem>
                                    <FavBox>                                            
                                        <FavButton onClick={() => 
                                            dispatch(toggleFavorites(recipe))} 
                                            aria-label={isFavorite ? "Remover de favoritos" : "Agregar a favoritos"}    
                                        >
                                            <FavIcon src={isFavorite ? isFav:addFav} alt=""/>
                                        </FavButton>
                                    </FavBox>
                                </RecipeDetails>
                            </EachRecipe>
                        );
                    }
                )}
                </ResultsGridContainer>
            )}
        </AllRecipes>
    );
};

export default SearchRecipes;

