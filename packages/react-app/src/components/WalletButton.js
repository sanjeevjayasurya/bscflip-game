import { Web3Provider } from "@ethersproject/providers";
import React, { useState, useEffect } from "react";
import { HeaderButton } from "./Styles";

export const WalletButton = (({ connection, loadWeb3Modal, logoutOfWeb3Modal }) => {
    const [account, setAccount] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [chainId, setChainId] = useState("");

    useEffect(() => {
        async function fetchDetails() {
            try {
                if (!connection) {
                    return;
                }

                const provider = new Web3Provider(connection);
                const network = await provider.getNetwork();
                const accounts = await provider.listAccounts();
                if(accounts.length > 0) {
                    console.log("OK");
                    const account = accounts[0];
                    setAccount(account);
                    if (buttonText !== "WRONG CHAIN") {
                        setButtonText(account);
                    }
                }
                if (network) {
                    setChainId(network.chainId);
                }
            } catch (err) {
                setAccount("");
                console.error(err);
            }
        }
        fetchDetails();
    }, [connection, account, setAccount]);

    useEffect(() => {
        if (chainId) {
            if (chainId !== 56 && chainId !== 97) {
                console.log("WRONG CHAIN!!", chainId);
                setButtonText("WRONG CHAIN");
                return;
            } else {
                setButtonText(account);
            }
        }
    }, [chainId]);

    useEffect(() => {
        if (connection?.on) {
            const handleAccountsChanged = (accounts) => {
                console.log("accountsChanged", accounts);
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
                    logoutOfWeb3Modal();
                    setAccount("");
                }
            };
        
            const handleChainChanged = (hexChainId) => {
                const chain = parseInt(hexChainId, 16);
                console.log("chainId: ", chain);
        
                setChainId(chain);
            };
        
            const handleDisconnect = () => {
                console.log("disconnect");
                // disconnect();
            };
        
            connection.on("accountsChanged", handleAccountsChanged);
            connection.on("chainChanged", handleChainChanged);
            connection.on("disconnect", handleDisconnect);
        
            return () => {
                if (connection.removeListener) {
                    connection.removeListener("accountsChanged", handleAccountsChanged);
                    connection.removeListener("chainChanged", handleChainChanged);
                    connection.removeListener("disconnect", handleDisconnect);
                }
            };
        }
    }, [connection]);

    return (
        <HeaderButton onClick={() => {
            if (!connection || account === "") {
                loadWeb3Modal();
            } else {
                logoutOfWeb3Modal();
            }
        }}
        >
            {buttonText === "" && "CONNECT WALLET"}
            {buttonText === "WRONG CHAIN" && "WRONG CHAIN"}
            {(buttonText !== "" && buttonText !== "WRONG CHAIN") && account.substring(0, 6) + '...' + account.substring(38) }
        </HeaderButton>
    );
});