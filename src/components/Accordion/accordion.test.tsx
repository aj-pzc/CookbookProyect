import NavAccordion from ".";
import { fireEvent, render, screen } from "../../test.utils";

describe('Tests for Accordion Component', () =>{
    it('should render title and be closed by default', () => {
        render(
            <NavAccordion title="Mi Acordeón">
                <p>Contenido Nav</p>
            </NavAccordion>
        );
        expect(screen.getByText('Mi Acordeón')).toBeInTheDocument();
        expect(screen.getByText('+')).toBeInTheDocument();
        expect(screen.queryByText('Contenido Nav')).not.toBeInTheDocument();
    });

    it('should open and show children when header is clicked', () => {
        render(
            <NavAccordion title="Click Aquí">
                <div>Contenido Visible</div>
            </NavAccordion>
        );

            const header = screen.getByText('Click Aquí');
            fireEvent.click(header);

        expect(screen.getByText('Contenido Visible')).toBeInTheDocument();
        expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('should toggle visibility when clicked multiple times', () => {
        render(
            <NavAccordion title="Toggle">
                <span>Contenido</span>
            </NavAccordion>
        );
            const header = screen.getByText('Toggle');            
            fireEvent.click(header);
        expect(screen.getByText('Contenido')).toBeInTheDocument();

            fireEvent.click(header);
        expect(screen.queryByText('Contenido')).not.toBeInTheDocument();
        expect(screen.getByText('+')).toBeInTheDocument();
    });

    
});