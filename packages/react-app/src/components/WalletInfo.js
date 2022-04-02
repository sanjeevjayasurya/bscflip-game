import { Web3Provider } from "@ethersproject/providers";
import { useState, useEffect } from "react";

export const useWalletData = ({ connection }) => {
    const [account, setAccount] = useState("");
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
                    const account = accounts[0];
                    setAccount(account);
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
        if (chainId && chainId !== 56 && chainId !== 97) {
            console.log("WRONG CHAIN!!", chainId);
        }
    }, [chainId]);

    useEffect(() => {
        if (connection?.on) {
            const handleAccountsChanged = (accounts) => {
                console.log("accountsChanged", accounts);
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
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

    return [account, chainId];
};