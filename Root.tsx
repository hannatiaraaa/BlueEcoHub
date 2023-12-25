import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {nav} from 'hooks/useCurrentNavigation';
import Router from 'router';

function Root() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={nav}>
        <Router />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Root;
