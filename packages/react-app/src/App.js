import React, {useState} from "react";
import { Provider, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import styled from 'styled-components';
import { Body, Link, Image } from "./components/Styles";
import { TopHeader } from "./components/Header/TopHeader";
import { FlipGame } from "./components/Game/FlipGame";
import logo from "./bscfLogo.png";
import {Logo, Choice, Like, Heads, Tails, Button, ButtonHoverEffect, Amount, For, AmountBTNDiv, BNB_Button,
        DoubleOrNothingDiv, Span1, Span2, DoubleOrNothingBtn, LightEffect} from "./AppsStyle.js";

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
 
  function sayHello() {
    alert('You clicked me!');
  }



 
  return (
    <Provider autoConnect connectors={connectors}>
      <Link rel="stylesheet" href=""></Link>
      {/* <Link rel="stylesheet" href="App.css"></Link> */}
      <TopHeader />
      <Body>
          <Image src={logo} 
          style={{width: "600px", 
          height: "600px", 
          position: "absolute", 
          top: "45%", 
          left:"-10%" ,
          margin:"0px",
          opacity: 0.5,
          overflow: "hidden"
          }}
          alt="bscflip-logo"/>
          <Logo>  
            <Image src={logo} alt="bscflip-logo" />
          </Logo>
          <Choice>
            <Like>I LIKE</Like>
          </Choice>
            <Heads>
                <Button onClick={sayHello}>Heads</Button>
            </Heads>
            <Tails>
              <Button onClick={sayHello}>Tails</Button>
            </Tails>
            <Amount>
              <For>FOR</For>
                <AmountBTNDiv>
                  <BNB_Button onClick={sayHello}>0.05 bnb</BNB_Button>
                  <BNB_Button onClick={sayHello}>0.1 bnb</BNB_Button>
                  <BNB_Button onClick={sayHello}>0.25 bnb</BNB_Button>
                  <BNB_Button onClick={sayHello}>0.5 bnb</BNB_Button>
                </AmountBTNDiv>
            </Amount>
            <Span1></Span1>
                <DoubleOrNothingBtn>Double Or Nothing</DoubleOrNothingBtn>
            <Span2></Span2>
          <FlipGame />
        <LightEffect/>
      </Body>
    </Provider>
  );
}

export default App;
