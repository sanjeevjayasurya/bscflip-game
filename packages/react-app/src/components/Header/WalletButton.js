import { useAccount, useConnect } from 'wagmi';

import { HeaderButton } from "./HeaderStyles";

export const WalletButton = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false, });

  if (account) {
    return (
      <HeaderButton onClick={disconnect}>
          {account.address.substring(0, 6)}...{account.address.substring(38)}
      </HeaderButton>
    )
  }

  return (
    <div>
      {connectData.connectors.map((connector) => (
        <HeaderButton
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