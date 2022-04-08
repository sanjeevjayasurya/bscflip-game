import styled from "styled-components";

export const WinningsListContainer = styled("div")``;

export const WinningsList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #F1B913;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #000000;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const WinningsListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;

  &:hover {
    background: #F1B213;
  }
`;