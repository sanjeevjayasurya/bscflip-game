import React from "react";
import { Provider } from "wagmi";

import { Body, Header, Image } from "./components/Styles";
import { WalletButton } from "./components/WalletButton";
import { FlipGame } from "./components/FlipGame";
import logo from "./bscfLogo.png";

import useWeb3Modal from "./hooks/useWeb3Modal";

function App() {
  const [connection, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

/*  
  import { useQuery } from "@apollo/react-hooks";
  import GET_TRANSFERS from "./graphql/subgraph";

  const { loading, error, data } = useQuery(GET_TRANSFERS);

  useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);*/

  return (
    <Provider>
      <Header>
        <WalletButton connection={connection} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
        <Image src={logo} alt="bscflip-logo" />
        <FlipGame connection={connection} />
      </Body>
    </Provider>
  );
}

export default App;
