import React from 'react';
import {Container} from 'components/Container';
import LandingAuth from 'features/Auth/Landing';

const Landing = () => {
  return (
    <Container noPadding>
      <LandingAuth />
    </Container>
  );
};

export default Landing;
