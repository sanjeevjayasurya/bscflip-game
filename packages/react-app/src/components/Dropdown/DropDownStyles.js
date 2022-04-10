import styled from "styled-components";

export const DropDownContainer = styled("div")`
  width: 200px;
  margin: 0 auto;
`;

export const DropDownHeader = styled("div")`
  position: relative;
  margin-top: 5px;
  height: 30px;
  padding-top: 15px;
  padding-left: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  border-radius: 10% / 50%;
  font-size: 12px;
  color: #000000;
  background: #F1B913;
  cursor: pointer;

  &:hover {
    background: #F1B213;
  }
`;

export const DropDownListContainer = styled("div")`
  position: relative;
`;

export const DropDownList = styled("ul")`
  position: absolute;
  left: 10%; top: 100%; 
  width: 80%;
  margin-top: 1px;
  padding: 0;
  background: #F1B913;
  border: 2px solid #545659;
  border-radius: 0 0 10px 10px;
  box-sizing: border-box;
  color: #000000;
  font-size: 12px;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem = styled("li")`
  list-style: none;
  padding: 1px 5px 10px 5px;
  cursor: pointer;

  &:hover {
    background: #F1B213;
    border-radius: 0 0 10px 10px;
  }
`;

export const Caret = styled.div`
  position: absolute;
  transform: ${props => props.isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  top: 45%;
  right: 10%;
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
`

export const OverCaret = styled.div`
  transform: ${props => props.isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  width: 0;
  height: 0;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  position: relative;
  top: -10px;
  left: -5px;
`