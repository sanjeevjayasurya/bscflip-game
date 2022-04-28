import { useState, useEffect, useCallback } from "react";
import { useAccount } from 'wagmi';

import SoundOnIcon from "./SoundOn.png";
import SoundOffIcon from "./SoundOff.png";
import { Header, LeftHeader, SoundButton, SoundImage, WhaleModeDiv } from "./HeaderStyles";
import { WalletButton } from "./WalletButton";
import GameModeDropDown from '../DropDown/GameModeDropDown'
export const TopHeader = ({ gameMode,setGameMode,game, bscF, chainId, wrongChain }) => {
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
  }

  return (
    <Header>
      <LeftHeader>
        <GameModeDropDown setGameMode={setGameMode} gameMode={gameMode}></GameModeDropDown>
        <SoundButton onClick={toggleVolume}>
          <SoundImage src={volumeImg} alt="sound" />
        </SoundButton>

      </LeftHeader>
      <WalletButton wrongChain={wrongChain} />
    </Header>    
  );
};