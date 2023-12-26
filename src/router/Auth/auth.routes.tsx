import React from 'react';
import Register from 'screens/Auth/Register';
import Login from 'screens/Auth/Login';
import OTPRegister from 'screens/Auth/OTPRegister';
import {COLOR} from 'configs/colors';
import {HeaderBackButton} from '@react-navigation/elements';
import {popToTop} from 'hooks/useCurrentNavigation';

const options = {
  headerTitle: '',
  headerBackTitleVisible: false,
  headerTintColor: COLOR.NAVY_BLUE,
  headerStyle: {
    backgroundColor: COLOR.LIGHT_BACKGROUND,
  },
  headerShadowVisible: false,
};

export const AuthRoutes = [
  {
    name: 'Register',
    component: Register,
    options,
  },
  {
    name: 'OTPRegister',
    component: OTPRegister,
    options,
  },
  {
    name: 'Login',
    component: Login,
    options: {
      ...options,
      headerLeft: () => (
        <HeaderBackButton onPress={() => popToTop()} labelVisible={false} />
      ),
    },
  },
];
