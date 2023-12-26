import React, {useMemo} from 'react';
import {Container} from 'components/Container';
import RegisterAuth from 'features/Auth/Register';

const Register = () => {
  const RenderScreen = useMemo(
    () => (
      <Container>
        <RegisterAuth />
      </Container>
    ),
    [],
  );

  return RenderScreen;
};

export default Register;
