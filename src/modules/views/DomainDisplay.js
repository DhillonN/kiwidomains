import React,{useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import {ethers} from 'ethers'
import contractAbi from '../../utils/Domains.json'
import Snackbar  from '../components/Snackbar';
const CONTRACT_ADDRESS = "0x9Fa7499C62FCCf753349112e8cb17AB00a29e01d";
const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundImage: "linear-gradient(to bottom, #330b59, #422f7f, #4f50a7, #5a73ce, #6497f6)",
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function DomainDisplay() {
  const [mints, setMints] = useState([]);
  const [message,setMessage]= useState("");
  const [open,setOpen] = useState(false)

useEffect(()=>{
  requestDispatcher();
},[])

const requestDispatcher=async()=>{
  const msg= await fetchMints();
  setMessage(msg);
  setOpen(true)
}
const handleClose=()=>{
  setOpen(false)
}
  const fetchMints = async () => {
    try {
        const { ethereum } = window;
        if (ethereum) {
            // You know all this
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
  
            // Get all the domain names from our contract
            const names = await contract.getAllNames();
  
            // For each name, get the record and the address
            const mintRecords = await Promise.all(
                names.map(async (name) => {
                    const mintRecord = await contract.records(name);
                    const owner = await contract.domains(name);
                    return {
                        id: names.indexOf(name),
                        name: name,
                        record: mintRecord,
                        owner: owner,
                    };
                })
            );
            setMints(mintRecords);
            return("You own "+mintRecords.length+" domains on blockchain");
            
        }
    } catch (error) {
        return(error.message);
    }
  };
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }} id="mydomains">
      {mints&&mints.length>0?
      <div>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Your Domains on blockchain
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {mints.map((mint,index) => (
          <ImageIconButton
            key={index}
            style={{
              width: '200px',
              marginBottom: '8px'
            }}
            
          >
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {mint.name}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
      </div>
      :<Typography variant={"h2"}>You don't have any domains</Typography>}
      <Snackbar
          open={open}
          closeFunc={handleClose}
          message={message}
        />
    </Container>
  );
}
