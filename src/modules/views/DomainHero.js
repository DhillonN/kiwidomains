import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import DomainHeroLayout from './DomainHeroLayout';
import backgroundImage from '../../assets/Polygon-blockchain.jpg'
import {MintDomain} from './mintdomain'
export default function ProductHero() {
  return (
    <DomainHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
 
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your blockchain identity
      </Typography>
      <MintDomain/>
    </DomainHeroLayout>
  );
}
