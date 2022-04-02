import React from "react";
import { Provider, chain, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import { Body, Image } from "./components/Styles";
import { TopHeader } from "./components/TopHeader";
import { FlipGame } from "./components/FlipGame";
import logo from "./bscfLogo.png";

function App() {
// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
const infuraId = process.env.INFURA_ID

// Chains for connectors to support
const chains = defaultChains

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0]
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'BSCFlip',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
    ]
  }

  return (
    <Provider autoConnect connectors={connectors}>
      <TopHeader />
      <Body>
        <Image src={logo} alt="bscflip-logo" />
        <FlipGame />
      </Body>
    </Provider>
  );
}

export default App;
