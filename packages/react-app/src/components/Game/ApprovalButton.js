import { parseUnits } from "@ethersproject/units";
import styled from "styled-components";

const Button = styled.button`
  background-color: #282B2E;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 5px;
  padding: 12px 24px;

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }

  ${props => !props.isDisabled && ":hover" } {
    background-color: #2F3236;
    opacity: 0.8;
  }
`;

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
    <Button onClick={approveContract}>
      APPROVE $BSCF
    </Button>
  );
});
