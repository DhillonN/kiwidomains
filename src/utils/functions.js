
export const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
    } else {
        console.log("We have the ethereum object", ethereum.chainId);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });    
    return accounts
};
export const checkNetwork = async () => {
    const { ethereum } = window;

    if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
    } else {
        console.log("We have the ethereum object", ethereum.chainId);
    }
    const chainId = await ethereum.request({ method: "eth_chainId" });
    return chainId
};
