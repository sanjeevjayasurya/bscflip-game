import { Web3Provider } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import React, { useState, useEffect } from "react";
import { GameButton } from "./Styles";
import { addresses, abis } from "@project/contracts";
import { Contract } from "@ethersproject/contracts";

import { useWalletData } from "./WalletInfo";

export const FlipGame = (({ connection }) => {
    const [account, chainId] = useWalletData(connection);
    const [contract, setContract] = useState();
    const [approved, setApproved] = useState(false);

    const requiredAllowance = parseUnits("1", 24);

    useEffect(() => {
        async function fetchDetails() {
            try {
                console.log(connection);
                if (!connection) {
                    return;
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchDetails();
    }, [connection]);

    useEffect(() => {
        async function fetchAllowance() {
        if (account) {
                const bscF = new Contract(addresses[chainId].bscF, abis.erc20, new Web3Provider(connection));
                setContract(bscF);
                const tokenBalance = await bscF.balanceOf(account);
                const allowance = await bscF.allowance(account, addresses[chainId].bscCoinFlip);
                console.log("Allowance: ", allowance);
                setApproved(allowance > requiredAllowance);
                console.log({ tokenBalance: tokenBalance.toString() });
            }
        }
        fetchAllowance();
    }, [chainId, account]);

    return (
        <div>
            {!approved &&
                <GameButton onClick={() => {

                }}>
                    APPROVE $BSCF
                </GameButton>
            }
            {approved &&
                <GameButton onClick={() => {

                }}>
                    DOUBLE OR NOTHING
                </GameButton>
            }
        </div>
    );
});