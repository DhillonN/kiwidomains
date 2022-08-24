import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './Home';
import {RecoilRoot} from 'recoil'

import {Web3ContextProvider} from 'ethers-react'
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Web3ContextProvider>
    
    <App />
   </Web3ContextProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);