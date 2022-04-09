import styled from "styled-components";
import img from "../img/bg.png";



export const Header = styled.header`
  background-color: #2A2D32;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
`;

export const Body = styled.div`
  background-color: #2A2D32;
  height: 100vh;
  margin:0; 
  overflow: hidden;
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 10px;
`;

export const Centered = styled.p`
  text-align: center;
`

export const HeaderButton = styled.button`
  background-color: #282B2E;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 5px;
  padding: 12px 24px;

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }
`;

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
`;