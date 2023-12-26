import React, {useMemo} from 'react';
import {Container} from 'components/Container';
import LandingAuth from 'features/Auth/Landing';

const Landing = () => {
  const RenderScreen = useMemo(
    () => (
      <Container noPadding>
        <LandingAuth />
      </Container>
    ),
    [],
  );

  return RenderScreen;
};

export default Landing;
