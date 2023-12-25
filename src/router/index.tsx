import React from 'react';
import {MainRoutes} from './routes';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

function Router() {
  return (
    <Navigator initialRouteName="Explore">
      {MainRoutes.map(value => {
        return (
          <Screen
            key={value.name}
            name={value.name}
            component={value.component}
            options={value.options}
          />
        );
      })}
    </Navigator>
  );
}

export default Router;
