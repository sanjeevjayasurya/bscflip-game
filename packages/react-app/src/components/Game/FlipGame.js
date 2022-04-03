import React, { useState, useEffect } from "react";
import { useAccount, useContract, useNetwork, useSigner } from 'wagmi';
import { formatUnits, parseUnits } from "@ethersproject/units";

import { addresses, abis } from "@project/contracts";
import { ApprovalButton } from "./ApprovalButton";
import { Centered } from "../Styles";
import { GameContainer, GameButton } from "./GameStyles";

export const FlipGame = (() => {
  const [{ data: signer, error: signerError, loading: loadingSigner }, getSigner] = useSigner();
  const [{ data: network, error: networkError, loading: loadingNetwork }, switchNetwork] = useNetwork();
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });

  const [approved, setApproved] = useState(false);
  const [chainId, setChainId] = useState(56);
  const [renderPage, setRenderPage] = useState(false);
  const [wrongChain, setWrongChain] = useState(false);
  const [connected, setConnected] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const requiredAllowance = parseUnits("5", 23);

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

  const approvedListener = () => {
    console.log("Approved!");
    setApproved(true);
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

      if(!account) {
        setConnected(false);
      }

      if (game && bscF && account && bscF.signer) {
        try {
          setConnected(true);
          const tokenBalance = await bscF.balanceOf(account.address);
          setTokenBalance(formatUnits(tokenBalance.toString()));
          const allowance = await bscF.allowance(account.address, game.address);
          setApproved(allowance._hex > requiredAllowance._hex);
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
    <GameContainer>
      {!connected ?
      <Centered>CONNECT YOUR ACCOUNT TO START FLIPPING</Centered> :
      <Centered>YOUR $BSCF TOKEN BALANCE: {tokenBalance}</Centered>
      }
      {renderPage && !approved && connected &&
        <ApprovalButton bscF={bscF} game={game} />
      }
      {renderPage && approved && connected &&
        <GameButton onClick={() => {

        }}>
          DOUBLE OR NOTHING
        </GameButton>
      }
      {!renderPage && wrongChain && connected &&
        <Centered>WRONG CHAIN! PLEASE CONNECT TO BSC</Centered>
      }
      {!renderPage && !wrongChain && connected &&
        <Centered>ERROR LOADING GAME</Centered>
      }
    </GameContainer>
  );
});