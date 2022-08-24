
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
export const connectWallet = async () => {
    try {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Get MetaMask -> https://metamask.io/");
            return;
        }
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected", accounts[0]);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};