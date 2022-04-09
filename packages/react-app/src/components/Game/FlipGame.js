import { useState, useEffect } from "react";
import { useAccount } from 'wagmi';

import { addresses } from "@bscflip-game/contracts";
import { Centered } from "../Styles";
import { GameContainer, GlobalContainer, SideContainer } from "./GameStyles";
import { DoubleOrNothing } from "./DoubleOrNothing/DoubleOrNothing";
import { DropDown } from "../DropDown/DropDown";
import { Winnings } from "./Winnings/Winnings";

export const FlipGame = (({ chainId, wrongChain, bscF, game }) => {
  const tokens = ["BSCF", "BNB"];

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
    <GlobalContainer>
      <SideContainer>
        <Winnings game={game} chainId={chainId} />
      </SideContainer>
      <GameContainer>
        {!connected &&
          <Centered>CONNECT YOUR ACCOUNT TO START FLIPPING</Centered>
        }
        {connected &&
          <div>
            <DropDown 
              options={tokens}
              onOptionClicked={onOptionClicked}
              selectedOption={selectedToken} 
              isOpen={isOpen}
              toggling={toggling} />
            <DoubleOrNothing gameToken={selectedTokenAddress} bscF={bscF} game={game} />
          </div>
        }
        {wrongChain && connected &&
          <Centered>WRONG CHAIN! PLEASE CONNECT TO BSC</Centered>
        }
      </GameContainer>
    </GlobalContainer>
  );
});