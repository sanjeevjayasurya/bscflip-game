import { useAccount, useConnect } from "wagmi";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HeaderButton } from "./HeaderStyles";
import { FaChevronDown } from "react-icons/fa";
import metamasksvg from "../../img/MetaMask_Fox.svg";
import coinbasesvg from "../../img/Coinbase.svg";
import walletconnectsvg from "../../img/WalletConnect.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const WalletButton = ({ wrongChain }) => {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: account }, disconnect] = useAccount({ fetchEns: false });
  const [connector, setConnector] = useState(connectData.connectors[0]);
  const svgMapper = {
    injected: metamasksvg,
    walletConnect: walletconnectsvg,
    walletLink: coinbasesvg,
  };
  return (
    <div className="flex justify-between mx-5 font-bold">
      {/* {connectData.connectors.map((connector) => (
        <HeaderButton
          wide={true}
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
        </HeaderButton>
      ))} */}
      <Menu as="div" className="relative inline-block text-left mr-5">
        <div>
          <Menu.Button disabled={account} className="text-sm flex items-center w-50 font-bold tracking-wide justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-black hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            <img
              src={svgMapper[connector.id]}
              alt="metamask_logo"
              className="mr-3 h-5 w-5"
              aria-hidden="true"
            />
            {connector.name}
            <FaChevronDown className="-mr-1 ml-2" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black text-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            <div className="border-white border-[1px] rounded-[0.375rem]">
              {connectData.connectors.map((connector) => (
                <Menu.Item key={connector.id}>
                  <div
                    onClick={() => setConnector(connector)}
                    className="group flex items-center px-4 py-2 text-sm hover:bg-[#efb911] hover:text-black"
                  >
                    <img
                      src={svgMapper[connector.id]}
                      alt="metamask_logo"
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {connector.name}
                    {!connector.ready && " (unsupported)"}
                  </div>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <div className="">
        {!account ? (
          <button
            onClick={() => connect(connector)}
            className="text-white text-sm font-bold border-white border-[1px] inline-flex items-center px-4 py-2 rounded-md bg-black hover:bg-gray-600"
          >
            Connect Wallet
          </button>
        ) : !wrongChain ? (
          <button
            onClick={disconnect}
            className="text-white text-sm font-bold border-white border-[1px] inline-flex items-center px-4 py-2 rounded-md bg-black hover:bg-gray-600"
          >
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2 text-[#24FF00]"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            {account.address.substring(0, 6)}...{account.address.substring(38)}
          </button>
        ) : (
          <button className="text-white text-sm font-bold border-white border-[1px] inline-flex items-center px-4 py-2 rounded-md bg-black hover:bg-gray-600">
            WRONG CHAIN
          </button>
        )}
      </div>
    </div>
  );
};
