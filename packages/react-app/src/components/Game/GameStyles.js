import styled from "styled-components";

export const GlobalContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: calc(1px + 2vmin);
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
  }
`;

export const CoinOptionsContainer = styled.div`

`

export const SideSocials = styled.div`
  padding:5px;
  left:10px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
  position:fixed;
  width:auto;
  height:7rem;
`

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

export const SideContainer = styled.div`
  display: flex;
  position:relative;
  flex-direction: column;
  justify-content: center;
  margin: 0px 24px;
  top:-100px;
  min-width: 200px;
`;
