import { useState, useEffect, useCallback } from "react";
import { useAccount } from 'wagmi';

import SoundOnIcon from "./SoundOn.png";
import SoundOffIcon from "./SoundOff.png";
import { Header, LeftHeader, SoundButton, SoundImage, WhaleModeDiv } from "./HeaderStyles";
import { WalletButton } from "./WalletButton";

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
  }

  return (
    <Header>
      <LeftHeader>
        <SoundButton onClick={toggleVolume}>
          <SoundImage src={volumeImg} alt="sound" />
        </SoundButton>
        <WhaleModeDiv>
          WHALE MODE - COMING SOON
        </WhaleModeDiv>
      </LeftHeader>
      <WalletButton wrongChain={wrongChain} />
    </Header>    
  );
};