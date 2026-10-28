import styled from "styled-components";

export const CarouselContainer = styled.div`
  margin: 15px 0;
  padding: 10px 20px 20px;
  border-top: 1px solid #d3968c;
  background-color: #fefaff;
  width:100%;
  text-align: center;


  h3 {
    margin-bottom: 20px;
    color: #333;  
  }
`;

export const CarouselScroll = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto; 
  padding-bottom: 15px;
  
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d3968c;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const SuggestionCard = styled.div`
  flex: 0 0 200px; 
  border: 1px solid #d3968c;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  h4 {
    padding: 10px;
    margin: 0;
    font-size: 0.9rem;
    text-align: center;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    flex: 1 1 150px;
    max-width: 150px;
  }
`;