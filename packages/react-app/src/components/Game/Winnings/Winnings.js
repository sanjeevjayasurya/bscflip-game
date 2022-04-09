import React, { useState, useEffect, useCallback } from "react";
import { useAccount } from 'wagmi';
import { formatUnits } from "@ethersproject/units";

import { addresses } from "@bscflip-game/contracts";
import { WinningsListContainer, WinningsList, WinningsListItem, SmallText } from "./WinningsStyles";
import { Centered } from "../../Styles";

export const Winnings = (({ game, chainId }) => {
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });
  const [unclaimedBSCF, setUnclaimedBSCF] = useState(0);
  const [unclaimedBNB, setUnclaimedBNB] = useState(0);

  const gameFinishedListener = useCallback((better, token, winner, wager, id) => {
    if (account.address === better) {
      refreshWinnings();
    }
  }, [game, account, chainId]);

  const payoutCompleteListener = useCallback((better, token, winnings) => {
    if (account.address === better) {
      refreshWinnings();
    }
  }, [game, account, chainId]);

  const refreshWinnings = async() => {
    if (game.signer && account) {
      try {
        const bscf = await game._winnings(account.address, addresses[chainId].bscF);
        const bnb = await game._winnings(account.address, addresses[chainId].bnb);
        setUnclaimedBSCF(formatUnits(bscf.toString()));
        setUnclaimedBNB(formatUnits(bnb.toString()));
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    refreshWinnings();
  }, [game, account, chainId]);

  useEffect(() => {
    if (game && game.signer) {
      game.on("GameFinished", gameFinishedListener);
      game.on("PayoutComplete", payoutCompleteListener);
    }

    return () => {
      game.off("GameFinished", gameFinishedListener);
      game.off("PayoutComplete", payoutCompleteListener);
    }
  }, [gameFinishedListener, payoutCompleteListener]);

  const claimWinnings = async (address) => {
    try {
      await game.claimWinnings(address);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WinningsListContainer>
      <Centered>WINNINGS</Centered>
      <SmallText>CLICK TO CLAIM</SmallText>
      <WinningsList>
        <WinningsListItem onClick={() => claimWinnings(addresses[chainId].bscF)}>
          BSCF: {unclaimedBSCF}
        </WinningsListItem>
        <WinningsListItem onClick={() => claimWinnings(addresses[chainId].bnb)}>
          BNB: {unclaimedBNB}
        </WinningsListItem>
      </WinningsList>
    </WinningsListContainer>
  );
});
