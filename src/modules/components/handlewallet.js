import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import {networks} from '../../utils/networks'
import {checkNetwork,checkIfWalletIsConnected,connectWallet} from '../../utils/functions'

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};
export const HandleWallet = () => {
  const {isConnected,setIsConnectWallet} = useState(false)
  const [network,setNetwork]=useState();
  const {ethereum}=window
  useEffect(()=>{
    if(ethereum){(async()=>{
        const wllt=await checkIfWalletIsConnected();
        if(wllt)
        {
          setIsConnectWallet(true)
          getNetwork()
        }
        else{
          console.log("not connected")
        }
    })();
}
},[ethereum])
const getNetwork=async()=>{
  try{
    let chain= await checkNetwork();
    setNetwork(networks[chain])
  }
  catch(error){
      console.log(error);
  }
}
console.log(isConnected)
  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
      {!isConnected? (
        <Button
          color="inherit"
          variant="h6"
          underline="none"
          onClick={connectWallet}
          sx={rightLink}
        >
          {"Connect Wallet"}
        </Button>
      ) : (
        <Box>
        <Button
        color="inherit"
        variant="h6"
        underline="none"
        sx={rightLink}
        href="/#mydomains"
        >
          my domains
        </Button>
        <Button
          color="inherit"
          variant="h6"
          underline="none"
          sx={rightLink}
          onClick={network !== "Goerli"? undefined:undefined}
        >
          {network === "Goerli"
            ? "Connected"
            : "Worng Network Click Here to Change to Goerli"}
        </Button>
        </Box>
      )}
    </Box>
  );
};
