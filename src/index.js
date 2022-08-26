import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./Home";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WagmiConfig, createClient,defaultChains,configureChains } from "wagmi";
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';

const alchemyId = process.env.REACT_APP_ALCHEMY_ID;
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyId }),
  publicProvider(),
])
console.log(alchemyId)
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Kiwi Domains',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})


ReactDOM.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
</WagmiConfig>
  </React.StrictMode>,
  document.getElementById("root")
);
