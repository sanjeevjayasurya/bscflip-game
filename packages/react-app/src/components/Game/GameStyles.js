import styled from "styled-components";

export const GlobalContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: calc(1px + 2vmin);
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 800px) {
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
  }
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 24px;
  min-width: 200px;
`;
