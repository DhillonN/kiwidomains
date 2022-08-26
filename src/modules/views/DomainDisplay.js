import React,{useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import contractAbi from '../../utils/Domains.json'
import {useContractRead} from 'wagmi'
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
  const { data, isLoading } = useContractRead({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractAbi.abi,
    functionName: 'getAllNames',
  })
  console.log(data)

  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }} id="mydomains">
      {data&&data.length>0?
      <div>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Your Domains on blockchain
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {data.map((mint,index) => (
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
                {mint}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
      </div>
      :<Typography variant={"h2"}>You don't have any domains</Typography>}
    </Container>
  );
}
