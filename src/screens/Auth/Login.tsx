import React, {useMemo} from 'react';
import {Container} from 'components/Container';
import LoginAuth from 'features/Auth/Login';

const Login = () => {
  const RenderScreen = useMemo(
    () => (
      <Container>
        <LoginAuth />
      </Container>
    ),
    [],
  );

  return RenderScreen;
};

export default Login;
