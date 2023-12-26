import Landing from 'screens/Landing';
import {AuthRoutes} from './Auth/auth.routes';
import Home from 'screens/Home/Home';

export const MainRoutes = [
  {
    name: 'Landing',
    component: Landing,
    options: {headerShown: false},
  },
  ...AuthRoutes,
  {
    name: 'Home',
    component: Home,
    options: {headerShown: false},
  },
];
