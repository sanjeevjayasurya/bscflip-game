import { useState, useEffect, useCallback } from "react";
import { useAccount } from 'wagmi';

import SoundOnIcon from "./SoundOn.png";
import SoundOffIcon from "./SoundOff.png";
import { Header, LeftHeader, SoundButton, SoundImage, StatusSVG } from "./HeaderStyles";
import { WalletButton } from "./WalletButton";
import GameModeDropDown from '../DropDown/GameModeDropDown'

import { headerButtonSVG } from "../../svgs/svgs";
import "./TopHeader.css"

export const TopHeader = ({ gameMode,setGameMode,game, bscF, chainId, wrongChain }) => {
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });
  const [volumeImg, setVolumeImg] = useState(SoundOnIcon);
  const [volumeOn, setVolumeOn] = useState(true);
  const [headerOption, setHeaderOption] = useState(true);

  const toggleVolume = () => {
    if (volumeOn) {
      setVolumeImg(SoundOffIcon);
    } else {
      setVolumeImg(SoundOnIcon);
    }
    setVolumeOn(!volumeOn);
  }

  return (
    <Header>
      <LeftHeader>
        <GameModeDropDown setGameMode={setGameMode} gameMode={gameMode}></GameModeDropDown>
        <div className="headerOptionDiv">
          <div  className="headerOptionButton" onClick={()=>{headerOption !== "learn" ? setHeaderOption("learn") : setHeaderOption(false)}}>{headerButtonSVG("learn",headerOption === "learn")}</div>
          <div className="headerOptionButton" onClick={()=>{headerOption !== "activity" ? setHeaderOption("activity") : setHeaderOption(false)}}>{headerButtonSVG("activity",headerOption === "activity")}</div>
          <div className="headerOptionButton" onClick={()=>{headerOption !== "stats" ? setHeaderOption("stats") : setHeaderOption(false)}}>{headerButtonSVG("stats",headerOption === "stats")}</div>
        </div>
        <SoundButton onClick={toggleVolume}>
          <SoundImage src={volumeImg} alt="sound" />
        </SoundButton>

      </LeftHeader>
      <WalletButton wrongChain={wrongChain} />
      <StatusSVG>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5.5" cy="5.5" r="5.5" fill="#24FF00"/>
      </svg>
      </StatusSVG>
    </Header>    
  );
};