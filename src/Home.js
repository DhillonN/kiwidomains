import * as React from 'react';
import DomainHero from './modules/views/DomainHero';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
import DomainDisplay from './modules/views/DomainDisplay';


function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <DomainHero />
      <DomainDisplay/>
    </React.Fragment>
  );
}

export default withRoot(Index);
