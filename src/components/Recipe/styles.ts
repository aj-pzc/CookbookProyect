import styled from "styled-components";

export const RecipeContainer = styled.div`
    background-color: #fdf6ff;
    border-radius: 8px;
    margin: 0 auto 20px;
    max-width: 118rem;
    text-align: center;
    max-height: 56.7rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:10px;
    
}
`
export const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #fdf6ff;
    width: 100%;
    justify-content: center;
    gap: 20px;
    padding: 25px 0;
    position: sticky;
    top:0;
`

export const RecipeName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    p{
        font-size:.9rem;
    }
`


export const DetailsContainer =styled.div`
    display: flex;
    justify-content:center;
    flex-direction: column;
    width: 95%;
    align-items: center;
`
export const RecipeBox =styled.div`
    display: flex;
    border-radius: 8px;
    gap: 10px;
    flex-direction: column;
    justify-content: center;


    @media(min-width: 768px){
        flex-direction: row;
        justify-content: space-evenly;

    }

`
export const PreviewContainer = styled.div` 
    display: flex;
    width: 100%; 
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    background-color: #fefaff;

    h3{
        font-size: 1.5rem;
        font-weight: 500;
        padding-top: 30px;
    }
    
    ul{
        list-style-type: none
    }

    @media (min-width: 768px) {
        width: 45%; 
    }
}
`
export const PreviewImg = styled.img`
    width: auto;
    max-width: 350px;
`
export const IngredientContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
    align-content: center;
    min-width: 250px;
    align-items: center;
`
export const IngredientGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
    gap: 15px 10px;
    max-width: 700px;
    justify-items: center;
    align-items: center;
    justify-content: center;
`
export const IngredientImg = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    img{
        width: 50px;
    }
`
export const IngredientName = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
`
export const IngredientMeasure = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
`
export const InstructionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px;
    width: 100%;
    gap: 10px;
    background-color: #fefaff;
    justify content: flex-start;
    overflow:scroll;
    align-items: center;

    h3{
        font-size: 1.5rem;
        font-weight: 500;
        padding-bottom:10px;
    }

    @media (min-width: 768px) {
        width: 50%;
    }
`

export const RecipeVideo = styled.iframe`
    width: 100%;       
    max-width: 500px;  
    aspect-ratio: 16 / 9; 
    height: auto;
`

export const RecipeInstructionEach = styled.div`
    padding-left: 10px;
    text-align: start;
    font-size: 1.1rem;
    margin-bottom: 25px;
    ol{
        margin: 0 10px 0 35px;
        padding: 0;
    }

    li{
        font-weight: 500;
        margin-bottom:15px;
        padding-left: 7px;
    }
`