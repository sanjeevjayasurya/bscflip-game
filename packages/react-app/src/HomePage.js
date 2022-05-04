import { useState, useEffect } from "react";
import { useContract, useNetwork, useSigner } from 'wagmi'

import { addresses, abis } from "@bscflip-game/contracts"

import { BackgroundImg, Page, Body, Image, PageCanvas, FlipImage } from "./components/Styles";
import { SideSocials} from "./components/Game/GameStyles";
import { TopHeader } from "./components/Header/TopHeader";
import { FlipGame } from "./components/Game/FlipGame";
import  KingGame  from "./components/Game/KingGame";
import  Footer  from "./components/Footer/Footer";
import discordImage from "./img/discord.svg"
import twitterImage from "./img/twitter.svg"
import telegramImage from "./img/telegram.svg"
import flipCoinGif from "./img/512spin.gif";
export const HomePage = (() => {
  const [{ data: network, error: networkError, loading: loadingNetwork }, switchNetwork] = useNetwork();
  const [{ data: signer, error: signerError, loading: loadingSigner }, getSigner] = useSigner();



  const [chainId, setChainId] = useState(56);
  const [wrongChain, setWrongChain] = useState(false);
  const [gameMode, setGameMode] = useState("coinflip");

  const bscF = useContract({
    addressOrName: addresses[chainId].bscF,
    contractInterface: abis.bscF,
    signerOrProvider: signer,
  });
  const game = useContract({
      addressOrName: addresses[chainId].bscCoinFlip,
      contractInterface: abis.bscCoinFlip,
      signerOrProvider: signer,
  });

  useEffect(() => {
    const showAllowances = async () => {
      if (network.chain?.id === 56) {
        setChainId(56);
        setWrongChain(false);
      } else if (network.chain?.id === 97) {
        setChainId(97);
        setWrongChain(false);
      } else {
        setWrongChain(true);
      }
    };
    showAllowances();
  }, [network]);

  return (
    <Page>
      <PageCanvas id="canvas"/>
      <TopHeader 
        gameMode={gameMode}
        setGameMode={setGameMode}
        game={game}
        bscF={bscF}
        chainId={chainId} 
        wrongChain={wrongChain}
      />
      <Body>
      <SideSocials>
        <div className="socialIcon"><a href="https://discord.gg/jPnBDSRG" target="_blank"><img src={discordImage}></img></a></div>
        <div className="socialIcon"><a href="https://twitter.com/BSCFlip" target="_blank"><img src={twitterImage}></img></a></div>
        <div className="socialIcon"><a href="https://www.t.me/bscflip" target="_blank"><img src={telegramImage}></img></a></div>
      </SideSocials>
      <FlipImage/> 
      {gameMode === "coinflip" ? <FlipGame flipCoinGif={flipCoinGif} chainId={chainId} wrongChain={wrongChain} bscF={bscF} game={game}/> : <></>}
      {gameMode === "kingflip" ? <KingGame/>: <></>}
      <Footer           
          chainId={chainId} 
          wrongChain={wrongChain}
          bscF={bscF}
          game={game}/>
      </Body>
      <BackgroundImg />
    </Page>
  );
});
