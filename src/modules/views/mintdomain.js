import React, {  useState } from "react";
import contractAbi from "../../utils/Domains.json";
import { ethers } from "ethers";
import {Box,Grid,Container} from '@mui/material';
import Snackbar from '../components/Snackbar'
import Button from '../components/Button'
import TextField from "../components/TextField";
import Typography from '../components/Typography';
import {useContractWrite,usePrepareContractWrite,useWaitForTransaction} from 'wagmi'

const CONTRACT_ADDRESS = "0x9Fa7499C62FCCf753349112e8cb17AB00a29e01d";



export const MintDomain=()=>  {
  const [domain, setDomain] = useState("");
  const [open, setOpen] = useState(false);
  const [message,setMessage]=useState();
  const [price,setPrice]=useState("0.01")
  const { config }=usePrepareContractWrite({
    addressOrName:CONTRACT_ADDRESS,
    contractInterface:contractAbi.abi,
    functionName:'register',
    args:domain,
    overrides:{value:ethers.utils.parseEther(price)}
  })
  const {write,data}= useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data&&data.hash,
  })
 
  const handleChange=(e)=>{
    const dom=e.target.value
    const price = dom.length === 3 ? "0.005" : dom.length === 4 ? "0.003" : "0.001";
    setDomain(dom)
    setPrice(price)
  }
  const handleClose = () => {
    setOpen(false);
  };
   // console.log("Minting domain", domain, "with price", price);
    return (
        <Container component="section" sx={{ mt: 10, display: 'flex' }}>
        
        <Grid container>
          <Grid item xs={12} sx={{ zIndex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'warning.light',
                py: 8,
                px: 3,
              }}
            >
              <Box component="form" sx={{ maxWidth: 800 }}>
                <Typography variant="h2" component="h2" gutterBottom color='secondary.light'>
                  Register Domain
                </Typography>
                <Typography variant="h5">
                  Take the next step.
                </Typography>
                <Box display={"flex"} alignItems={"baseline"}>
                  <TextField
                  noBorder
                  placeholder="Your Domain"
                  variant="standard"
                  sx={{ width: '100%', mt: 3, mb: 2 }}
                  onChange={(e)=>{handleChange(e)}}     
                />
                <Typography variant={"h5"} >.kiwi</Typography></Box>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{ width: '100%' }}
                  disabled={!write||isLoading}
                  onClick={()=>{write()}}
                >
                  <Typography sx={{color:"#fff"}}>
                  {!isLoading?write?"Register":"Please enter valid domain name": "Processing"}
                  {isSuccess?()=>{setMessage("success"); setOpen(true);}:undefined}
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          closeFunc={handleClose}
          message={message}
        />
      </Container>
    );  
}

  
