import { useState, useEffect } from "react";
import { useAccount } from 'wagmi';

import { addresses } from "@bscflip-game/contracts";
import { Centered, Image } from "../Styles";
import { GameContainer, GlobalContainer, SideContainer } from "./GameStyles";
import { DoubleOrNothing } from "./DoubleOrNothing/DoubleOrNothing";
import { DropDown } from "../DropDown/DropDown";
import { Winnings } from "./Winnings/Winnings";

<<<<<<< HEAD
import "./FlipGame.css";
export const FlipGame = (() => {
  const [{ data: signer, error: signerError, loading: loadingSigner }, getSigner] = useSigner();
  const [{ data: network, error: networkError, loading: loadingNetwork }, switchNetwork] = useNetwork();
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });
=======
export const FlipGame = (({ chainId, wrongChain, bscF, game }) => {
  const tokens = ["BSCF", "BNB"];
>>>>>>> 01fc7db37273a1065f24a61e956eda8ad5d200f0

  const toggling = () => setIsOpen(!isOpen);

  const [{ data: account }] = useAccount({ fetchEns: false, });

  const [connected, setConnected] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(addresses[chainId].bscF);
  const [isOpen, setIsOpen] = useState(false);

  const onOptionClicked = value => () => {
    setSelectedToken(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const showAllowances = async () => {
      if (game && bscF && account && bscF.signer) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    };
    showAllowances();
  }, [account, game, bscF]);

  useEffect(() => {
    if (selectedToken === "BNB") {
      setSelectedTokenAddress(addresses[chainId].bnb);
    } else if (selectedToken === "BSCF") {
      setSelectedTokenAddress(addresses[chainId].bscF);
    }
  }, [selectedToken, chainId]);


  return (
<<<<<<< HEAD
    <GameContainer>
      {!connected ?
      <Centered></Centered> :

      <Centered>YOUR $BSCF TOKEN BALANCE: {tokenBalance}</Centered>
      }
      
      {renderPage && !approved && connected &&
        <ApprovalButton bscF={bscF} game={game} />
      }
      {renderPage && approved && connected &&
        <DoubleOrNothing gameToken={bscF} game={game} />
      }
      {!renderPage && wrongChain && connected &&
        <Centered>WRONG CHAIN! PLEASE CONNECT TO BSC</Centered>
      }
      {!renderPage && !wrongChain && connected &&
        <Centered>ERROR LOADING GAME</Centered>
      }
    </GameContainer>
=======
    <GlobalContainer>
      <SideContainer>
        { connected && !wrongChain &&
          <Winnings game={game} bscF={bscF} chainId={chainId} />
        }
      </SideContainer>
      <div>
        {!connected &&
          <Centered>CONNECT YOUR ACCOUNT TO START FLIPPING</Centered>
        }
        {connected && !wrongChain &&
        <GameContainer>
          <DropDown 
            options={tokens}
            onOptionClicked={onOptionClicked}
            selectedOption={selectedToken} 
            isOpen={isOpen}
            toggling={toggling} />
          <DoubleOrNothing gameToken={selectedTokenAddress} bscF={bscF} game={game} />
        </GameContainer>
        }
        {wrongChain && connected &&
          <Centered>WRONG CHAIN! PLEASE CONNECT TO BSC</Centered>
        }
      </div>
      <SideContainer />
    </GlobalContainer>
>>>>>>> 01fc7db37273a1065f24a61e956eda8ad5d200f0
  );
});