
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { Link } from "react-router-dom";
import { fetchByCategory } from "../../Redux/slice/search.slice"; 
import { CarouselContainer, CarouselScroll, SuggestionCard } from "./styles";
import type { RecipeSummary } from "../../types/recipe";

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];   
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }  
  return shuffled;
};


interface SuggestionsCarouselProps {
  category: string;
}

const SuggestionsCarousel = ({ category }: SuggestionsCarouselProps) => {
  const dispatch = useAppDispatch();
  const [suggestions, setSuggestions] = useState<RecipeSummary[]>([]);
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