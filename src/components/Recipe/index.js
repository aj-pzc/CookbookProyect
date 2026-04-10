import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchRecipeDetails, searchReset } from "../../Redux/slice/search.slice";
import { useEffect } from "react";
import { FavButton, FavIcon, MessageAlert } from "../../Theme/GlobalStyles";
import {DetailsContainer, IngredientContainer, IngredientGrid, IngredientImg, IngredientName, InstructionsContainer, PreviewContainer, PreviewImg, RecipeBox, RecipeContainer, RecipeInstructionEach, RecipeName, RecipeVideo, TitleContainer } from "./styles";
import SuggestionsCarousel from "../Suggestions";
import { toggleFavorites } from "../../Redux/slice/saveRecipe.slice";

import addFav from '../Media/add.svg';
import isFav from '../Media/remove.svg';
import FeedbackForm from "../FeedbackForm";



const DetailedRecipe = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    const isFavorite = favorites.some(fav => fav.id === id);
    const {selectedRecipe, loading, error} = useSelector(state => state.search);
    
    useEffect(() => {
        dispatch(fetchRecipeDetails(id));

        return () => {
            dispatch(searchReset()); 
        };
    }, [id, dispatch]);

    const formatInstructions = (text) => {
        if (!text) return [];
        return text
            .split(/\r\n|\n|\. /) 
            .map(step => step.trim()) 
            .filter(step => step.length > 5); 
    };

    if(loading && !selectedRecipe) 
        return <MessageAlert>Cargando Receta... </MessageAlert>;

    if (error) 
        return <MessageAlert>{error}</MessageAlert>;

    if (!selectedRecipe) 
        return <MessageAlert>No se encontró la receta.</MessageAlert>;

    const instructionsList = formatInstructions(selectedRecipe.instructions);


    return (
        <RecipeContainer>
            <TitleContainer>
                <RecipeName>
                    <h1>{selectedRecipe.title}</h1>
                    <p>{selectedRecipe.country}</p>
                </RecipeName>
                <FavButton onClick={() => 
                    dispatch(toggleFavorites(selectedRecipe))} 
                    aria-label={isFavorite ? "Remover de favoritos" : "Agregar a favoritos"}    
                >
                    <FavIcon src={isFavorite ? isFav:addFav} alt=""/>
                </FavButton>
            </TitleContainer>
            <DetailsContainer>
                <RecipeBox>
                    <PreviewContainer>
                        <PreviewImg src={selectedRecipe.thumbnail} alt={`Imagen de ${selectedRecipe.title}`} />

                        <h3>Ingredientes:</h3>

                        <IngredientGrid>
                            {selectedRecipe.ingredients.map((ing, index) => (
                                <IngredientContainer key={index}>
                                        <IngredientImg>
                                            <img 
                                                src={ing.thumb} 
                                                alt={`Imagen de ${ing.name}`} 
                                            />
                                        </IngredientImg>
                                        
                                        <span>
                                            <strong>{ing.measure}  </strong>
                                        </span>

                                        <IngredientName>
                                            {ing.name}
                                        </IngredientName>
                                </IngredientContainer>
                            ))}

                        </IngredientGrid>
                    </PreviewContainer>

                    <InstructionsContainer>
                        <h3>Instructions:</h3>
                        <RecipeInstructionEach>
                            <ol>
                                {instructionsList.map((step, index) => (
                                    <li key={index}>
                                        {step.endsWith('.') ? step : `${step}.`}
                                    </li>
                                ))}
                            </ol>
                        </RecipeInstructionEach>
                        {selectedRecipe.video && (
                            <RecipeVideo 
                                src={selectedRecipe.video} 
                                title="Tutorial"
                            />
                        )}
                    </InstructionsContainer>
                </RecipeBox>
            <SuggestionsCarousel category={selectedRecipe.category}/>
            <FeedbackForm/>

            </DetailsContainer>
        </RecipeContainer>   
    )

}

export default DetailedRecipe;