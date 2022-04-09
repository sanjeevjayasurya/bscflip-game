import { Header, Image, UtilButtonsDiv, UtilButtonsEmail, UtilButtonsSound, WhaleModeDiv, WhaleModeBorder,
        WhaleModeHeader, WhaleModeTXT, BetaBorder, BetaTXT, TryNowBtn} from "./HeaderStyles";
import {useState} from "react";
import { WalletButton } from "./WalletButton";
import styled from "styled-components";
import soundOnIcon from "./SoundOn.png";
import soundOffIcon from "./SoundOff.png";
import mail from "./mail.png";

 
 
function debug(){
  alert("check")
}

export const TopHeader = () => {
  const [Volume, VolumeOn] = useState(false)

  const mouseClickOn = () => {
    VolumeOn(true);
  }
  
  const mouseClickOff = () => {
    VolumeOn(false);
  }

  return (
    <Header>
      <UtilButtonsDiv>
        { Volume &&
          <UtilButtonsSound onClick={mouseClickOff}><Image src={soundOffIcon} 
              style={{width: "20px", height: "20px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", filter: "invert(1)"}}
              alt="sound" /></UtilButtonsSound>
        }
        { Volume == false &&
          <UtilButtonsSound onClick={mouseClickOn}><Image src={soundOnIcon} 
          style={{width: "20px", height: "20px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", filter: "invert(1)"}}
          alt="sound" /></UtilButtonsSound>
        }

        <UtilButtonsEmail><Image src = {mail} style={{width: "20px", height: "20px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",filter: "invert(1)"}}/></UtilButtonsEmail>
      </UtilButtonsDiv>
      <WhaleModeDiv>
        <WhaleModeBorder>
          <WhaleModeHeader>WHALE MODE</WhaleModeHeader>
          <WhaleModeTXT>1, 2, and 3 BNB</WhaleModeTXT>
          <BetaBorder>
            <BetaTXT>BETA</BetaTXT>
          </BetaBorder>
          <TryNowBtn>Try Now</TryNowBtn>
        </WhaleModeBorder>
      </WhaleModeDiv>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
      <WalletButton />
    </Header>    
  );
};