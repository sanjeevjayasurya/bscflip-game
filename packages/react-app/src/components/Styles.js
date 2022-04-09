import styled from "styled-components";
import img from "../img/bg.png";

export const Page = styled.div`
  position: relative;
  background-color: #2A2D32;
`

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
  opacity: 0.25;
  z-index: 0;

  height: 100%;
  width: 100%;
`

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
  margin: 5px;
  text-align: center;
`