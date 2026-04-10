import React, {useEffect, useRef, useState} from "react";
import { Link } from 'react-router-dom';
import menuIcon from '../Media/menu.svg';
import pageLogo from '../Media/logo.svg';
import searchLogo from '../Media/search.svg';

import { AppLogo, HeaderBar, MenuBox, MenuBtn, MenuClose, MenuNav, NavLinks, Overlay, SearchBox} from "./styles";
import NavAccordion from "../Accordion";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const handleClickOutMenu = (event) => {
            if(menuRef.current&& !menuRef.current.contains(event.target)){
                closeMenu();
            }
        };

        const handleEscKey = (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutMenu);
            document.addEventListener("keydown", handleEscKey);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutMenu);
            document.removeEventListener("keydown", handleEscKey);
        };
}, [menuOpen]);

    return (
        <HeaderBar>
            <MenuBox>
                <MenuBtn onClick={toggleMenu} aria-expanded={menuOpen} aria-label="Abrir menú de navegación">  
                    <img src={menuIcon} alt="Icono del menú"/>
                </MenuBtn>
            </MenuBox>
            <Overlay $show={menuOpen} onClick={toggleMenu}>
                <MenuNav $show={menuOpen} ref={menuRef} role="navigation" aria-label="Menú de navegación principal">
                    <MenuClose onClick={closeMenu}>
                        ✕ 
                    </MenuClose>

                    <NavLinks>  
                        <Link to="/Favorites" onClick={closeMenu}>
                            <p>Recetas Guardadas</p>
                        </Link>
                        <NavAccordion title={"Buscar"}>
                            <Link  to='/SearchRecipes' onClick={closeMenu}>
                                <p>por Receta</p>
                            </Link>
                            <Link  to='/SearchByCountry' onClick={closeMenu}>
                                <p>por Pais</p>
                            </Link>
                            <Link  to='/SearchByCategory' onClick={closeMenu}>
                                <p>por Categoria</p>
                            </Link>
                        </NavAccordion>
                    </NavLinks>                
                </MenuNav>
            </Overlay>


            <AppLogo>
                <Link to="/">
                    <img src={pageLogo} alt="Logo de la aplicación de recetas"/>
                </Link>
            </AppLogo>

            <SearchBox>
                <Link to="/SearchRecipes">
                    <img src={searchLogo} alt="Buscar recetas"/>
                </Link>
            </SearchBox>
            


        </HeaderBar>           
    );
}

export default Header;
