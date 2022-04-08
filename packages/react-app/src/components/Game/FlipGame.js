import { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { parseUnits } from "@ethersproject/units";

import { addresses } from "@project/contracts";
import { ApprovalButton } from "./ApprovalButton";
import { Centered } from "../Styles";
import { GameContainer, GlobalContainer, SideContainer } from "./GameStyles";
import { DoubleOrNothing } from "./DoubleOrNothing/DoubleOrNothing";
import { DropDown } from "../DropDown/DropDown";
import { Winnings } from "./Winnings/Winnings";

export const FlipGame = (({ chainId, wrongChain, bscF, game }) => {
  const tokens = ["BSCF", "BNB"];
  const requiredAllowance = parseUnits("5", 23);

  const toggling = () => setIsOpen(!isOpen);

  const [{ data: account }] = useAccount({ fetchEns: false, });

  const [approved, setApproved] = useState(false);
  const [connected, setConnected] = useState(false);
  const [renderPage, setRenderPage] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(addresses[chainId].bscF);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const showAllowances = async () => {
      if(!account) {
        setConnected(false);
      }

      if (game && bscF && account && bscF.signer) {
        try {
          setConnected(true);
          if (selectedToken !== "BNB") {
            const allowance = await bscF.allowance(account.address, game.address);
            setApproved(allowance._hex > requiredAllowance._hex);
          } else {
            setApproved(true);
          }
          setRenderPage(true);
        } catch (error) {
          console.log(error);
          setRenderPage(false);
        }
      }
    };
    showAllowances();
  }, [account, game, bscF]);

  const onOptionClicked = value => () => {
    setSelectedToken(value);
    setIsOpen(false);
  };

  const approvedListener = async (owner, spender, value) => {
    try {
      if (owner === bscF.signer) {
        const allowance = await bscF.allowance(account.address, game.address);
        setApproved(allowance._hex > requiredAllowance._hex);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (bscF && bscF.signer) {
      bscF.on("Approval", approvedListener);
    }

    return () => {
      if (bscF && bscF.signer) {
        bscF.off("Approval", approvedListener);
      }
    }
  }, [bscF]);

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
        {renderPage && !approved && connected &&
          <ApprovalButton bscF={bscF} game={game} />
        }
        {renderPage && approved && connected &&
          <div>
            <DropDown 
              options={tokens}
              onOptionClicked={onOptionClicked}
              selectedOption={selectedToken} 
              isOpen={isOpen}
              toggling={toggling} />
            <DoubleOrNothing gameToken={selectedTokenAddress} game={game} />
          </div>
        }
        {!renderPage && wrongChain && connected &&
          <Centered>WRONG CHAIN! PLEASE CONNECT TO BSC</Centered>
        }
        {!renderPage && !wrongChain && connected &&
          <Centered>ERROR LOADING GAME</Centered>
        }
      </GameContainer>
    </GlobalContainer>
  );
});