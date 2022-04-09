import { useState, useEffect } from "react";
import { useContract, useNetwork, useSigner } from 'wagmi'

import { addresses, abis } from "@bscflip-game/contracts"

import { BackgroundImg, Page, Body, Image } from "./components/Styles";
import { TopHeader } from "./components/Header/TopHeader";
import { FlipGame } from "./components/Game/FlipGame";

export const HomePage = (() => {
  const [{ data: network, error: networkError, loading: loadingNetwork }, switchNetwork] = useNetwork();
  const [{ data: signer, error: signerError, loading: loadingSigner }, getSigner] = useSigner();

  const [chainId, setChainId] = useState(56);
  const [wrongChain, setWrongChain] = useState(false);

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
      <TopHeader 
        game={game}
        bscF={bscF}
        chainId={chainId} 
        wrongChain={wrongChain}
      />
      <Body>
        <FlipGame 
          chainId={chainId} 
          wrongChain={wrongChain}
          bscF={bscF}
          game={game}
        />
      </Body>
      <BackgroundImg />
    </Page>
  );
});
