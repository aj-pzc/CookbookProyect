
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchByCategory } from "../../Redux/slice/search.slice"; 
import { CarouselContainer, CarouselScroll, SuggestionCard } from "./styles";

export const shuffleArray = (array) => {
  const shuffled = [...array];   
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }  
  return shuffled;
};


const SuggestionsCarousel = ({ category }) => {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const actionResult = await dispatch(fetchByCategory(category)).unwrap();
        const shuffled = shuffleArray(actionResult);        
        setSuggestions(shuffled.slice(0, 15)); 
      } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
        setLocalLoading(false);
      }
    };

    if (category) getSuggestions();
  }, [category, dispatch]);

  if (localLoading) 
    return <p>Getting you suggestions...</p>;

  if (suggestions.length === 0) 
    return null; 

  return (
    <CarouselContainer>
        <h3>Recetas relacionadas a: {category}</h3>
        <CarouselScroll role="list" aria-label={`Sugerencias de recetas de ${category}`}>
        {suggestions.map((recipe) => (
          <SuggestionCard key={recipe.id} role="listitem">
            <Link to={`/recipe/${recipe.id}`}>
              <img src={recipe.thumbnail} alt={`Imagen de ${recipe.title}`} />
              <h4>{recipe.title}</h4>
            </Link>
          </SuggestionCard>
        ))}
      </CarouselScroll>
    </CarouselContainer>

  );
};

export default SuggestionsCarousel;