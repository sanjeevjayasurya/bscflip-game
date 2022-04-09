import styled from "styled-components";

export const Header = styled.header`
  position: relative;
  z-index: 2;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
`;

export const LeftHeader = styled.div`
  margin-left: 12px;
  margin-right: auto;
`;

export const HeaderButton = styled.button`
    height: 50px;
    width: ${props => !props.wide ? "125px" : "200px"};
    background-color: ${props => props.isActive ? "#F1B913" : "#27292D"};
    border: 1px solid #545659;
    border-radius: ${props => !props.wide ? "20% / 50%" : "13% / 50%"};
    color: white;
    cursor: ${props => !props.isDisabled ? "pointer" : "not-allowed"};
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    margin: 0px 5px;
    padding: 12px 24px;
    opacity: ${props => !props.isDisabled ? 1 : 0.5};

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }

  &:hover {
    background-color: #2F3236;
    opacity: 0.8;
  }
`;