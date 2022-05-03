import styled from "styled-components";

export const DropDownContainer = styled("div")`
  width: 150px;
  margin: 0;
  position: relative;
  font-size: 14px;
  z-index:10;
`;

export const DropDownHeader = styled("div")`
  position: relative;
  margin-top: 5px;
  z-index:10;
  height: auto;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  border-radius: 0.375rem;
  font-size: 14px;
  color: white;
  background: black;
  cursor: pointer;
  border: 1px solid #3A3A3A;
  &:hover {
    background: #2F3236;
  }
`;

export const DropDownListContainer = styled("div")`
  position: relative;
  top: -14.5px;
  z-index: 0;
  width: 100%;
`;

export const DropDownList = styled("ul")`
  position: absolute;
  top: 100%;
  width: 100%;
  margin-top: 1px;
  padding: 0;
  background: black;
  border: 1px solid #3A3A3A;
  border-radius: 0 0 10px 10px;
  box-sizing: border-box;
  color: white;
  overflow: hidden;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem = styled("li")`
  list-style: none;
  cursor: pointer;
  padding: 10px 10px;
  display: flex;
  justify-items: center;
  &:hover {
    background: #2F3236;
  }
`;

export const Caret = styled.div`
  position: absolute;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  top: 45%;
  right: 10%;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid white;
`;

export const OverCaret = styled.div`
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  width: 0;
  height: 0;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  position: relative;
  top: -10px;
  left: -5px;
`;
