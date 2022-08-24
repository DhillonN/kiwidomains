import React, { useState } from "react";
import contractAbi from "../../utils/Domains.json";
import { ethers } from "ethers";
import {Box,Grid,Container} from '@mui/material';
import Snackbar from '../components/Snackbar'
import Button from '../components/Button'
import TextField from "../components/TextField";
import Typography from '../components/Typography';
const tld = ".kiwi";
const CONTRACT_ADDRESS = "0x9Fa7499C62FCCf753349112e8cb17AB00a29e01d";


export const MintDomain=()=>  {
  const [domain, setDomain] = useState();
  const [record, setRecord] = useState("");
  const [open, setOpen] = useState(false);
  const [message,setMessage]=useState();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const dom=event.target[0].value;
    setDomain(dom);
    dispatchrequest();
  };
  const dispatchrequest=async()=>{
    const msg=await mintDomain()
      setMessage(msg)
      setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  const mintDomain = async () => {
    // Calculate price based on length of domain (change this to match your contract)
    // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
    const price =
      domain.length === 3 ? "0.005" : domain.length === 4 ? "0.003" : "0.001";
    console.log("Minting domain", domain, "with price", price);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractAbi.abi,
          signer
        );
        console.log("Going to pop wallet now to pay gas...");
        let tx = await contract.register(domain, {
          value: ethers.utils.parseEther(price),
        });
        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        // Check if the transaction was successfully completed
        if (receipt.status === 1) {
          setDomain("")
          return("Congratulations !!! "+domain+tld+" is all yours");
          /* Set the record for the domain
          tx = await contract.setRecord(domain, record);
          await tx.wait();
          console.log(
            "Record set! https://mumbai.polygonscan.com/tx/" + tx.hash
          );*/
        } else {
          return("Transaction failed! Please try again");
        }
      }
    } catch (error) {
      return(error.message);
    }
}
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
              <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800 }}>
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
                  
                />
                <Typography variant={"h5"} >.kiwi</Typography></Box>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{ width: '100%' }}
                >
                  Register
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

  
