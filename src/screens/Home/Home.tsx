import React, {useMemo} from 'react';
import {Container} from 'components/Container';
import Welcome from 'features/Home/Welcome';

const Home = () => {
  const RenderScreen = useMemo(
    () => (
      <Container isSafeArea>
        <Welcome />
      </Container>
    ),
    [],
  );

  return RenderScreen;
};

export default Home;
