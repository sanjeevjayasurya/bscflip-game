import styled from "styled-components";

export const Header = styled.header`
  position: relative;
  z-index: 2;
  min-height: 70px;
  max-height:150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
`;
export const StatusSVG = styled.div`
  margin: 0px 15px 0px 5px;
`;

export const LeftHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  margin-right: auto;
`;

export const SoundButton = styled.button`
  background: #1a1b1f;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: 1px solid #545659;
  cursor:pointer;

  &:hover {
    background-color: #2F3236;
    opacity: 0.8;
  }
`

export const SoundImage = styled.img`
  padding-top: 2px;
  width: 20px;
  height: 20px;
  filter: invert(1);
`

export const WhaleModeDiv = styled.div`
  background: #323232;
  opacity: 0.7;
  border-radius: 30px;
  border: 1px solid #414341;
  background-image: linear-gradient(to right, #5B543F,#36383C);
  font-size: 12px;
  padding: 15px 15px;
  margin-left: 10px;
  color: white;
`

export const HeaderButton = styled.button`
    height: 50px;
    width: ${props => !props.wide ? "125px" : "auto"};
    background-color: rgba(16, 16, 16, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 8px;
    color: white;
    cursor: ${props => !props.isDisabled ? "pointer" : "not-allowed"};
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    margin: 0px 5px;
    padding: 12px 24px;
    font-weight: 200;
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