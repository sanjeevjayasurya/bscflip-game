import React, { useState, useEffect } from "react";
import { useAccount, useContract, useNetwork, useSigner } from 'wagmi'
import { formatUnits, parseUnits } from "@ethersproject/units";

import { addresses, abis } from "@project/contracts";
import { GameButton } from "./Styles";

export const FlipGame = (() => {
  const [{ data: signer, error: signerError, loading: loadingSigner }, getSigner] = useSigner();
  const [{ data: network, error: networkError, loading: loadingNetwork }, switchNetwork] = useNetwork();
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });
  const bscFMainnet = useContract({
      addressOrName: addresses[56].bscF,
      contractInterface: abis.bscF,
      signerOrProvider: signer,
  });
  const gameMainnet = useContract({
      addressOrName: addresses[56].bscCoinFlip,
      contractInterface: abis.bscCoinFlip,
      signerOrProvider: signer,
  });
  const bscFTestnet = useContract({
      addressOrName: addresses[97].bscF,
      contractInterface: abis.bscF,
      signerOrProvider: signer,
  });
  const gameTestnet = useContract({
      addressOrName: addresses[97].bscCoinFlip,
      contractInterface: abis.bscCoinFlip,
      signerOrProvider: signer,
  });
  const [bscF, setBscF] = useState();
  const [game, setGame] = useState();
  const [approved, setApproved] = useState(false);
  const [renderPage, setRenderPage] = useState(false);
  const [wrongChain, setWrongChain] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const requiredAllowance = parseUnits("1", 24);

  useEffect(() => {
    const showAllowances = async () => {
      if (network.chain?.id === 56) {
        setGame(gameMainnet);
        setBscF(bscFMainnet);
        setWrongChain(false);
  
      } else if (network.chain?.id === 97) {
        setGame(gameTestnet);
        setBscF(bscFTestnet);
        setWrongChain(false);
      } else {
        setWrongChain(true);
      }

      if (game && bscF && account && bscF.signer) {
        try {
          const tokenBalance = await bscF.balanceOf(account.address);
          setTokenBalance(formatUnits(tokenBalance.toString()));
          const allowance = await bscF.allowance(account.address, game.address);
          setApproved(allowance > requiredAllowance);
          setRenderPage(true);
        } catch (error) {
          console.log(error);
          setRenderPage(false);
        }
      }
    };
    showAllowances();
  }, [network, setTokenBalance]);

  return (
    <div>
      YOUR $BSCF TOKEN BALANCE: {tokenBalance}<br />
      {renderPage && !approved &&
        <GameButton onClick={() => {

        }}>
          APPROVE $BSCF
        </GameButton>
      }
      {renderPage && approved &&
        <GameButton onClick={() => {

        }}>
          DOUBLE OR NOTHING
        </GameButton>
      }
      {!renderPage && wrongChain &&
        <p>WRONG CHAIN! PLEASE CONNECT TO BSC</p>
      }
      {!renderPage && !wrongChain &&
        <p>ERROR LOADING GAME</p>
      }
    </div>
  );
});