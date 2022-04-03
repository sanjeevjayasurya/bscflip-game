import styled from "styled-components";

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: calc(1px + 2vmin);
  justify-content: center;
`;

export const GameButton = styled.button`
  background-color: #282B2E;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 40px;
  padding: 12px 24px;

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }

  &:hover {
    background-color: #2F3236;
    opacity: 0.8;
  }
`;