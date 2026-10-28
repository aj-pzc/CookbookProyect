import { useState, type ReactNode } from "react";
import { AccordionBody, AccordionHeader, AccordionItem } from "./styles";

interface NavAccordionProps {
  title: string;
  children: ReactNode;
}

const NavAccordion = ({ title, children }: NavAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span>{isOpen ? "-" : "+"}</span>
      </AccordionHeader>
      
      {isOpen && (
        <AccordionBody>
          {children}
        </AccordionBody>
      )}
    </AccordionItem>
  );
};

export default NavAccordion;
