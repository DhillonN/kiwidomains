import React, { useEffect, useState,useContext } from "react";
import { Button, Box } from "@mui/material";
import { useMetaMask } from "ethers-react";
import {networks} from '../../utils/networks'
import {checkNetwork} from '../../utils/functions'
const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};
export const HandleWallet = () => {
  const {isConnected,connectedAccount,connectWallet} = useMetaMask()
  const [network,setNetwork]=useState();
  const {ethereum}=window
  useEffect(()=>{
    if(ethereum){(async()=>{
        
        try{
          let chain=  await checkNetwork();
          setNetwork(networks[chain])
        }
        catch(error){
            console.log(error);
        }
    })();
}
},[ethereum])
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
