import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {OTPInput} from './components/OTPInput';
import PrimaryButton from 'components/buttons/PrimaryButton';
import {GlobalText} from 'components/texts/GlobalText';
import {FontWeight} from 'types/components/GlobalText.type';
import {ms} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  buttonTitle?: string;
  otpSent?: string;
  onSuccess?: () => void;
  onResend?: () => void;
};

const OTPAuth = ({
  buttonTitle,
  otpSent,
  onSuccess = () => {},
  onResend,
}: Props) => {
  const otpRef = useRef('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phone, setPhone] = useState<string | null>('');

  const phoneNumber = useCallback(async () => {
    const getPhone = await AsyncStorage.getItem('phone');
    setPhone(getPhone);
  }, []);

  useEffect(() => {
    phoneNumber();
  }, [phoneNumber]);

  const onOTPInput = (otp: string) => {
    if (otp === otpSent) {
      onSuccess();
    } else if (otp.length === otpSent?.length) {
      setErrorMessage('Invalid OTP');
    } else if (errorMessage !== '') {
      setErrorMessage('');
    }
    otpRef.current = otp;
  };

  const onPress = () => {
    if (otpRef.current === '') {
      setErrorMessage('Please enter OTP');
    } else if (otpRef.current === otpSent) {
      setErrorMessage('');
      onSuccess();
    } else {
      setErrorMessage('Invalid OTP');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.textContainer}>
        <GlobalText size={20} type={FontWeight._800}>
          Enter authentication code
        </GlobalText>
        <GlobalText size={16}>
          Enter the 6-digit that we have sent via the phone number to{' '}
          <GlobalText size={16} type={FontWeight._700}>
            {phone}
          </GlobalText>
        </GlobalText>
      </View>
      <OTPInput
        length={6}
        timeSeconds={30}
        onResend={onResend}
        onValue={onOTPInput}
        errorMessage={errorMessage}
      />
      <PrimaryButton title={buttonTitle} onPress={onPress} />
    </ScrollView>
  );
};

export default OTPAuth;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: ms(16),
  },
  textContainer: {
    marginTop: ms(16),
    gap: ms(16),
  },
});
