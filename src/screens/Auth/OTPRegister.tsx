import React, {useMemo} from 'react';
import OTPAuth from 'features/Auth/OTP';
import {Container} from 'components/Container';
import {useCurrentNavigation} from 'hooks/useCurrentNavigation';

const OTPRegister = () => {
  const {navigate} = useCurrentNavigation();

  const onOTPSuccess = () => navigate('Login');

  const RenderScreen = useMemo(
    () => (
      <Container>
        <OTPAuth
          otpSent="111111"
          buttonTitle="Register"
          onSuccess={onOTPSuccess}
        />
      </Container>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return RenderScreen;
};

export default OTPRegister;
