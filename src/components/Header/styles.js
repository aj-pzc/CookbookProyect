import styled from "styled-components";

export const HeaderBar = styled.header`
    background-color: #fdf6ff;
    padding: 15px;
    width: 100%;
    text-align: center;
    font-size: 1.7rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        justify-content: center;
    }

    a{
        color: #000000;
        text-decoration: none;

        &:hover{
            cursor:pointer;
            color: #747273;        
        }

        :active{
            color: #57388a;
        }
    }
`;

export const MenuBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MenuBtn = styled.button`
    background-color: transparent;
    border: none;
    &:hover{
        cursor:pointer;
    }
        
    img{
        width: 55px;
        &:hover{
            transform: scale(0.85);
        }
    }

`;

export const MenuClose = styled.button`
    background-color: transparent;
    border:none;
    color:transparent;
    font-size: 1.5rem;
    font-weight: 600;
    &:hover{
        cursor:pointer;
        color: #d1cbcb;        
    }
    &:active{
        transform: scale(0.85);
    }
`;

export const AppLogo = styled.div`
    width: 90%;
    align-content: center;
    h1{
        font-size:2rem;
        font-weight: 300;
        letter-spacing:2    px;
    }
    img{
        width: 65px;
        &:hover{
            transform: scale(0.85);
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        order: -1;
    }
`;

export const Overlay = styled.div`
    display: none; 

    ${props => props.$show && `
        display: block;
        position: fixed; 
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px); 
        z-index: 2500; 
    `}
`;

export const MenuNav = styled.nav`
    display: none;
    
    ${props => props.$show &&`
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: flex-start;
        background-color: #fdf6ff;
        width: 18.5rem;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        z-index: 3000;
        padding: 30px 15px;
        box-shadow: 5px 0 #e4dada5d;        
        `
    }
`;

export const NavLinks = styled.div`
    display: flex;
    flex-direction: column;
    padding:10px 0 0 20px;
    gap: 15px;
`;

export const SearchBox = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 35px;
        &:hover{
            transform: scale(0.85);
        }
    }
`
