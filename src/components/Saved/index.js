import { useDispatch, useSelector } from "react-redux";

import addFav from '../Media/add.svg';
import isFav from '../Media/remove.svg';
import { toggleFavorites } from "../../Redux/slice/saveRecipe.slice";

import { AllRecipes, EachRecipe, FavBox, FavButton, FavIcon, RecipeDetails, RecipeItem, RecipeThumb, ResultsGridContainer } from "../../Theme/GlobalStyles";
import { ListHeader } from "./styles";
import { Link } from "react-router";


const SavedRecipes = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    const handleToggleFav = (recipe) => {
        dispatch(toggleFavorites(recipe));
    };

    return(
        <AllRecipes>
            <ListHeader>
                <h2>Recetas Guardadas</h2>
            </ListHeader>

            <ResultsGridContainer role="list" aria-label="Recetas guardadas">
            {favorites && favorites.length > 0 ? (
                favorites.map((recipe) => {
                    const isFavorite = favorites.some(fav => fav.id === recipe.id);
                    const {id, title, category, country, thumbnail} = recipe

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
                            <FavBox >
                                <FavButton onClick={() => 
                                   handleToggleFav(recipe)} 
                                    aria-label={isFavorite ? "Remover de favoritos" : "Agregar a favoritos"}    
                                >
                                    <FavIcon src={isFavorite ? isFav:addFav} alt=""/>
                                </FavButton>
                            </FavBox>
                            </RecipeDetails>
                        </EachRecipe>
                )
            }) 
            ) : (
                <p>No hay favoritos aún.</p>
                )}
                
            </ResultsGridContainer>

            
        </AllRecipes>
    
    );
};

export default SavedRecipes;