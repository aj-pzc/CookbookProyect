import styled from "styled-components";

export const FormContainer = styled.div`
  margin: 15px 0;
  padding: 10px 20px 20px;
  background-color: #fdf6ff;
  text-align: center;
  display:flex;
  justify-content: center;
  flex-direction: column;
  min-width: 800px;

  h3 {
    margin-bottom: 20px 0;
    color: #333;  
    font-size: 1.3rem;
  }
`;

export const CommentsContainer = styled.div`
  margin: 15px 0;
  padding: 10px 20px 0;
  background-color: #fefaff;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const FormItem = styled.div`
  text-align: center;
  display:flex;
  padding: 10px;
  flex-direction: row;
  justify-content: space-evenly;
  gap:10px;
  width:100%;
  font-size: 1.2rem;
  align-items: center;

`;

export const CommentsItem = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-items: flex-start;
  font-size: 1.2rem;
  margin-top: 10px;
}
`;

export const InputBox = styled.input`
    border-radius: 5px;
    width: 80%;
    height: 2.2rem;
    font-size: 1.1rem;
    border: 2px solid #d3968c;
    padding-left: 15px;
    &:hover{
     border: 2px solid #d3968c;
    }
`;

export const FromBtn = styled.button`
    background-color: #fdf6ff;
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
