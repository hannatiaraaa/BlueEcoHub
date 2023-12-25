import {createRef} from 'react';
import {
  type ParamListBase,
  type NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const nav = createRef<NavigationContainerRef<ParamListBase>>();

export const navigate = <ParamList extends {}>(
  name: string,
  params?: ParamList,
) => {
  nav.current?.navigate(name, params);
};

export const useCurrentNavigation = () => {
  const push = <ParamList extends {}>(name: string, params?: ParamList) => {
    nav.current?.dispatch(StackActions.push(name, params));
  };

  return {navigate, push};
};
