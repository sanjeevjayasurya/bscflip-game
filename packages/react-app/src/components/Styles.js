import styled from "styled-components";
import img from "../img/nightTexture.png";
import flipImage from "../img/bscflogo.png"
export const Page = styled.div`
  position: relative;
  background-color: #000000;
  overflow:hidden;
`
export const FlipImage = styled.div`
position: absolute;
background-image: url(${flipImage});
background-repeat:no-repeat;
background-size: cover;
opacity: 0.075;
z-index: -1;
height: 100%;
width: 50%;
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
  border:none;
  top: 100px;
  background-image: url(${img});
  background-size: fill;
  opacity: 1;
  z-index: 0;
  height: 100%;
  width: 100%;
`

export const Image = styled.img`
  height: 350px;
  width: 350px;
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
  margin: 0px;
  text-align: center;
  letter-spacing: ${props => !props.spaced ? "0px" : "10px"};
  margin-bottom: ${props => !props.spaced ? "0px" : "10px"};
  `