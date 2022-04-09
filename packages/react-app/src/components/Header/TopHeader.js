import { Header } from "./HeaderStyles";
import { WalletButton } from "./WalletButton";
import styled from "styled-components";

const UtilButtonsDiv = styled.div`
  position: absolute;
  width: 10%;
  height: 70px;
  top: 0%;
  left: 0%;
  background: #ffffff;
`
const UtilButtonsSound = styled.button`
  display:block;
  position: relative;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: 1px solid red;
`

export const TopHeader = () => {
  return (
    <Header>
      <UtilButtonsDiv>
        <UtilButtonsSound>S</UtilButtonsSound>
        {/* <UtilButtonsEmail>E</UtilButtonsEmail> */}
      </UtilButtonsDiv>
      <WalletButton />
    </Header>    
  );
};