import Landing from 'screens/Landing';
import {AuthRoutes} from './Auth/auth.routes';

export const MainRoutes = [
  {
    name: 'Landing',
    component: Landing,
    options: {headerShown: false},
  },
  ...AuthRoutes,
];
