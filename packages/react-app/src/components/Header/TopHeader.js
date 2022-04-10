import { useState, useEffect, useCallback } from "react";
import { useAccount } from 'wagmi';
import { formatUnits } from "@ethersproject/units";

import { Header, LeftHeader } from "./HeaderStyles";
import { WalletButton } from "./WalletButton";

export const TopHeader = ({ game, bscF, chainId, wrongChain }) => {
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });

  return (
    <Header>
      <LeftHeader>
      </LeftHeader>
      <WalletButton wrongChain={wrongChain} />
    </Header>    
  );
};