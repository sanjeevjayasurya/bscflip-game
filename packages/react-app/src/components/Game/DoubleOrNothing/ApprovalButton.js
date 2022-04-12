import { parseUnits } from "@ethersproject/units";
import { GameButton } from "./FlipStyles";

export const ApprovalButton = (({ bscF, game }) => {
  const requestAllowance = parseUnits("1", 25);

  const approveContract = async () => {
    try {
      await bscF.approve(game.address, requestAllowance);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <GameButton 
      wide={true}
      onClick={approveContract}>
      APPROVE $BSCF
    </GameButton>
  );
});
