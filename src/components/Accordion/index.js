import { useState } from "react";
import { AccordionBody, AccordionHeader, AccordionItem } from "./styles";

const NavAccordion = ({ title, children }) => {
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

