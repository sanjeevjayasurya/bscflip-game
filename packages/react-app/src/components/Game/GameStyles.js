import styled from "styled-components";

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: calc(1px + 2vmin);
  justify-content: center;
`;

export const FlipContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const GameButton = styled.button`
  background-color: ${props => props.isActive ? "#F1B913" : "#282B2E"};
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 5px;
  padding: 12px 24px;
  opacity: ${props => !props.isDisabled ? 1 : 0.5};

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }

  ${props => !props.isDisabled && ":hover" } {
    background-color: ${props => props.isActive ? "#F1B213" : "#2F3236"};
    opacity: 0.8;
  }
`;