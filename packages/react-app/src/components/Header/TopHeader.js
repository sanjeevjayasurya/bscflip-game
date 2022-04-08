import { useState, useEffect, useCallback } from "react";
import { useAccount } from 'wagmi';
import { formatUnits } from "@ethersproject/units";

import { Header, LeftHeader } from "./HeaderStyles";
import { WalletButton } from "./WalletButton";

export const TopHeader = ({ game, bscF, chainId, wrongChain }) => {
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });
  const [tokenBalance, setTokenBalance] = useState(0);

  const gameStartedListener = useCallback((better, token, winner, wager, id) => {
    if (account.address === better) {
      refreshTokenBalance();
    }
  }, [game, account, chainId]);

  const payoutCompleteListener = useCallback((better, token, winnings) => {
    if (account.address === better) {
      refreshTokenBalance();
    }
  }, [game, account, chainId]);

  useEffect(() => {
    refreshTokenBalance();
  }, [game, account, chainId]);

  const refreshTokenBalance = async () => {
    if (bscF && account && bscF.signer) {
      try {
        const tokenBalance = await bscF.balanceOf(account.address);
        setTokenBalance(formatUnits(tokenBalance.toString()));
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (game && game.signer) {
      game.on("GameStarted", gameStartedListener);
      game.on("PayoutComplete", payoutCompleteListener);
    }

    return () => {
      game.off("GameStarted", gameStartedListener);
      game.off("PayoutComplete", payoutCompleteListener);
    }
  }, [gameStartedListener, payoutCompleteListener]);

  useEffect(() => {
    refreshTokenBalance();
  }, [bscF, account]);

  return (
    <Header>
      <LeftHeader>
        $BSCF balance: {tokenBalance}
      </LeftHeader>
      <WalletButton wrongChain={wrongChain} />
    </Header>    
  );
};