

import React, { useEffect, useState } from "react";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';


const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const CONTRACT_ADDRESS = "0x9Fa7499C62FCCf753349112e8cb17AB00a29e01d";

const App = () => {
    const [mints, setMints] = useState([]);
    const [domain, setDomain] = useState("");
    const [record, setRecord] = useState("");
    const [network, setNetwork] = useState("");
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");

     
        return (
            <RecoilRoot>
            <div className="form-container">
                <div className="first-row">
                    <input type="text" value={domain} placeholder="domain" onChange={(e) => setDomain(e.target.value)} />
                    <p className="tld"> {tld} </p>
                </div>

                <input type="text" value={record} placeholder="whats ur ninja power?" onChange={(e) => setRecord(e.target.value)} />
                {/* If the editing variable is true, return the "Set record" and "Cancel" button */}
                {editing ? (
                    <div className="button-container">
                        // This will call the updateDomain function we just made
                        <button className="cta-button mint-button" disabled={loading} onClick={updateDomain}>
                            Set record
                        </button>
                        // This will let us get out of editing mode by setting editing to false
                        <button
                            className="cta-button mint-button"
                            onClick={() => {
                                setEditing(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    // If editing is not true, the mint button will be returned instead
                    <button className="cta-button mint-button" disabled={loading} onClick={mintDomain}>
                        Mint
                    </button>
                )}
            </div>
            </RecoilRoot>
        );
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    useEffect(() => {
        if (network === "Polygon Mumbai Testnet") {
            fetchMints();
        }
    }, [currentAccount, network]);

    return (
        <div className="App">

            <div className="container">
                <div className="header-container">
                    <header>
                        <div className="left">
                            <p className="title">Kiwi Name Service</p>
                            <p className="subtitle">Future of your Identity!</p>
                        </div>
                        {/* Display a logo and wallet connection status*/}
                        <div className="right">
                            <img alt="Network logo" className="logo" src={network.includes("Polygon") ? polygonLogo : ethLogo} />
                            {currentAccount ? (
                                <p>
                                    Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}{" "}
                                </p>
                            ) : (
                                <p> Not connected </p>
                            )}
                        </div>
                    </header>
                </div>

                {!currentAccount && renderNotConnectedContainer()}
                {currentAccount && renderInputForm()}
                {mints && renderMints()}

                <div className="footer-container">
                    <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
                    <a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">{`built with @${TWITTER_HANDLE}`}</a>
                </div>
            </div>
        </div>
    );
};

export default App;
