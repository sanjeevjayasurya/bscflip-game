import React from "react";
import { parseUnits } from "@ethersproject/units";
import { GameButton } from "./GameStyles";

export const ApprovalButton = (({ bscF, game }) => {
  const requiredAllowance = parseUnits("1", 24);

  const approveContract = async () => {
    try {
      await bscF.approve(game.address, requiredAllowance);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <GameButton onClick={approveContract}>
      APPROVE $BSCF
    </GameButton>
  );
});
