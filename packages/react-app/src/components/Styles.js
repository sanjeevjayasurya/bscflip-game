import styled from "styled-components";
import img from "../img/bscflogo.png";

<<<<<<< HEAD


export const Header = styled.header`
  background-color: #131416;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
`;

export const Body = styled.div`
  background-image: linear-gradient(to top,rgba(19, 20, 22, 1), rgba(50,50,50,1)); 
  position: relative; 
  overflow-y: scroll;
  top: 0; right: 0; bottom: 0; left: 0; }
  height: 100vh;
  margin:0; 
  overflow: hidden;
`;
=======
export const Page = styled.div`
  position: relative;
  background-image: linear-gradient(to top,rgba(19, 20, 22, 1), rgba(50,50,50,1)); 
`

export const PageCanvas = styled.canvas`
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
`;

export const Body = styled.div`
  position: relative;
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
  z-index: 1;
`;

export const BackgroundImg = styled.div`
  position: absolute;
  top: 0;
  background-image: url(${img});
  background-position: bottom -100px left -130px;
  background-repeat: no-repeat;
  background-size: 600px;
  opacity: 0.1;
  z-index: 0;

  height: 100%;
  width: 100%;
`
>>>>>>> 01fc7db37273a1065f24a61e956eda8ad5d200f0

export const Image = styled.img`
  height: 225px;
  width: 225px;
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
  margin: 5px;
  text-align: center;
  letter-spacing: ${props => !props.spaced ? "0px" : "10px"};
  margin-bottom: ${props => !props.spaced ? "0px" : "20px"};
  `