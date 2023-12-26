import React from 'react';
import {StyleSheet, TextInput, type TextInputProps, View} from 'react-native';
import {InputTitle} from './Title';
import {ms} from 'react-native-size-matters';
import {GlobalText} from 'components/texts/GlobalText';
import {COLOR} from 'configs/colors';

interface Props extends TextInputProps {
  title: string;
  error?: boolean;
  onBlur?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

type StyleProps = {
  borderColor?: COLOR;
};

export const InputSection = ({
  title,
  error = false,
  style,
  onBlur = () => {},
  leftComponent,
  rightComponent,
  ...props
}: Props) => {
  const styles = useStyles({
    borderColor: error ? COLOR.RED_WARNING : COLOR.GRAY,
  });
  return (
    <View style={styles.container}>
      <InputTitle title={title} />
      {(() => {
        if (leftComponent || rightComponent) {
          return (
            <View style={[styles.rowContainer, styles.input]}>
              {leftComponent}
              <View style={styles.inputComponentContainer}>
                <TextInput
                  onBlur={onBlur}
                  style={[styles.inputComponent, styles.text, style]}
                  placeholderTextColor={COLOR.GRAY}
                  {...props}
                />
              </View>
              {rightComponent}
            </View>
          );
        }
        return (
          <TextInput
            onBlur={onBlur}
            style={[styles.input, styles.text, style]}
            placeholderTextColor={COLOR.GRAY}
            {...props}
          />
        );
      })()}

      {error ? (
        <GlobalText color={COLOR.RED_WARNING}>
          Please enter a valid {title.toLowerCase()}
        </GlobalText>
      ) : null}
    </View>
  );
};

const useStyles = ({borderColor = COLOR.GRAY}: StyleProps) =>
  StyleSheet.create({
    container: {gap: ms(8)},
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: ms(16),
    },
    inputComponentContainer: {flex: 1},
    inputComponent: {
      padding: 0,
    },
    text: {
      color: COLOR.DEEP_BLUE,
      fontFamily: 'Montserrat-Regular',
      fontSize: ms(14),
    },
    input: {
      backgroundColor: COLOR.LIGHT_GRAYISH_BLUE,
      borderWidth: ms(1),
      borderRadius: ms(8),
      padding: ms(12),
      borderColor: borderColor,
    },
  });
