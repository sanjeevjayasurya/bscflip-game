import { useAccount, useConnect } from 'wagmi';

import { HeaderButton } from "./HeaderStyles";

export const WalletButton = ({ wrongChain }) => {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });

  if (account) {
    return (
      <div>
        { !wrongChain && 
          <HeaderButton wide={true} onClick={disconnect}>
            {account.address.substring(0, 6)}...{account.address.substring(38)}
          </HeaderButton>
        }
        { wrongChain &&
          <HeaderButton wide={true}>
            WRONG CHAIN
          </HeaderButton>
        }
      </div>
    )
  }

  return (
    <div>
      {connectData.connectors.map((connector) => (
        <HeaderButton
          wide={true}
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
        </HeaderButton>
      ))}
    </div>
  );
};