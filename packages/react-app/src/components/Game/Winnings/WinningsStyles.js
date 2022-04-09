import styled from "styled-components";

export const WinningsListContainer = styled("div")``;

export const WinningsList = styled("ul")`
  min-width: 150px;
  margin-top: 10px;
  padding: 10px;
  background: #27292D;
  border: 1px solid #545659;
  border-radius: 5px;
  box-sizing: border-box;
  color: white;
  font-size: 15px;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const WinningsListItem = styled("li")`
  list-style: none;
  padding: 5px 5px;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background: #2F3236;
  }
`;

export const SmallText = styled.p`
  text-align: center;
  font-size: 8px;
  margin: 0;
`