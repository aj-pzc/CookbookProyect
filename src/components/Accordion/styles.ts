import styled from "styled-components";

export const AccordionItem = styled.div`
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
  width: 100%;
`;

export const AccordionHeader = styled.button`
  width: 100%;
  border: none;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.7rem;
  &:hover {
    cursor:pointer;
    color: #747273;
  }
`;

export const AccordionBody = styled.div`
    padding: 15px;
    gap: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 8px;
    color: #000000;
    text-decoration: none;
    font-size: 1.5rem;


    &:hover{
        cursor:pointer;
        color: #747273;        
    }

    :active{
        color: #57388a;
    }
  }
`;