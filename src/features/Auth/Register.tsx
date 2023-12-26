import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import type {TFieldRef} from 'types/components/Input.type';
import {AuthTitle} from './components/Title';
import {InputSection} from './components/InputSection';
import {ms} from 'react-native-size-matters';
import PrimaryButton from 'components/buttons/PrimaryButton';
import {
  emailValidation,
  passwordValidation,
  phoneReplace,
  phoneValidation,
  usernameValidation,
} from 'configs/regex';
import {COLOR} from 'configs/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCurrentNavigation} from 'hooks/useCurrentNavigation';
import {GlobalText} from 'components/texts/GlobalText';
import {FontWeight} from 'types/components/GlobalText.type';
import {isIOS} from 'configs/devices';

const RegisterAuth = () => {
  const {navigate} = useCurrentNavigation();

  const fullNameRef: TFieldRef = useRef();
  const emailRef: TFieldRef = useRef();
  const phoneNumberRef: TFieldRef = useRef();
  const usernameRef: TFieldRef = useRef();
  const passwordRef: TFieldRef = useRef();
  const confirmPasswordRef: TFieldRef = useRef();

  const [canContinue, setCanContinue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fieldError, setFieldError] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const handleBlur = async (field: string, regex?: RegExp) => {
    switch (field) {
      case 'email': {
        const isValid = regex?.test(emailRef.current as string);
        setFieldError({...fieldError, [field]: !isValid});
        break;
      }
      case 'fullName': {
        const isValid = Boolean(fullNameRef.current);
        setFieldError({...fieldError, [field]: !isValid});
        break;
      }
      case 'phoneNumber': {
        const firstLetter = phoneNumberRef.current
          ? phoneNumberRef.current[0]
          : '';

        let phoneValue;

        if (firstLetter === '0') {
          phoneValue = phoneNumberRef.current?.replace(phoneReplace, '+62');
          phoneNumberRef.current = phoneValue;
        } else if (
          phoneNumberRef.current?.slice(0, 3) !== '+62' &&
          firstLetter !== '0'
        ) {
          phoneValue = `+62${phoneNumberRef.current}`;
          phoneNumberRef.current = phoneValue;
        }

        const isValid = regex?.test(phoneNumberRef.current as string);
        setFieldError({...fieldError, [field]: !isValid});
        break;
      }
      case 'username': {
        const isValid = regex?.test(usernameRef.current as string);
        setFieldError({...fieldError, [field]: !isValid});

        break;
      }
      case 'password': {
        const isValid = regex?.test(passwordRef.current as string);
        setFieldError({...fieldError, [field]: !isValid});

        break;
      }

      case 'confirmPassword': {
        const isValid = passwordRef.current === confirmPasswordRef.current;
        setFieldError({...fieldError, [field]: !isValid});
        break;
      }

      default:
        break;
    }

    const allFiled = [
      fullNameRef.current,
      phoneNumberRef.current,
      passwordRef.current,
      usernameRef.current,
      emailRef.current,
      confirmPasswordRef.current,
    ];

    if (
      !allFiled.includes(undefined) &&
      !Object.values(fieldError).includes(true)
    ) {
      setCanContinue(true);
    }
  };

  const onContinuePress = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('username', usernameRef.current as string);
      await AsyncStorage.setItem('password', passwordRef.current as string);
      await AsyncStorage.setItem('phone', phoneNumberRef.current as string);
      navigate('OTPRegister');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={isIOS ? 100 : 0}
      style={styles.flex}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <AuthTitle title="Register" />
        <InputSection
          error={fieldError.fullName}
          onChangeText={text => {
            fullNameRef.current = text;
          }}
          onBlur={() => handleBlur('fullName')}
          autoCapitalize="words"
          keyboardType="default"
          title="Full Name"
          placeholder="Enter full name"
        />

        <InputSection
          error={fieldError.email}
          onChangeText={text => {
            emailRef.current = text;
          }}
          onBlur={() => handleBlur('email', emailValidation)}
          autoCapitalize="none"
          textContentType="name"
          keyboardType="email-address"
          title="Email"
          placeholder="Enter email adress"
        />

        <InputSection
          error={fieldError.phoneNumber}
          onChangeText={text => {
            phoneNumberRef.current = text;
          }}
          onBlur={() => handleBlur('phoneNumber', phoneValidation)}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          title="Phone Number"
          placeholder="Enter phone number"
          leftComponent={<GlobalText color={COLOR.DEEP_BLUE}>+62</GlobalText>}
        />
        <InputSection
          error={fieldError.username}
          onChangeText={text => {
            usernameRef.current = text;
          }}
          onBlur={() => handleBlur('username', usernameValidation)}
          autoCapitalize="none"
          keyboardType="twitter"
          textContentType="username"
          title="Username"
          placeholder="Enter email adress"
        />
        <InputSection
          error={fieldError.password}
          onChangeText={text => {
            passwordRef.current = text;
          }}
          onBlur={() => handleBlur('password', passwordValidation)}
          secureTextEntry
          keyboardType="default"
          title="Password"
          textContentType="oneTimeCode"
          placeholder="Enter password"
        />
        <InputSection
          error={fieldError.confirmPassword}
          onChangeText={text => {
            confirmPasswordRef.current = text;
          }}
          onBlur={() => handleBlur('confirmPassword')}
          secureTextEntry
          keyboardType="default"
          textContentType="oneTimeCode"
          title="Confirm Password"
          placeholder="Enter confirm password"
        />
        <PrimaryButton
          disabled={!canContinue}
          backgroundColor={!canContinue ? COLOR.GRAY : COLOR.PRIMARY_BLUE}
          component={
            isLoading ? (
              <ActivityIndicator color={COLOR.WHITE} />
            ) : (
              <GlobalText
                textAlign="center"
                size={16}
                type={FontWeight._600}
                color={COLOR.WHITE}>
                Continue
              </GlobalText>
            )
          }
          style={styles.button}
          onPress={onContinuePress}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterAuth;

const styles = StyleSheet.create({
  flex: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    gap: ms(12),
  },
  button: {marginTop: ms(16)},
});
