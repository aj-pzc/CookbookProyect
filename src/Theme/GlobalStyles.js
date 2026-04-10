import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    *, html,  body, button{
        box-sizing: border-box;
        scrollbar-width: none;
        margin:0;
        font-weight: 400;
        font-family: "EB Garamond", serif;


        .eb-garamond-<uniquifier> {
            font-family: "EB Garamond", serif;
            font-optical-sizing: auto;
            font-weight: <weight>;
            font-style: normal;
        }
    }
    
`
export const FavButton = styled.button`
    padding:0;
    margin:0;
    border:none;
    background-color:transparent;
        &:hover{
            cursor:pointer;
            transform:translateY(-3px);
        }
        &:active{
            transform: scale(0.7);
        }
`;

export const FavIcon = styled.img`
    width: 30px;
    height: auto;
`;

export const FavBox = styled.div`
    align-content: center;
    padding: 0 10px;
`;

export const AllRecipes = styled.section`
    background-color: #ffffff;
    border-radius: 8px;
    padding: 0 20px 20px 20px;
    margin: 0 auto 20px;
    max-width: 118rem;
    text-align: center; 
    height: auto;
    max-height: 55rem;
    overflow-y: scroll;
`;

export const ResultsGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 25px 20px;
    margin: 10px 5px;
    justify-items: center;
    
    @media(max-width: 480px){
        grid-template-columns: 1fr
    }

`

export const EachRecipe = styled.article`  
    display: flex;
    flex-direction: column;
    max-width: 500px;
    box-shadow: 1px 1px #36035817;
    background-color: #fefaff;
    padding: 15px 25px ;
    border-radius: 5px;

    &:hover{
        transform:translateY(-5px); 
        transition: transform 170ms ease-out

    }
`;

export const RecipeThumb = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
      img{
        max-width: 300px;
        max-height: auto;
    }
`;

export const RecipeDetails = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: -webkit-fill-available;
    min-height: 55px;
`;


export const RecipeItem = styled.div`
    width: 75%;
    margin-top: 5px;
    gap: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3{
        font-size: 1.2rem;
        font-weight: 600;    
    }

    P{
        font-size: 1rem;
        font-weight: 500;
    }
    a{
        text-decoration: none;
        color: #161616;

        &:hover{
            cursor: pointer;
            color: #6d606d;
        }

        &:active{
            cursor: pointer;
            color: #978497;
            transform: scale(0.9);      
        }

    }
`;


export const MessageAlert = styled.p`
    font-size: 1.1rem;
    font-weight: 500;
    margin-top: 10px;
`
export default GlobalStyle;


