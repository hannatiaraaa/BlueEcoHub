import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {GlobalText} from 'components/texts/GlobalText';
import {COLOR} from 'configs/colors';
import moment from 'moment';
import {ms} from 'react-native-size-matters';
import {FontWeight} from 'types/components/GlobalText.type';

interface Props {
  length: number;
  timeSeconds: number;
  errorMessage?: string;
  onResend?: () => void;
  onValue?: (otp: string) => void;
}

export const OTPInput = ({
  length,
  timeSeconds,
  errorMessage,
  onResend = () => {},
  onValue = () => {},
}: Props) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [timer, setTimer] = useState<number>(timeSeconds);

  const inputRefs = useRef<TextInput[]>(Array(length).fill(null));

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (value: string, index: number) => {
    if (!isNaN(Number(value))) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      const otpValue = newOtp.join('');
      onValue(otpValue);

      if (value === '') {
        onValue(otpValue);
      } else {
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }

        if (index === length - 1) {
          onValue(otpValue);
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
      const otpValue = newOtp.join('');
      onValue(otpValue);
    }
  };

  const handleFocus = (index: number) => {
    if (otp[index] === '') {
      inputRefs.current[index]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(timeSeconds);
    onResend();
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        <View style={styles.digits}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref as TextInput)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              autoComplete="sms-otp"
              textContentType="oneTimeCode"
              onChangeText={value => handleInputChange(value, index)}
              onFocus={() => handleFocus(index)}
              onKeyPress={e => handleKeyPress(e, index)}
            />
          ))}
        </View>
        {errorMessage ? (
          <GlobalText color={COLOR.RED_WARNING}>{errorMessage}</GlobalText>
        ) : null}
      </View>
      <View style={styles.timerContainer}>
        <GlobalText type={FontWeight._500} color={COLOR.GRAY}>
          ({moment(timer * 1000).format('mm:ss')})
        </GlobalText>

        <TouchableOpacity onPress={handleResend}>
          <GlobalText
            size={12}
            type={FontWeight._600}
            color={COLOR.PRIMARY_BLUE}>
            Resend Code
          </GlobalText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  otpContainer: {
    gap: ms(24),
  },
  digits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: ms(8),
  },
  input: {
    width: ms(40),
    height: ms(40),
    borderWidth: 1,
    borderRadius: ms(40),
    borderColor: COLOR.LIGHT_GRAY,
    textAlign: 'center',
    fontSize: ms(16),
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
