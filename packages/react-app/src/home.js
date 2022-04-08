import React, { useState, useEffect } from "react";
import { useAccount, useContract, useNetwork, useSigner } from 'wagmi';
import { formatUnits, parseUnits } from "@ethersproject/units";

import { addresses, abis } from "@project/contracts";
import { ApprovalButton } from "./ApprovalButton";
import { Centered } from "../Styles";
import { GameContainer } from "./GameStyles";
import { DoubleOrNothing } from "./DoubleOrNothing";

import "./FlipGame.css";
export const Home = (() => {

  return (
    <GameContainer>
        
    </GameContainer>
  );
});