import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  type ViewProps,
  type ViewStyle,
  type ColorValue,
} from 'react-native';
import {
  SafeAreaView,
  type Edges,
  type NativeSafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {isAndroid} from 'configs/devices';
import {COLOR} from 'configs/colors';

type TContainer = {
  backgroundColor?: COLOR | ColorValue;
  edges?: Edges;
  noPadding?: boolean;
};

interface ISafeAreaViewContainer extends TContainer, NativeSafeAreaViewProps {
  isSafeArea: true;
  style?: ViewStyle;
}

interface IViewContainer extends TContainer, ViewProps {
  isSafeArea?: false | undefined;
  style?: ViewStyle;
}

type Props = ISafeAreaViewContainer | IViewContainer;

export const Container = ({
  isSafeArea,
  backgroundColor = COLOR.LIGHT_BACKGROUND,
  edges = ['right', 'top', 'left', 'bottom'],
  style,
  noPadding = false,
  ...props
}: Props) => {
  const {bottom} = useSafeAreaInsets();
  const paddingBottom = () => {
    if (isAndroid) {
      return ms(16);
    } else if (isSafeArea) {
      return 0;
    }
    return bottom;
  };

  const styles = useStyles({
    backgroundColor,
    paddingBottom: noPadding ? 0 : paddingBottom(),
    paddingHorizontal: noPadding ? 0 : ms(16),
  });

  return (
    <>
      {(() => {
        if (isSafeArea) {
          return (
            <SafeAreaView
              edges={edges}
              style={[styles.screen, style]}
              {...props}
            />
          );
        }

        return <View style={[styles.screen, style]} {...props} />;
      })()}
      <StatusBar translucent={true} barStyle={'dark-content'} />
    </>
  );
};

const useStyles = (styleProps: ViewStyle) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      ...styleProps,
    },
  });
