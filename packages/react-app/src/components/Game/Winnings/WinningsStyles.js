import styled from "styled-components";

export const WinningsListContainer = styled("div")``;

export const WinningsList = styled("ul")`
  min-width: 150px;
  margin-top: 10px;
  padding: 2px;
  background: #1a1b1f;
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
  padding: 10px 10px;
  // border-radius: 30px;
  cursor: pointer;
  &:hover {
    background: #2F3236;
    box-shadow: 0px 0px 5px 1px rgba(240, 185, 18, .5);
  }
`;

export const SmallText = styled.p`
  text-align: center;
  font-size: 8px;
  margin: 0;
`

export const MediumText = styled.p`
  text-align: center;
  font-size: 12px;
  margin-top: 0px;
  margin-bottom: 20px;
`