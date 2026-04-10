import Header from ".";
import '@testing-library/jest-dom';

import { fireEvent, render, screen } from "../../test.utils";
import { BrowserRouter } from "react-router";

describe('Tests for Header Component', () =>{

    it('should render icons logo', () => {
        render(
            <Header/>
        );

        const icons = screen.getAllByRole('img');
        expect(icons).toHaveLength(3);
    }); 

    it('should render Nav Menu when clicked', () => {
        render(
                <Header/>
        );

        const menuBtn = screen.getByAltText(/Menu/i);
        fireEvent.click(menuBtn);

        expect(screen.getByText(/Buscar/i)).toBeInTheDocument();
        expect(screen.getByText(/Recetas Guardadas/i)).toBeInTheDocument();
    });

    it('should closed rendered nav menu when links are clicked', () => {
        render(
            <Header />
        );
        
        fireEvent.click(screen.getByAltText(/Menu/i));

        const searchLink = screen.getByText(/Recetas Guardadas/i);
        expect(searchLink).toBeVisible();

        fireEvent.click(searchLink);
        
        expect(searchLink).not.toBeVisible();
    });

    it('should close menu when a link is clicked', () => {

    render(
        <Header />
    );

    const menuBtn = screen.getByAltText(/Menu/i);
    fireEvent.click(menuBtn);
    expect(screen.getByText(/Buscar/i)).toBeVisible(); 

    fireEvent.click(screen.getByText(/Buscar/i));

    expect(screen.queryByText(/Recetas Guardadas/i)).not.toBeVisible();
  });

  it('debe cerrar el menú cuando se presiona la tecla Escape', () => {

        render(
        <BrowserRouter>
                    <Header />
        </BrowserRouter>
        );

        const btn = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(btn); // Abrir
        
        expect(screen.getByText(/Recetas Guardadas/i)).toBeVisible();

        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
        
        expect(screen.queryByText(/Recetas Guardadas/i)).not.toBeVisible();
    });

    it('debe cerrar el menú cuando se hace clic fuera del Nav', () => {
         render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        
        fireEvent.click(screen.getByRole('button', { name: /menu/i }));
        fireEvent.mouseDown(document); 
        
        expect(screen.queryByText(/Recetas Guardadas/i)).not.toBeVisible();
    });
})