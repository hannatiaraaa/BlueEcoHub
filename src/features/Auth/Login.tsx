import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {TFieldRef} from 'types/components/Input.type';
import {AuthTitle} from './components/Title';
import {InputSection} from './components/InputSection';
import {ms} from 'react-native-size-matters';
import PrimaryButton from 'components/buttons/PrimaryButton';
import {useCurrentNavigation} from 'hooks/useCurrentNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLOR} from 'configs/colors';
import {isIOS} from 'configs/devices';

const LoginAuth = () => {
  const {navigate} = useCurrentNavigation();

  const [loginError, setLoginError] = useState(false);

  const usernameRef: TFieldRef = useRef();
  const passwordRef: TFieldRef = useRef();

  const onLoginPress = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      const isMatch =
        usernameRef.current === username && passwordRef.current === password;

      if (isMatch) {
        navigate('Home');
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={isIOS ? 100 : 0}
      style={styles.flex}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <AuthTitle title="Login" size={32} />
        <View style={styles.content}>
          <InputSection
            onChangeText={text => (usernameRef.current = text)}
            autoCapitalize="none"
            keyboardType="twitter"
            title="Username"
            placeholder="Enter email adress"
          />
          <InputSection
            onChangeText={text => (passwordRef.current = text)}
            keyboardType="default"
            title="Password"
            placeholder="Enter password"
            secureTextEntry
          />
        </View>
        <PrimaryButton
          title="Login"
          style={styles.button}
          onPress={onLoginPress}
        />
        {loginError && (
          <Text style={styles.textError}>Incorrect username or password</Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginAuth;

const styles = StyleSheet.create({
  flex: {flexGrow: 1},
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: ms(12),
  },
  content: {
    flexGrow: 0.25,
    justifyContent: 'center',
    gap: ms(16),
  },
  button: {marginTop: ms(24)},
  textError: {
    color: COLOR.RED_WARNING,
    textAlign: 'center',
  },
});
