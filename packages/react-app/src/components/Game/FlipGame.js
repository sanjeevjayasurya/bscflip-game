import { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { addresses } from "@bscflip-game/contracts";
import { Centered, Image } from "../Styles";
import { GameContainer, GlobalContainer, SideContainer, SideSocials} from "./GameStyles";
import { DoubleOrNothing } from "./DoubleOrNothing/DoubleOrNothing";
import { DropDown } from "../DropDown/DropDown";
import { Winnings } from "./Winnings/Winnings";


export const FlipGame = (({ chainId, wrongChain, bscF, game }) => {
  const tokens = ["BNB"];

  const toggling = () => setIsOpen(!isOpen);

  const [{ data: account }] = useAccount({ fetchEns: false, });

  const [connected, setConnected] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(addresses[chainId].bscF);
  const [isOpen, setIsOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [betModal, openBetModal] = useState(false);

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
    <GlobalContainer>

      {!betModal && !gameStarted && <SideContainer>
        { connected && !wrongChain &&
          <Winnings game={game} bscF={bscF} chainId={chainId} />
        }
      </SideContainer>}
      <div>
        {!connected &&
          <Centered>CONNECT YOUR ACCOUNT TO START FLIPPING</Centered>
        }
        {connected && !wrongChain &&
        <GameContainer>
          {!gameStarted && false && <DropDown 
            options={tokens}
            onOptionClicked={onOptionClicked}
            selectedOption={selectedToken} 
            isOpen={isOpen}
            toggling={toggling} />}
          <DoubleOrNothing betModal={betModal} openBetModal={openBetModal} gameStarted={gameStarted} setGameStarted={setGameStarted} gameToken={selectedTokenAddress} bscF={bscF} game={game} />
        </GameContainer>
        }
        {wrongChain && connected &&
          <Centered>WRONG CHAIN! PLEASE CONNECT TO BSC</Centered>
        }
      </div>
      <SideContainer />
    </GlobalContainer>
  );
});