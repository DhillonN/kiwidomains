import React, {useState } from "react";
import { Button, Box, Dialog, DialogTitle,IconButton } from "@mui/material";
import { useConnect,useAccount,useDisconnect,useNetwork,useSwitchNetwork } from 'wagmi'
import CloseIcon from '@mui/icons-material/Close';
import Typography from "./Typography";
import {LoadingScreen} from './Backdrop' ;

function Profile(props) {
    const {open,onClose,connect, connectors, error}=props
  const handleConnect=(connector)=>{
    connect({ connector })
    onClose()
  }
  return (
    <Dialog
    open={open}
    onClose={onClose}
    >
      <DialogTitle>Connect your wallet</DialogTitle>
      <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      <Box flex={1} p={1}flexDirection="row" justifyItems={"center"}>
      {connectors.map((connector) => (
        <Button
          fullWidth={true}
          disabled={!connector.ready}
          key={connector.id}
          onClick={()=>{handleConnect(connector)}}
          color={"primary"}
          variant="outlined"
          sx={{p:1,mt:0.5,mb:0.5}}
        >
          {connector.name}
        </Button>
      ))}
      </Box>

{error && <div>{error.message}</div>}
    </Dialog>
  )
}

function Network(props) {
  const {switchNetwork } =  useSwitchNetwork()
    const {open,onClose}=props
  
  return (
    <Dialog
    open={open}
    onClose={onClose}
    >
      <DialogTitle>Wrong Network</DialogTitle>
      <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      <Box flex={1} p={1}flexDirection="row" justifyItems={"center"}>
        <Button
          fullWidth={true}
          onClick={()=>switchNetwork("0x5")}
          color={"primary"}
          variant="outlined"
          sx={{p:1,mt:0.5,mb:0.5}}
        >
          Connect to Goerili
        </Button>
      </Box>
    </Dialog>
  )
}


export const HandleWallet = () => {
  const [open,setOpen]=useState(false);
  const { connector, isConnected } = useAccount()
  const {isLoading,connect, connectors, error} = useConnect()

  const {chain} = useNetwork()
  const { disconnect } = useDisconnect()
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }
  const handleNetworkClose=()=>{
    setOpen(false)

  }
  
  return (
  <>  {isLoading?<LoadingScreen/>:
    <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
      {isConnected&&connector?
      <Box display={"flex"} maxWidth={"fit-content"} flex={1} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
      <Typography sx={{mr:1}}>Connected to {connector.name}</Typography>
      <Button color="secondary" onClick={disconnect} variant="outlined">Disconnect</Button>
    </Box>
      :
      <Button onClick={handleOpen} color="secondary" variant="outlined">Connect</Button>
}
      <Profile open={open} onClose={handleClose} connect={connect} connectors={connectors} error={error}/>
     {isConnected&& chain.network!=="goerli"&&<Network open={true} onClose={handleNetworkClose}/>} 
    </Box>
}</>
  );
};
