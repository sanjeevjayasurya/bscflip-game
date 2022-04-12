<<<<<<< HEAD
import { Header, Image, UtilButtonsDiv, UtilButtonsEmail, UtilButtonsSound, WhaleModeDiv, WhaleModeBorder,
        WhaleModeHeader, WhaleModeTXT, BetaBorder, BetaTXT, TryNowBtn} from "./HeaderStyles";
import {useState} from "react";
=======
import { useState, useEffect, useCallback } from "react";
import { useAccount } from 'wagmi';

import SoundOnIcon from "./SoundOn.png";
import SoundOffIcon from "./SoundOff.png";
import { Header, LeftHeader, SoundButton, SoundImage, WhaleModeDiv } from "./HeaderStyles";
>>>>>>> 01fc7db37273a1065f24a61e956eda8ad5d200f0
import { WalletButton } from "./WalletButton";
import styled from "styled-components";
import soundOnIcon from "./SoundOn.png";
import soundOffIcon from "./SoundOff.png";
import mail from "./mail.png";

 
 
function debug(){
  alert("check")
}

<<<<<<< HEAD
export const TopHeader = () => {
  const [Volume, VolumeOn] = useState(false)

  const mouseClickOn = () => {
    VolumeOn(true);
  }
  
  const mouseClickOff = () => {
    VolumeOn(false);
=======
export const TopHeader = ({ game, bscF, chainId, wrongChain }) => {
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });
  const [volumeImg, setVolumeImg] = useState(SoundOnIcon);
  const [volumeOn, setVolumeOn] = useState(true);

  const toggleVolume = () => {
    if (volumeOn) {
      setVolumeImg(SoundOffIcon);
    } else {
      setVolumeImg(SoundOnIcon);
    }
    setVolumeOn(!volumeOn);
>>>>>>> 01fc7db37273a1065f24a61e956eda8ad5d200f0
  }

  return (
    <Header>
<<<<<<< HEAD
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
      <WalletButton />
=======
      <LeftHeader>
        <SoundButton onClick={toggleVolume}>
          <SoundImage src={volumeImg} alt="sound" />
        </SoundButton>
        <WhaleModeDiv>
          WHALE MODE - COMING SOON
        </WhaleModeDiv>
      </LeftHeader>
      <WalletButton wrongChain={wrongChain} />
>>>>>>> 01fc7db37273a1065f24a61e956eda8ad5d200f0
    </Header>    
  );
};