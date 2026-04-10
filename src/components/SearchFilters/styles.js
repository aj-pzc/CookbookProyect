import styled from "styled-components";

export const FilterWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  flex-wrap: wrap; 
`;

export const DropdownList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  min-width: 200px;
  align-items: center;

  label {
    font-size: 1rem;
    font-weight: 600;
    color: #555;
    margin-left: 4px;
  }
`;

export const Select = styled.select`
  padding: 10px 15px;
  border-radius: 8px;
  border: 2px solid #d3968c;
  background-color: #fdf6ff;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d3968c; 
  }

  &:focus {
    border-color: #d3968c;
    box-shadow: 0 0 8px rgba(255, 99, 71, 0.2);
  }

  option {
    padding: 10px;
  }

  &::-webkit-scrollbar {
    display: none;
  }  
`;

export const ResetButton = styled.button`
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
`