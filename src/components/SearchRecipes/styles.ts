import styled from "styled-components";

export const SearchContainer = styled.div`
    background-color: #ffffff;
    text-align: center; 
    position: sticky;
    top:-1px;
    z-index: 1000;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    h2{
      margin:0;
      font-size:1.5rem;
    }
`;

export const SearchBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    background-color: #ffffff;
    padding-bottom: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`


export const SearchBtn = styled.button`
    background-color: #fefaff;
    border: 2px solid #d3968c;
    font-size: 1.1rem;
    padding: 5px 15px;
    border-radius: 25px;
    height: 2.5rem;
    text-align: center;

    &:hover{
        cursor:pointer;
        background-color: #f1e8f3;
    }

    &:active{
        transform: scale(0.97);
        background-color: #e0d8e2;
    }
`;
export const SearchBar = styled.input`
    border-radius: 25px;
    width: 75rem;
    height: 2.5rem;
    font-size: 1.1rem;
    border: 2px solid #d3968c;
    padding-left: 15px;
    &:hover{
     border: 2px solid #d3968c;
    }

    @media (max-width: 768px) {
        width: 100%;
        max-width: 20rem;
    }
`;

export const RecipeVideo = styled.iframe`
    width: 420px;
    height: 315px;
`
