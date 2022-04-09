import styled from "styled-components";
import img from "../img/bg.png";

export const Body = styled.div`
  align-items: center;
  background-color: #2A2D32;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);

  /* The image used */
  background-image: url(${img});

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: -25% 200%;
  background-repeat: no-repeat;
  background-size: 50%;
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